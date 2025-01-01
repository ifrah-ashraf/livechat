package postgres

import (
	"database/sql"
	"fmt"
)

func CreateUser(db *sql.DB) error {

	createQuery := `CREATE TABLE IF NOT EXISTS users (
    		id SERIAL PRIMARY KEY,
    		userid VARCHAR(50) NOT NULL UNIQUE,
    		name VARCHAR(50) NOT NULL,
    		password VARCHAR(255) NOT NULL,       
    		sex VARCHAR(10),
    		age INTEGER,
    		created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
	);`

	_, err := db.Exec(createQuery)
	if err != nil {
		return fmt.Errorf("error while creating the table: %w", err)
	}

	fmt.Println("Successfully created the Artist table")
	return nil
}
