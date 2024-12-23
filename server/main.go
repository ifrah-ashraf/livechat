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

//cors policy fix

func main() {

	err := postgres.DbConnect()
	if err != nil {
		fmt.Println("Error in database", err)
	}

	router := http.NewServeMux()
	router.HandleFunc("/chat", middleware.AuthMiddleware(sock.WS_handler))
	router.HandleFunc("/signup", auth.SignUp)
	router.HandleFunc("/login", auth.Login)

	log.Fatal(http.ListenAndServe(":8080", handlers.CORS(
		handlers.AllowedOrigins([]string{"*"}),
		handlers.AllowedMethods([]string{"GET", "PUT", "POST", "DELETE"}),
		handlers.AllowedHeaders([]string{"Content-Type", "Authorization"}),
	)(router)))
}
