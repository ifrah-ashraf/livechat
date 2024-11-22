package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/gorilla/websocket"
)

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

func main() {
	http.HandleFunc("/", wsHandler)
	log.Fatal(http.ListenAndServe(":8080", nil))
}

func wsHandler(w http.ResponseWriter, r *http.Request) {
	conn, err := upgrader.Upgrade(w, r, nil)

	if err != nil {
		log.Println(err)
		return
	}

	defer conn.Close()

	for {
		mt, msg, err := conn.ReadMessage()

		if err != nil {
			log.Println("Error while reading the message", err.Error())
			return
		}

		//fmt.Println("Received message:", string(msg))

		go Readmsg(msg)

		err = conn.WriteMessage(mt, msg)
		if err != nil {
			log.Println(err)
			return
		}

	}
}

func Readmsg(message []byte) {
	fmt.Println(string(message))
}
