package middleware

import (
	"fmt"
	"net/http"
	"time"

	"github.com/golang-jwt/jwt/v5"
)

var secretKey = []byte("youhavetouseitGRWM")

func AuthMiddleware(next http.HandlerFunc) http.HandlerFunc {

	return func(w http.ResponseWriter, r *http.Request) {
		fmt.Println("Authentication Middleware in Action...")

		tokenCookie, err := r.Cookie("token")
		if err != nil {
			http.Error(w, "Unauthorized: Token missing in cookie", http.StatusUnauthorized)
			return
		}

		token, err := verifyToken(tokenCookie.Value)
		if err != nil {
			http.Error(w, fmt.Sprintf("Unauthorized: Token verification failed: %v", err), http.StatusUnauthorized)
			return
		}

		fmt.Printf("Token verified successfully. Claims: %+v\n", token.Claims)

		next(w, r)

	}
}

func verifyToken(tokenString string) (*jwt.Token, error) {

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
