package sock

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"github.com/gorilla/websocket"
)

type Users struct {
	ID         string
	Connection *websocket.Conn
}

type Data struct {
	From    string `json:"from"`
	To      string `json:"to"`
	Message string `json:"message"`
}

var clients = make(map[string]*Users)

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

func WS_handler(w http.ResponseWriter, r *http.Request) {

	userId := r.URL.Query().Get("id")
	if userId == "" {
		http.Error(w, "User ID is required", http.StatusBadRequest)
		return
	}

	fmt.Println("user ID connected => ", userId)

	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Println(err)
		return
	}

	user := &Users{
		ID:         userId,
		Connection: conn,
	}

	clients[userId] = user

	fmt.Println("Total users connected ", len(clients))

	defer conn.Close()

	UserHandling(user)

}

func UserHandling(user *Users) {
	defer func() {
		user.Connection.Close()
		delete(clients, user.ID)

		fmt.Println("Exiting")
		fmt.Println("Number of active clients", len(clients))
	}()

	var message Data

	for {
		mt, msg, err := user.Connection.ReadMessage() // ye sender ka ws CONNECTION hai uska messsage receive honga
		if err != nil {
			log.Println("Error while reading the message", err.Error())
			return
		}

		err = json.Unmarshal(msg, &message)
		if err != nil {
			fmt.Println("Error: while unmarshaling the json data", err)
			return
		}

		rcv := message.To
		rcvConn, exist := clients[rcv]
		if !exist {
			log.Println("Recepients doesn't exist: ", rcv)
			continue
		}
		err = rcvConn.Connection.WriteMessage(mt, msg) // yha ss receiver ko msg jayega
		if err != nil {
			log.Println(err)
			return
		}
		fmt.Println("Message from ", message.From, "is ", message.Message)
	}

}
