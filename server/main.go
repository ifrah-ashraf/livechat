package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"github.com/gorilla/websocket"
)

/* type Users struct {
	ID         string
	connection *websocket.Conn
} */

type Data struct {
	From    string `json:"from"`
	To      string `json:"to"`
	message string `json:"message"`
}

//var clients = make(map[string]*websocket.Conn)

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

func main() {
	http.HandleFunc("/chat", wsHandler)

	log.Fatal(http.ListenAndServe(":8080", nil))
}

func wsHandler(w http.ResponseWriter, r *http.Request) {

	/* userId := r.URL.Query().Get("id")
	fmt.Println("user ID => ", userId) */

	var message Data

	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Println(err)
		return
	}

	/* clients[userId] = conn
	// receiver user Id
	rcv := message.To
	rcvConn := clients[rcv] */

	defer conn.Close()

	for {
		mt, msg, err := conn.ReadMessage()
		if err != nil {
			log.Println("Error while reading the message", err.Error())
			return
		}

		err = json.Unmarshal(msg, &message)
		if err != nil {
			fmt.Println("Error: while unmarshaling the json data", err)
			return
		}

		//fmt.Println("Received message:", string(msg))
		err = conn.WriteMessage(mt, msg)
		if err != nil {
			log.Println(err)
			return
		}

		go Readmsg(msg)

	}
}

func Readmsg(message []byte) {
	fmt.Println(string(message))
}
