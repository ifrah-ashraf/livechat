package sock

import (
	"fmt"
	"log"
)

//var isChannelDeclared = false

type WorkerPool struct {
	MaxWorker     int
	TaskChannel   chan Tasks
	WorkerChannel chan func()
}

type Tasks struct {
	user          *Users
	message       *MessageData
	msgType       int
	actualMessage []byte
}

func New(workers int) *WorkerPool {

	if workers < 1 {
		workers = 1
	}

	pool := &WorkerPool{
		MaxWorker:     5,
		TaskChannel:   make(chan Tasks, 50),
		WorkerChannel: make(chan func()),
	}

	Dispatcher(pool)

	return pool
}

func Dispatcher(wp *WorkerPool) {

	for i := 0; i < wp.MaxWorker; i++ {
		go func(i int) {
			workerLogic(i)
		}(i)
	}
}

func workerLogic(id int) {

	fmt.Printf("The worker routine %d started", id+1)

	task := <-wp.TaskChannel

	rcv := task.message.To
	rcvConn, exist := clients[rcv]
	if !exist {
		log.Println("Recepients doesn't exist: ", rcv)
	}

	err := rcvConn.Connection.WriteMessage(task.msgType, task.actualMessage) // yha ss receiver ko msg jayega
	if err != nil {
		log.Println(err)
		return
	}

	fmt.Println("Message from ", task.message.From, "is ", task.message.Message)
}
