import { useEffect, useState, useRef } from "react";

type MessageBody = {
  from: string;
  to: string;
  message: string;
};

const useWebSocket = (serverUrl: string) => {
  const [messages, setMessages] = useState<MessageBody[]>([]);
  const ws = useRef<WebSocket | null>(null); // Use ref to persist WebSocket across renders

  useEffect(() => {
    ws.current = new WebSocket(serverUrl);

    ws.current.onopen = () => console.log("Connected to WebSocket Server");

    ws.current.onmessage = (event) => {
      try {
        setMessages((prev) => [...prev, JSON.parse(event.data)]);
      } catch (error) {
        console.error("Error parsing WebSocket message:", error);
      }
    };

    ws.current.onclose = () => {
      console.log("Disconnected from WebSocket Server");
      ws.current = null;
    };

    ws.current.onerror = (error) => console.error("WebSocket Error:", error);

    return () => {
      ws.current?.close();
    };
  }, [serverUrl]); // Only run once when `serverUrl` changes

  const sendMessage = (msgBody: MessageBody) => {
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify(msgBody));
    } else {
      console.error("WebSocket not connected");
    }
  };

  return { messages, sendMessage };
};

export default useWebSocket;
