package models

import "time"

type Message struct {
	Sender_id   string    `json:"sender_id"`
	Receiver_id string    `json:"receiver_id"`
	Content     string    `json:"content"`
	Status      string    `json:"status"`
	Created_at  time.Time `json:"created_at"`
}
