import { useEffect, useState, useRef } from "react";

type MessageBody = {
  from: string;
  to: string;
  message: string;
};

// migrate this to global context later on to use isConnected like flag ..

const useWebSocket = (serverUrl: string, onMessage: (msg: MessageBody) => void) => {
  const ws = useRef<WebSocket | null>(null);
  const [isConnected, setIsconnected] = useState<boolean>(false)

  useEffect(() => {
    ws.current = new WebSocket(serverUrl);

    ws.current.onopen = () => console.log("Connected to WebSocket Server");

    ws.current.onmessage = (event) => {
      try {
        onMessage(JSON.parse(event.data))
      } catch (error) {
        console.error("Error parsing WebSocket message:", error);
      }
    };

    ws.current.onclose = () => {
      setIsconnected(false)
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
      setIsconnected(true)
      ws.current.send(JSON.stringify(msgBody));
    } else {
      console.error("WebSocket not connected");
    }
  };

  return { isConnected, sendMessage };
};

export default useWebSocket;
