package main

import (
	"fmt"
	"livechat-app/auth"
	"livechat-app/middleware"
	"livechat-app/postgres"
	"livechat-app/sock"
	"log"
	"net/http"

	"github.com/gorilla/handlers"
)

func main() {

	db, err := postgres.DbConnect()
	if err != nil {
		fmt.Println("Error in database", err)
	}

	defer db.Close()

	router := http.NewServeMux()
	router.HandleFunc("/chat", middleware.AuthMiddleware(sock.WS_handler(db)))
	router.HandleFunc("/signup", auth.SignUpHandler(db))
	router.HandleFunc("/login", auth.LoginHandler(db))
	router.HandleFunc("/logout", auth.LogoutHandler)
	router.HandleFunc("/verify-user", auth.VerifyUser)

	//cors policy fix
	log.Fatal(http.ListenAndServe(":8080", handlers.CORS(
		handlers.AllowedOrigins([]string{"http://localhost:3000"}),
		handlers.AllowedMethods([]string{"GET", "PUT", "POST", "DELETE"}),
		handlers.AllowedHeaders([]string{"Content-Type", "Authorization"}),
		handlers.AllowCredentials(),
	)(router)))
}
