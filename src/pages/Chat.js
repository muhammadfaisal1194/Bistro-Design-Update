import React, { useState, useEffect } from "react";
import "../App.css";
import axios from "axios";
import { API_URL, API_URL_SOCKET } from "../utils/api";
import moment from "moment";
import socketClient from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { setNotifications } from "../redux/notifications";

const Chat = () => {
  const socket = socketClient(API_URL_SOCKET, { transports: ["websocket"] });
  const dispatch = useDispatch();
  const state = useSelector((state) => state.notifications);
  const [userName, setUserName] = useState("");
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const role = JSON.parse(localStorage.getItem("role"));

  useEffect(() => {
    socket.on("sendNotification", function (data) {
      fetchAllNotification();
    });
    socket.on("receive_message", (data) => {
      getChat();
    });
  }, []);

  //************************** Fetch All-Menu Handler ***********************//
  const fetchAllNotification = async () => {
    const response = await axios.get(`${API_URL}/notification/index`);
    dispatch(setNotifications(response.data.data));
  };
  const removeHandler = async (id) => {
    try {
      const response = await axios.delete(
        `${API_URL}/notification/delete/${id}`
      );
      if (response) {
        fetchAllNotification();
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchAllNotification();
  }, []);

  const getChat = async () => {
    const response = await axios.get(`${API_URL}/chat/index`);
    setChat(response.data.data);
  };

  const createChatHandler = async () => {
    try {
      const response = await axios.post(`${API_URL}/chat/create/`, {
        author: userName,
        message: message,
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getChat();
    const role = JSON.parse(localStorage.getItem("role"));
    setUserName(role);
  }, []);

  const sendMessage = async () => {
    let messageContent = {
      content: {
        author: userName,
        message: message,
      },
    };
    await socket.emit("send_message", messageContent);
    setChat([...chat, messageContent.content]);
    console.log(chat);
    createChatHandler();
    setMessage("");
  };

  useEffect(() => {
    document.querySelector(".messages").scrollTop =
      document.querySelector(".messages").scrollHeight;
  }, [chat]);

  return (
    <>
      {role !== 1 && (
        <div
          style={{
            maxHeight: 350,
            minHeight: 350,
            overflow: "scroll",
            border: "2px solid black",
            borderRadius: 5,
            marginBottom: 5,
          }}
        >
          {state.notificationsList &&
            state.notificationsList.map((notification) => (
              <div className="alert success">
                <span
                  className="closebtn"
                  key={notification._id}
                  onClick={() => removeHandler(notification._id)}
                  style={{ cursor: "pointer", fontSize: 22, fontWeight: 800 }}
                >
                  &times;
                </span>
                <strong>{notification.notificationText} !!</strong>
                <br></br>
                <span>
                  <small>
                    {moment(notification.createdAt).format(
                      "MMMM Do YYYY, h:mm:ss a"
                    )}
                  </small>
                </span>
              </div>
            ))}
        </div>
      )}
      <div className="chatContainer">
        <div className="messages mt-3 mb-3">
          {chat.map((val, key) => {
            return (
              <div
                key={key}
                className="messageContainer"
                id={val.author == userName ? "You" : "Other"}
              >
                <div className="messageIndividual">
                  {val.message}
                  <br />
                  <small>
                    {moment(val.createdAt).format("MMMM Do YYYY, h:mm:ss a")}
                  </small>
                </div>
              </div>
            );
          })}
        </div>

        <div className="messageInputs">
          <input
            type="text"
            placeholder="Message..."
            value={message}
            onKeyUp={(e) => {
              if (e.keyCode == 13) {
                sendMessage();
              }
            }}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
          />
          <button className="btn btn-common" onClick={sendMessage}>
            Send
          </button>
        </div>
      </div>
    </>
  );
};

export default Chat;
