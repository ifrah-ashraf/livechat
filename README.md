# Real-Time Chat Application (Golang & Next.js)

A real-time chat application built with **Golang** (backend), **Next.js** (frontend), and **PostgreSQL** (database). It uses **WebSockets** for real-time communication and **Goroutines & Channels** for concurrency.

## Features
- Real-time messaging with WebSockets.
- Efficient message handling using a worker pool (Goroutines & Channels).
- User authentication.
- Persistent chat history with PostgreSQL.
- Responsive UI built with **Next.js** and **TailwindCSS**.

## Technologies
- **Backend**: Golang, WebSockets, PostgreSQL
- **Frontend**: Next.js, TailwindCSS

## Setup

### Prerequisites
- Go (v1.16+)
- Node.js (v14+)

### Backend Setup
1. Clone the repo:
   ```bash
   git clone https://github.com/ifrah-ashraf/livechat.git
   cd livechat/server
   go run main.go

2. Run the frontend
   ```bash
   cd livechat/client
   npm i && npm run dev

Make sure to set the correct env variable to run it properly with the postgres URL.
  


