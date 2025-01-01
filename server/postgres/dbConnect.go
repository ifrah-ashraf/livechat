package postgres

import (
	"database/sql"
	"fmt"
	"log"
	"os"

	"github.com/joho/godotenv"
	_ "github.com/lib/pq"
)

func DbConnect() (*sql.DB, error) {
	err := godotenv.Load()

	if err != nil {
		log.Fatalf("Error loading .env file: %v", err)
	}

	conn := os.Getenv("connStr")

	db, err := sql.Open("postgres", conn)

	if err != nil {
		fmt.Println("Error while connecting to db", err.Error())
		return nil, err
	}
	if err = db.Ping(); err != nil {
		log.Printf("Database connection error : %v", err)
		return nil, err
	}
	fmt.Println("database is connected")

	//code for table creation
	/* err = CreateUser(db)
	if err != nil {
		fmt.Println(err)
	} */
	return db, nil
}
