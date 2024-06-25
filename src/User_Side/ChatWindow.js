import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

function ChatWindow({ Trainername }) {
  const [trainerMessages, setTrainerMessages] = useState([]);
  const [ownerMessages, setOwnerMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = (sender) => {
    if (newMessage.trim() !== "") {
      if (sender === "trainer") {
        setTrainerMessages([...trainerMessages, newMessage]);
      } else {
        setOwnerMessages([...ownerMessages, newMessage]);
      }
      setNewMessage("");
    }
  };

  return (
    <div
      style={{
        marginTop: "20px",
        // border: "1px solid black",
        padding: "10px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h3>
        Chat <b style={{ color: "blue" }}>{Trainername}</b>
      </h3>

      <div
        style={{ maxHeight: "200px", overflowY: "auto", marginBottom: "10px" }}
      >
        {trainerMessages.map((msg, index) => (
          <div key={index} style={{ marginBottom: "5px", textAlign: "left" }}>
            <strong>Trainer: </strong> {msg}
          </div>
        ))}
        {ownerMessages.map((msg, index) => (
          <div key={index} style={{ marginBottom: "5px", textAlign: "right" }}>
            <strong>You: </strong> {msg}
          </div>
        ))}
      </div>

      <TextField
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        label="Type your message here"
        variant="outlined"
        style={{ marginBottom: "10px" }}
      />
      <br />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button
          variant="contained"
          color="success"
          onClick={() => handleSendMessage("trainer")}
          style={{ marginRight: "5px" }}
        >
          Send to Trainer
        </Button>
        <br />
      </div>
    </div>
  );
}

export default ChatWindow;
