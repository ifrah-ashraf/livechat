package db

import (
	"database/sql"
	"fmt"
)

func CreateUser(db *sql.DB) error {

	createQuery := `CREATE TABLE IF NOT EXISTS User (
		id SERIAL PRIMARY KEY,
		userid varchar(50) NOT NULL PRIMARY KEY
		name varchar(50) NOT NULL,
		password varchar(50) NOT NULL
		sex varchar(10),
		age INTEGER,
		created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
	)`

	_, err := db.Exec(createQuery)
	if err != nil {
		return fmt.Errorf("error while creating the table: %w", err)
	}

	fmt.Println("Successfully created the Artist table")
	return nil
}
