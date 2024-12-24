package auth

import (
	"encoding/json"
	"fmt"
	"livechat-app/models"
	"livechat-app/utils"
	"net/http"
)

func SignUp(w http.ResponseWriter, r *http.Request) {

	var user models.NewUser

	err := json.NewDecoder(r.Body).Decode(&user)
	if err != nil {
		http.Error(w, "Error while converting the json datta", http.StatusBadRequest)
		fmt.Printf("Error while converting the data %v", err)
		return
	}

	if user.UserID == "" || user.Name == "" || user.Age == 0 || user.Sex == "" || user.Password == "" {
		http.Error(w, "Please fill all the given fields", http.StatusBadRequest)
		fmt.Println("Validation failed: one or more field are empty")
		return
	}

	userName := user.Name
	tokenString, err := utils.GenerateJWT(userName)
	if err != nil {
		http.Error(w, "failed to generate token", http.StatusInternalServerError)
		return
	}

	fmt.Println("Token created after sign up : ", tokenString)
	response := user
	fmt.Println(response)

	cookie := http.Cookie{
		Name:     "token",
		Value:    tokenString,
		Path:     "/",
		MaxAge:   3600,
		Secure:   true,
		HttpOnly: true,
		SameSite: http.SameSiteLaxMode,
	}

	http.SetCookie(w, &cookie)

	w.Header().Set("Content-Type", "application/json")

	if err := json.NewEncoder(w).Encode(response); err != nil {
		http.Error(w, "Failed to encode receive id, time to json", http.StatusInternalServerError)
	}

}

func Login(w http.ResponseWriter, r *http.Request) {

	var userBody models.ExistUser

	err := json.NewDecoder(r.Body).Decode(&userBody)
	if err != nil {
		http.Error(w, "Error while converting the json data", http.StatusBadRequest)
		fmt.Printf("Error while converting the data %v", err)
		return
	}

	if userBody.UserID == "" || userBody.Password == "" {
		http.Error(w, "Please fill all the given fields", http.StatusBadRequest)
		fmt.Println("Validation failed: one or more field are empty")
		return
	}

	userid := userBody.UserID
	tokenString, err := utils.GenerateJWT(userid)
	if err != nil {
		http.Error(w, "failed to generate token", http.StatusInternalServerError)
		return
	}

	fmt.Println("Token created after login :", tokenString)
	response := userBody
	fmt.Println(response)

	cookie := http.Cookie{
		Name:     "token",
		Value:    tokenString,
		Path:     "/",
		MaxAge:   3600,
		Secure:   true,
		HttpOnly: true,
		SameSite: http.SameSiteLaxMode,
	}

	http.SetCookie(w, &cookie)

	w.Header().Set("Content-Type", "application/json")

	if err := json.NewEncoder(w).Encode(response); err != nil {
		http.Error(w, "Failed to encode receive id, time to json", http.StatusInternalServerError)
	}

}
