import { useEffect, useState, createContext } from "react";
import io from "socket.io-client";
import { API_URL_SOCKET } from "../utils/api";

export const SocketContext = createContext();

export const SocketContextProvider = ({ children }) => {
  const [socket, setsocket] = useState(null);

  useEffect(() => {
    setsocket(io(`${API_URL_SOCKET}`, { transports: ["websocket"] }));
  }, []);

  return (
    <SocketContext.Provider
      value={{
        socket: socket,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};
