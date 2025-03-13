package auth

import (
	"fmt"
	"log"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
)

var secretKey = []byte("youhavetouseitGRWM")

func GinVerifyUser(c *gin.Context) {
	tokenStr, err := c.Cookie("token")
	if err != nil {
		log.Println("Token not found in cookie:", err)
		c.JSON(http.StatusUnauthorized, gin.H{
			"error": fmt.Sprintf("Cookie not found: %v", err),
		})
		return
	}

	token, err := VerifyToken(tokenStr)
	if err != nil {
		log.Println("Unauthorized: Token verification failed : ", err)
		c.JSON(401, gin.H{
			"error": fmt.Sprintf("Unauthorized: Token verification failed :%v", err),
		})
		return
	}

	userId, _ := token.Claims.GetSubject()
	c.JSON(200, gin.H{
		"userid":  userId,
		"message": "User verified successfully",
	})
}
func VerifyToken(tokenString string) (*jwt.Token, error) {

	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {

		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
		}
		return secretKey, nil
	})

	if err != nil {
		return nil, err
	}

	if !token.Valid {
		return nil, fmt.Errorf("invalid token")
	}

	// Validate claims (e.g., expiration time)
	claims, ok := token.Claims.(jwt.MapClaims)
	if !ok || !token.Valid {
		return nil, fmt.Errorf("invalid token claims")
	}

	if exp, ok := claims["exp"].(float64); ok {
		if int64(exp) < time.Now().Unix() {
			return nil, fmt.Errorf("token expired")
		}
	}

	return token, nil
}
