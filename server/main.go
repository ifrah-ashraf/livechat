package main

import (
	"livechat-app/auth"
	"livechat-app/handler"
	"log"
	"net/http"
)

//cors policy fix

func main() {
	mux := http.NewServeMux()
	mux.HandleFunc("/chat", handler.WS_handler)
	mux.HandleFunc("/signup", auth.SignUp)
	mux.HandleFunc("/login", auth.Login)

	log.Fatal(http.ListenAndServe(":8080", CorsMiddleware(mux)))
}
