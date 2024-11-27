package auth

import (
	"encoding/json"
	"fmt"
	"livechat-app/models"
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

	response := user
	fmt.Println(response)

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

	if userBody.UserId == "" || userBody.Password == "" {
		http.Error(w, "Please fill all the given fields", http.StatusBadRequest)
		fmt.Println("Validation failed: one or more field are empty")
		return
	}

	response := userBody
	fmt.Println(response)

	w.Header().Set("Content-Type", "application/json")

	if err := json.NewEncoder(w).Encode(response); err != nil {
		http.Error(w, "Failed to encode receive id, time to json", http.StatusInternalServerError)
	}

}
