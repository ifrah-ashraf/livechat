import { useEffect, useState } from "react";

const useWebSocket = (serverUrl: string) => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    const ws = new WebSocket(serverUrl);
    
    ws.onopen = () => console.log("Connected to WebSocket Server");
    
    ws.onmessage = (event) => {
      setMessages((prev) => [...prev, event.data]);
    };
    
    ws.onclose = () => console.log("Disconnected from WebSocket Server");
    
    ws.onerror = (error) => console.error("WebSocket Error:", error);
    
    setSocket(ws);

    return () => ws.close();
  }, [serverUrl]);

  const sendMessage = (message: string) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(message);
    } else {
      console.error("WebSocket not connected");
    }
  };

  return { messages, sendMessage };
};

export default useWebSocket;
