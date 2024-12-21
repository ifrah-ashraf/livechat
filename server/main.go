package main

import (
	"livechat-app/auth"
	"livechat-app/handler"
	"log"
	"net/http"

	"github.com/gorilla/handlers"
)

//cors policy fix

func main() {
	router := http.NewServeMux()
	router.HandleFunc("/chat", handler.WS_handler)
	router.HandleFunc("/signup", auth.SignUp)
	router.HandleFunc("/login", auth.Login)

	log.Fatal(http.ListenAndServe(":8080", handlers.CORS(
		handlers.AllowedOrigins([]string{"*"}),
		handlers.AllowedMethods([]string{"GET", "PUT", "POST", "DELETE"}),
		handlers.AllowedHeaders([]string{"Content-Type", "Authorization"}),
	)(router)))
}
