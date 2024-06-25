import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import UserNavbar from "./UserNavbar";
import axios from "axios";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Alert from "@mui/material/Alert";
import Footer from "../User_Side/Footer";

const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const UserDashboard = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [userData, setUserData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [statuses, setStatuses] = useState({});
  const [showGreenAlert, setShowGreenAlert] = useState(false);
  const [showRedAlert, setShowRedAlert] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      setIsLoading(true);
      try {
        const formattedDate = selectedDate.toISOString().split("T")[0];
        const response = await axios.get(
          `http://localhost:5000/gymuser/getdataofuser?id=${localStorage.getItem(
            "userId"
          )}&date=${formattedDate}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setUserData(response.data.data || {});
      } catch (error) {
        console.error("Error fetching user data:", error);
        setUserData({});
      }
      setIsLoading(false);
    };

    fetchUserData();
  }, [selectedDate, isLoading]);

  const goToNextDay = () => {
    const nextDate = new Date(selectedDate);
    nextDate.setDate(nextDate.getDate() + 1);
    setSelectedDate(nextDate);
  };

  const goToPreviousDay = () => {
    const previousDate = new Date(selectedDate);
    previousDate.setDate(previousDate.getDate() - 1);
    setSelectedDate(previousDate);
  };

const handleSaveClick = () => {
  const formattedDate = selectedDate.toISOString().split("T")[0];
  const exercisesForCurrentDay = userData.Exercise[daysOfWeek[currentDayIndex]];

  // Check if status is selected for all exercises
  const hasIncompleteStatus = exercisesForCurrentDay.some((exercise) => {
    const status = statuses[`${formattedDate}_${exercise.exercise}`];
    return status === undefined || status === "";
  });

  if (hasIncompleteStatus) {
    setShowRedAlert(true);
    setShowGreenAlert(false); 
    setTimeout(() => {
      setShowRedAlert(false);
    }, 3000);
  } else {

    setShowGreenAlert(true);
    setTimeout(() => {
      setShowGreenAlert(false);
    }, 3000);
  }
};

const handleStatusChange = (event, exercise) => {
  const newStatuses = { ...statuses };
  const formattedDate = selectedDate.toISOString().split("T")[0];
  newStatuses[`${formattedDate}_${exercise}`] = event.target.value;
  setStatuses(newStatuses);
};


  const currentDayIndex = selectedDate.getDay();

  useEffect(() => {
    const storedStatuses = localStorage.getItem(
      `statuses_${localStorage.getItem("userId")}`
    );
    if (storedStatuses) {
      setStatuses(JSON.parse(storedStatuses));
    }
  }, []);

  return (
    <>
      <UserNavbar />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "auto",
        }}
      >
        <Card
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-between",
            height: "auto",
            width: "50%",
            marginTop:"50px",
            boxShadow: "0px 4px 8px rgba(0, 0, 0.2, 0.5)",
          }}
        >
          <CardContent>
            <div>
              <Typography
                variant="h6"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  color: "Green",
                }}
              >
                <b>{userData && userData.Name}</b>
              </Typography>
            </div>
            <div>
              <Typography
                variant="h4"
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                {daysOfWeek[currentDayIndex]}
              </Typography>
              {showGreenAlert && (
                <Alert severity="success">Status saved successfully!</Alert>
              )}
              {showRedAlert && (
                <Alert severity="error">Please select a status!</Alert>
              )}
              <TableContainer>
                <Table
                  style={{ border: "1.5px solid black", marginTop: "20px" }}
                >
                  <TableHead style={{ backgroundColor: "black" }}>
                    <TableRow>
                      <TableCell align="center" style={{ color: "white" }}>
                        <b>Exercise</b>
                      </TableCell>
                      <TableCell align="center" style={{ color: "white" }}>
                        <b>Reps</b>
                      </TableCell>
                      <TableCell align="center" style={{ color: "white" }}>
                        <b>Sets</b>
                      </TableCell>
                      <TableCell align="center" style={{ color: "white" }}>
                        <b>Status</b>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {userData &&
                      userData.Exercise &&
                      userData.Exercise[daysOfWeek[currentDayIndex]] &&
                      userData.Exercise[daysOfWeek[currentDayIndex]].map(
                        (val, index) => (
                          <TableRow key={index}>
                            <TableCell align="center">{val.exercise}</TableCell>
                            <TableCell align="center">{val.reps}</TableCell>
                            <TableCell align="center">{val.sets}</TableCell>
                            <TableCell align="center">
                              <Select
                                value={
                                  statuses[
                                    `${
                                      selectedDate.toISOString().split("T")[0]
                                    }_${val.exercise}`
                                  ] || ""
                                }
                                onChange={(event) =>
                                  handleStatusChange(event, val.exercise)
                                }
                                displayEmpty
                              >
                                <MenuItem value="" disabled>
                                  Status
                                </MenuItem>
                                <MenuItem value={"Completed"}>
                                  Completed
                                </MenuItem>
                                <MenuItem value={"Incomplete"}>
                                  Incomplete
                                </MenuItem>
                              </Select>
                            </TableCell>
                          </TableRow>
                        )
                      )}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </CardContent>
          <Button variant="contained" color="success" onClick={handleSaveClick}>
            Save
          </Button>
          <br />

          <div style={{ marginBottom: "20px", textAlign: "center" }}>
            <Button
              variant="contained"
              style={{ marginRight: "10px" }}
              color="success"
              onClick={goToPreviousDay}
            >
              Previous Day
            </Button>
            <Button variant="contained" color="success" onClick={goToNextDay}>
              Next Day
            </Button>
          </div>
        </Card>
      </div>
      <Footer/>
    </>
  );
};

export default UserDashboard;
