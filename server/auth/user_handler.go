package auth

import (
	"database/sql"
	"fmt"
	"livechat-app/models"
	"livechat-app/utils"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
)

func GinSignup(db *sql.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		var User models.NewUser

		if err := c.BindJSON(&User); err != nil {
			log.Printf("JSON Bind Error: %v\n", err)
			c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request for signup, improper JSON value", "details": err.Error()})
			return
		}

		iquery := `INSERT INTO users (userid ,name ,password , sex, age) values ($1 , $2 ,$3 , $4 , $5) RETURNING id , name ,created_at`

		_, err := db.Exec(iquery, User.UserID, User.Name, User.Password, User.Sex, User.Age)
		if err != nil {
			log.Printf("Database Insert Error: %v\n", err)
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Error while inserting the user", "details": err.Error()})
			return
		}

		userId := User.UserID
		tokenString, err := utils.GenerateJWT(userId)
		if err != nil {
			log.Println("Error while generating token", err)
			c.JSON(http.StatusInternalServerError, gin.H{"error": fmt.Sprintf("Error while generating token %v", err)})
			return
		}

		c.SetCookie("token", tokenString, 3600, "/", "localhost", false, true)
		c.JSON(201, gin.H{
			"message": "User registered succeesfully",
			"token":   tokenString,
		})

	}
}

func GinLogin(db *sql.DB) gin.HandlerFunc {
	return func(c *gin.Context) {
		var User models.ExistUser
		if err := c.BindJSON(&User); err != nil {
			log.Printf("JSON Bind Error: %v\n", err)
			c.JSON(http.StatusBadRequest, gin.H{"error": fmt.Sprintf("Invalid request for login, %v", err)})
			return
		}
		var dbUserID, dbPassword string
		fmt.Println("User object is", User)
		iquery := `SELECT userid , password FROM users WHERE userid = $1 and password = $2`

		row := db.QueryRow(iquery, User.UserID, User.Password)

		err := row.Scan(&dbUserID, &dbPassword)
		if err == sql.ErrNoRows {
			log.Printf("No user found with the specified userid: %v", err)
			c.JSON(http.StatusNotFound, gin.H{"error": "No user found with the specified userid"})
			return
		} else if err != nil {
			log.Printf("Error while fetching user details: %v", err)
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Error fetching the user from database"})
			return
		}

		userId := User.UserID

		tokenString, err := utils.GenerateJWT(userId)
		if err != nil {
			log.Println("Error while generating token", err)
			c.JSON(http.StatusInternalServerError, gin.H{"error": fmt.Sprintf("Error while generating token %v", err)})
			return
		}
		c.SetCookie("token", tokenString, 7200, "/", "localhost", false, true)
		c.JSON(200, gin.H{
			"message": "User found successfully",
			"token":   tokenString,
			"userid":  userId,
		})

	}
}

func GinLogout(c *gin.Context) {
	_, err := c.Cookie("token")
	if err != nil {
		log.Println("Token not found in cookie:", err)
		c.JSON(http.StatusUnauthorized, gin.H{
			"error": fmt.Sprintf("Cookie not found: %v", err),
		})
		return
	}

	c.SetCookie("token", "", -1, "/", "localhost", false, true)

	c.JSON(http.StatusOK, gin.H{
		"message": "Cookie deleted successfully",
	})
}
