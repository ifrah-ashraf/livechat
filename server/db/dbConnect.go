package db

import (
	"database/sql"
	"fmt"
	"log"
	"os"

	"github.com/joho/godotenv"
)

func DbConnect() {
	err := godotenv.Load()

	if err != nil {
		log.Fatalf("Error loading .env file: %v", err)
	}

	conn := os.Getenv("connStr")
	db, err := sql.Open("postgres", conn)
	if err != nil {
		log.Fatal(err.Error())
	}
	defer db.Close()

	if err = db.Ping(); err != nil {
		log.Printf("Database connection error : %v", err)
		return
	}
	fmt.Println("The database is connected")

}
