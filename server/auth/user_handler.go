package auth

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"livechat-app/models"
	"livechat-app/utils"
	"net/http"
)

func SignUpHandler(db *sql.DB) http.HandlerFunc {
	// understand the difference between HandlerFunc and Handler <3

	return func(w http.ResponseWriter, r *http.Request) {

		if r.Method != http.MethodPost {
			http.Error(w, "Method Not Allowed", http.StatusMethodNotAllowed)
			return
		}

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

		//db logic

		iquery := `INSERT INTO users (userid ,name ,password , sex, age) values ($1 , $2 ,$3 , $4 , $5) RETURNING id , name ,created_at`

		var pu models.PartialUserData

		err = db.QueryRow(iquery, user.UserID, user.Name, user.Password, user.Sex, user.Age).Scan(&pu.ID, &pu.Name, &pu.CreatedAt)
		if err != nil {
			http.Error(w, fmt.Sprintf("error while inserting: %v", err), http.StatusInternalServerError)
			fmt.Printf("Database insertion error: %v\n", err)
			return
		}

		// db logic end

		userId := user.UserID
		tokenString, err := utils.GenerateJWT(userId)
		if err != nil {
			http.Error(w, "failed to generate token", http.StatusInternalServerError)
			return
		}

		fmt.Println("Token created after sign up : ", tokenString)
		response := pu
		//use it for debug
		fmt.Println(response)

		cookie := http.Cookie{
			Name:     "token",
			Value:    tokenString,
			Path:     "/",
			MaxAge:   3600,
			Secure:   false,
			HttpOnly: true,
			SameSite: http.SameSiteLaxMode,
		}

		http.SetCookie(w, &cookie)

		w.Header().Set("Content-Type", "application/json")

		if err := json.NewEncoder(w).Encode(response); err != nil {
			http.Error(w, "Failed to encode receive id, time to json", http.StatusInternalServerError)
		}

	}

}

func LoginHandler(db *sql.DB) http.HandlerFunc {

	return func(w http.ResponseWriter, r *http.Request) {

		if r.Method != http.MethodPost {
			http.Error(w, "Method Not Allowed", http.StatusMethodNotAllowed)
			return
		}

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

		// db logic
		var dbUser models.ExistUser
		cquery := `SELECT userid , password FROM users WHERE userid = $1 and password = $2`

		err = db.QueryRow(cquery, userBody.UserID, userBody.Password).Scan(&dbUser.UserID, &dbUser.Password)

		if err == sql.ErrNoRows {
			http.Error(w, fmt.Sprintf("no user found with the specified userid: %v", err), http.StatusInternalServerError)
			fmt.Printf("No user found with the specified userid : %v", err)
			return
		} else if err != nil {
			http.Error(w, fmt.Sprintf("error while fetching the user from database %v", err), http.StatusInternalServerError)
			fmt.Printf("error while fetching user details: %v", err)
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
			Secure:   false,
			HttpOnly: true,
			SameSite: http.SameSiteLaxMode,
		}

		http.SetCookie(w, &cookie)

		w.Header().Set("Content-Type", "application/json")

		if err := json.NewEncoder(w).Encode(response); err != nil {
			http.Error(w, "Failed to encode receive id, time to json", http.StatusInternalServerError)
		}
	}

}

func LogoutHandler(w http.ResponseWriter, r *http.Request) {

	if r.Method != http.MethodPost {
		http.Error(w, "Method Not Allowed", http.StatusMethodNotAllowed)
		return
	}

	_, err := r.Cookie("token")
	if err != nil {
		http.Error(w, "Unauthorized: Token missing in cookie", http.StatusUnauthorized)
		return
	}

	newCookie := http.Cookie{
		Name:     "token",
		Value:    "",
		Path:     "/",
		MaxAge:   -1,
		Secure:   false,
		HttpOnly: true,
	}

	http.SetCookie(w, &newCookie)

	response := map[string]string{
		"message": "logout successfully",
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)

	if err := json.NewEncoder(w).Encode(response); err != nil {
		http.Error(w, "Failed to encode receive id, time to json", http.StatusInternalServerError)
	}

	fmt.Println("cookie deleted successfully")
}
