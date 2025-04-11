FROM golang:1.24.2-alpine

# Set working directory
WORKDIR /app

# Copy go.mod and go.sum first for caching
COPY go.mod go.sum ./
RUN go mod download

# Copy the whole backend code
COPY . .

# Build the Go binary
RUN go build -o server ./cmd/main.go

# Expose the port your app listens on
EXPOSE 8080

# Load env variables from .env file at runtime
CMD ["./server"]
