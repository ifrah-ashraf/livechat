package main

import (
	"fmt"
	"livechat-app/auth"
	"livechat-app/postgres"

	"github.com/gin-gonic/gin"
)

func main() {

	db, err := postgres.DbConnect()
	if err != nil {
		fmt.Println("Error in database", err)
	}

	defer db.Close()

	newRouter := gin.Default()

	//router := http.NewServeMux()

	newRouter.POST("/signup", auth.GinSignup(db))
	newRouter.POST("/login", auth.GinLogin(db))
	newRouter.POST("/logout", auth.GinLogout)
	newRouter.Run()
	/* router.HandleFunc("/signup", auth.SignUpHandler(db))
	router.HandleFunc("/login", auth.LoginHandler(db))

	router.HandleFunc("/chat", middleware.AuthMiddleware(sock.WS_handler(db)))
	router.HandleFunc("/logout", auth.LogoutHandler)
	router.HandleFunc("/verify-user", auth.VerifyUser)

	//cors policy fix
	log.Fatal(http.ListenAndServe(":8080", handlers.CORS(
		handlers.AllowedOrigins([]string{"http://localhost:3000"}),
		handlers.AllowedMethods([]string{"GET", "PUT", "POST", "DELETE"}),
		handlers.AllowedHeaders([]string{"Content-Type", "Authorization"}),
		handlers.AllowCredentials(),
	)(router))) */

}
