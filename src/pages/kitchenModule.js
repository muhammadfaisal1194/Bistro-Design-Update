import React from "react";
import axios from "axios";
import { useState } from "react";
import { Button, TextField, CircularProgress } from "@mui/material";
import { API_URL } from "../utils/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Container } from "@mui/system";
import { API_URL_SOCKET } from "../utils/api";
import socketClient from "socket.io-client";

const Kitchen = () => {
  const [notificationText, setNotificationText] = useState("");
  const [loading, setLoading] = useState(false);
  const socket = socketClient(API_URL_SOCKET, { transports: ["websocket"] });

  const notifyHandler = () => {
    socket.emit("sendNotification", {
      notificationText: notificationText,
    });
    postNotificationHandler();
  };

  const postNotificationHandler = async () => {
    try {
      if (!notificationText) {
        toast.error("Please type something!");
        return;
      }
      setLoading(true);
      const response = await axios.post(`${API_URL}/notification/create`, {
        notificationText: notificationText,
      });
      if (response.status == 200) {
        setTimeout(() => {
          toast.success("Notified To Kitchen!");
          setNotificationText("");
        }, 500);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <TextField
        variant="outlined"
        margin="normal"
        fullWidth
        label="Notification"
        name="name"
        autoFocus
        value={notificationText}
        onChange={(e) => setNotificationText(e.target.value)}
      />
      {loading ? (
        <Button
          sx={{
            mt: 2,
            background: "#162e4d",
            ":hover": { backgroundColor: "#002655", color: "#fff" },
          }}
          variant="contained"
          style={{ textTransform: "none" }}
        >
          <CircularProgress color="inherit" size={20} />
          Sending...
        </Button>
      ) : (
        <Button
          sx={{
            mt: 2,
            background: "#162e4d",
            ":hover": { backgroundColor: "#002655", color: "#fff" },
          }}
          variant="contained"
          type="submit"
          onClick={() => notifyHandler()}
        >
          Notify
        </Button>
      )}
      <ToastContainer />
    </Container>
  );
};

export default Kitchen;
