package utils

import (
	"fmt"
	"time"

	"github.com/golang-jwt/jwt/v5"
)

var secretKey = []byte("youhavetouseitGRWM")

func GenerateJWT(username string) (string, error) {

	claims := jwt.MapClaims{
		"sub": username,
		"exp": time.Now().Add(time.Hour).Unix(),
		"iat": time.Now().Unix(),
		"iss": "live-chat",
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	tokenString, err := token.SignedString(secretKey)
	if err != nil {
		return "", fmt.Errorf("error signing token: %w", err)
	}

	//for debuggin use this
	fmt.Println("token string is", tokenString)
	return tokenString, nil
}
