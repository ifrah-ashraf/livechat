package postgres

import (
	"database/sql"
	"fmt"
)

func CreateUser(db *sql.DB) error {

	createQuery := `	CREATE TABLE IF NOT EXISTS messages (
		id SERIAL PRIMARY KEY ,
		sender_id VARCHAR(50) NOT NULL  ,
		receiver_id VARCHAR(50) NOT NULL ,
		content VARCHAR(250) NOT NULL ,
		status VARCHAR(20) ,
		created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
	)
	`
	_, err := db.Exec(createQuery)
	if err != nil {
		return fmt.Errorf("error while creating the table: %w", err)
	}

	fmt.Println("Successfully created the messages table")
	return nil
}

/* query for users table
createQuery := `CREATE TABLE IF NOT EXISTS users (
    		id SERIAL PRIMARY KEY,
    		userid VARCHAR(50) NOT NULL UNIQUE,
    		name VARCHAR(50) NOT NULL,
    		password VARCHAR(255) NOT NULL,
    		sex VARCHAR(10),
    		age INTEGER,
    		created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
	);`
*/
