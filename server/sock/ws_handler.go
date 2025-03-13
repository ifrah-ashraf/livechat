package sock

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"livechat-app/auth"
	"livechat-app/middleware"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
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

var isWorkerStarted = false
var wp WorkerPool

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

func WS_handler(db *sql.DB) http.HandlerFunc {

	return func(w http.ResponseWriter, r *http.Request) {
		//userId := r.URL.Query().Get("id") */

		tokenCookie, err := r.Cookie("token")
		if err != nil {
			http.Error(w, "Unauthorized: Token missing in cookie", http.StatusUnauthorized)
			return
		}
		token, err := middleware.VerifyToken(tokenCookie.Value)
		if err != nil {
			http.Error(w, fmt.Sprintf("Unauthorized: Token verification failed: %v", err), http.StatusUnauthorized)
			return
		}
		claims, ok := token.Claims.(jwt.MapClaims)
		if !ok {
			http.Error(w, "Unauthorized: Invalid token claims", http.StatusUnauthorized)
			return
		}
		sub, ok := claims["sub"].(string)
		if !ok {
			http.Error(w, "Unauthorized: sub claims token missing or invalid", http.StatusUnauthorized)
			return
		}
		fmt.Printf("[Server] The user from the token is %s\n", sub)

		userId := sub
		if userId == "" {
			http.Error(w, "User ID is required", http.StatusBadRequest)
			return
		}

		conn, err := upgrader.Upgrade(w, r, nil)
		if err != nil {
			log.Println(err)
			return
		}

		fmt.Println("user ID connected => ", userId)

		user := &Users{
			ID:         userId,
			Connection: conn,
		}

		clients[userId] = user

		fmt.Println("Total users connected ", len(clients))

		if !isWorkerStarted {
			isWorkerStarted = true
			wp = *New(5)
		}

		defer conn.Close()

		UserHandling(user, db)

	}

}

func UserHandling(user *Users, db *sql.DB) {
	defer func() {
		user.Connection.Close()
		delete(clients, user.ID)

		fmt.Println("Exiting")
		fmt.Println("Number of active clients now", len(clients))
	}()

	fmt.Println("clients map : ", clients)

	var message MessageData

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

		newTask := &Tasks{
			user:          user,
			message:       &message,
			msgType:       mt,
			actualMessage: msg,
		}

		wp.TaskChannel <- *newTask

		/* rcv := message.To
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

		/* fmt.Println("message structure is :", message)
		fmt.Println("db object is :", db) */

		//InsertMsg(message, db)

	}

}

func InsertMsg(msg MessageData, db *sql.DB) {

	iquery := `INSERT INTO messages (sender_id ,receiver_id ,content , status) values ($1 , $2 ,$3 , $4) RETURNING id `

	var msgId int

	db.QueryRow(iquery, msg.From, msg.To, msg.Message, "delivered").Scan(&msgId)

	fmt.Println("message inserted successfully ", msgId)
}

func Wsocket_handler(c *gin.Context) {
	tokenStr, err := c.Cookie("token")
	if err != nil {
		log.Println("Error while fetching token : ", err)
	}

	token, err := auth.VerifyToken(tokenStr)
	if err != nil {
		log.Println(err.Error())
	}
	userId, err := token.Claims.GetSubject()
	if err != nil {
		log.Println(err.Error())
	}

	wsConn, err := upgrader.Upgrade(c.Writer, c.Request, nil)
	if err != nil {
		log.Println(err.Error())
	}
	defer wsConn.Close()
	user := Users{
		ID:         userId,
		Connection: wsConn,
	}

	clients[userId] = &user

	fmt.Println("total users connected now", len(clients))
	defer func() {
		delete(clients, user.ID)
		fmt.Println("Total users Connected after exit", len(clients))
	}()

	for {
		var message MessageData
		mt, msg, err := user.Connection.ReadMessage()
		if err != nil {
			log.Println(err.Error())
		}

		if err := json.Unmarshal(msg, &message); err != nil {
			log.Println(err.Error())
		}

		rcv := message.To
		rcvUser, exist := clients[rcv]
		if !exist {
			log.Println(err.Error())
		}

		err = rcvUser.Connection.WriteMessage(mt, msg)
		if err != nil {
			log.Println(err.Error())
		}
		fmt.Println("Message from ", message.From, "to user", message.To, "is", message.Message)
	}
}
