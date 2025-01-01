package auth

import (
	"encoding/json"
	"fmt"
	"net/http"
	"time"

	"github.com/golang-jwt/jwt/v5"
)

var secretKey = []byte("youhavetouseitGRWM")

func VerifyUser(w http.ResponseWriter, r *http.Request) {

	if r.Method != http.MethodGet {
		http.Error(w, "Method Not Allowed", http.StatusMethodNotAllowed)
		return
	}

	tokenString, err := r.Cookie("token")
	if err != nil {
		http.Error(w, "Unauthorized: Token missing in cookie", http.StatusUnauthorized)
		return
	}

	token, err := VerifyToken(tokenString.Value)

	if err != nil {
		http.Error(w, fmt.Sprintf("Unauthorized: Token verification failed: %v", err), http.StatusUnauthorized)
		return
	}

	user, _ := token.Claims.GetSubject()
	fmt.Printf("The user is %s", user)

	response := map[string]string{
		"user":    user,
		"message": "token verified successfully",
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(200)

	if err := json.NewEncoder(w).Encode(response); err != nil {
		http.Error(w, "Failed to encode user id, message", http.StatusInternalServerError)
	}

	fmt.Printf("Token verified successfully. Claims: %+v\n", token.Claims)

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
