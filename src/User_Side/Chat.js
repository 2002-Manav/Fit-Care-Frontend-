import React, { useState, useEffect } from "react";
import axios from "axios";
import { FormControl, InputLabel, Select, MenuItem, Card } from "@mui/material";
import UserNavbar from "./UserNavbar";
import ChatWindow from "./ChatWindow";

function Chat() {
  const [trainerNames, setTrainerNames] = useState([]);
  const [selectedTrainer, setSelectedTrainer] = useState(null);
  const [showChat, setShowChat] = useState(false);

 useEffect(() => {
    axios
      .get("http://localhost:5000/gymuser/gettrainerdata", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setTrainerNames(res.data.data);
        
      })
      .catch((error) => {
        console.error("Error fetching trainers:", error);
      });
  }, []);

  const handleSelectTrainer = (event) => {
    const selectedTrainerId = event.target.value;
    const selectedTrainerObject = trainerNames.find(
      (trainer) => trainer.id === selectedTrainerId
    );
    setSelectedTrainer(selectedTrainerObject);
    setShowChat(true);
  };

  return (
    <>
      <UserNavbar />
      <b>
        <h4
          style={{
            marginTop: "10px",
            color: "green",
            display: "flex",
            justifyContent: "center",
          }}
        >
          Chat With Your Trainer
        </h4>
        <br />
        <b style={{ color: "red", display: "flex", justifyContent: "center" }}>
          Note: Future Enhancement</b>
      </b>

      <div
        style={{
          marginTop: "30px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <b style={{ marginTop: "12px" }}>Start Chat With: </b>&nbsp;&nbsp;&nbsp;
        <FormControl style={{ width: "150px" }}>
          <InputLabel sx={{ textAlign: "center" }}>Select Trainer</InputLabel>
          <Select
            labelId="trainer-select-label"
            id="trainer-select"
            value={selectedTrainer ? selectedTrainer.id : ""}
            onChange={handleSelectTrainer}
            label="Select Trainer"
            style={{ display: "flex", justifyContent: "center" }}
          >
            <MenuItem value="" disabled>
              None
            </MenuItem>
            {trainerNames.map((trainer) => (
              <MenuItem key={trainer.id} value={trainer.id}>
                {trainer.Trainername}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      {showChat && selectedTrainer && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "60vh",
          }}
        >
          <Card style={{ padding: "20px", width: "400px" }}>
            <ChatWindow trainer={selectedTrainer.label} />
          </Card>
        </div>
      )}
    </>
  );
}

export default Chat;
