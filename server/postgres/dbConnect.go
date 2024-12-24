package postgres

import (
	"database/sql"
	"fmt"
	"log"
	"os"

	"github.com/joho/godotenv"
	_ "github.com/lib/pq"
)

func DbConnect() error {
	err := godotenv.Load()

	if err != nil {
		log.Fatalf("Error loading .env file: %v", err)
	}

	conn := os.Getenv("connStr")

	db, err := sql.Open("postgres", conn)

	if err != nil {
		fmt.Println("Error while connecting to db", err.Error())
		return err
	}
	defer db.Close()

	if err = db.Ping(); err != nil {
		log.Printf("Database connection error : %v", err)
		return err
	}
	fmt.Println("database is connected")

	err = CreateUser(db)
	if err != nil {
		fmt.Println(err)
	}
	return nil
}
