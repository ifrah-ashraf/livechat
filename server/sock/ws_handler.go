package sock

import (
	"encoding/json"
	"fmt"
	"livechat-app/auth"
	"log"
	"net/http"
	"sync"

	"github.com/gin-gonic/gin"
	"github.com/gorilla/websocket"
)

type Users struct {
	ID         string //see to delete the client after disconnection we are adding this field
	Connection *websocket.Conn
}

type MessageData struct {
	From    string `json:"from"`
	To      string `json:"to"`
	Message string `json:"message"`
}

var clients = make(map[string]*Users)
var clientMutex sync.Mutex

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

func Wsocket_handler(c *gin.Context) {
	tokenStr, err := c.Cookie("token")
	if err != nil {
		log.Println("Error while fetching token : ", err)
		c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": fmt.Sprintln("Error while fetching token", err.Error())})
		return
	}

	token, err := auth.VerifyToken(tokenStr)
	if err != nil {
		log.Println("Error while verifying the token", err.Error())
		c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": fmt.Sprintln("Token verification fails", err.Error())})
		return
	}
	userId, err := token.Claims.GetSubject()
	if err != nil {
		log.Println("The token claim has error", err.Error())
		c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": fmt.Sprintln("Token claims error", err.Error())})
		return
	}

	wsConn, err := upgrader.Upgrade(c.Writer, c.Request, nil)
	if err != nil {
		log.Println("Error in upgrading the ws connection", err.Error())
	}

	defer func() {
		fmt.Println("Closing the websocket connection after exit")
		wsConn.Close()
	}()

	clientMutex.Lock()
	existingUser, found := clients[userId]
	if found {
		existingUser.Connection = wsConn
	} else {
		existingUser = &Users{
			ID:         userId,
			Connection: wsConn,
		}
		clients[userId] = existingUser
	}
	clientMutex.Unlock()

	handleMessage(existingUser)

}

func handleMessage(user *Users) {
	fmt.Println("total users connected now", len(clients))
	fmt.Println("Users in client map are ", clients)

	defer func() {
		clientMutex.Lock()
		delete(clients, user.ID)
		clientMutex.Unlock()
		fmt.Println("Total users Connected after exit", len(clients))
	}()

	for {
		var message MessageData
		mt, msg, err := user.Connection.ReadMessage()
		if err != nil {
			log.Println("Error while reading the message", err.Error())
			break
		}

		if err := json.Unmarshal(msg, &message); err != nil {
			log.Println("Error while unmarshaling message", err.Error())
			continue
		}

		rcv := message.To

		clientMutex.Lock()
		rcvUser, exist := clients[rcv]
		clientMutex.Unlock()
		if !exist {
			log.Println("User does not exist in client map ", rcv)
			continue
		}

		err = rcvUser.Connection.WriteMessage(mt, msg)
		if err != nil {
			log.Println("Error while writing the message in websocket", err.Error())
		}
		fmt.Println("Message from ", message.From, "to user", message.To, "is", message.Message)
	}
}
