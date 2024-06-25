import * as React from "react";
import TextField from "@mui/material/TextField";
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/system";
import { tableCellClasses } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Autocomplete from "@mui/material/Autocomplete";
import axios from "axios";
import Alert from "@mui/material/Alert";
import Navbar from "./Navbar";
import Footer from "./Footer";

const theme = createTheme();

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    border: "1px solid black",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 16,
    paddingTop: 8,
    paddingBottom: 8,
    border: "1px solid rgba(224, 224, 224, 1)",
  },
}));

const ComboBox = () => {
  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const [user, setUser] = React.useState("");
  const [exerciseInput, setExerciseInput] = React.useState({});
  const [exerciseAdded, setExerciseAdded] = React.useState({});
  const [showError, setShowError] = React.useState(false);
  const [currentUsers, setCurrentUsers] = React.useState([]);
  const [finalArr, setFinalArr] = React.useState([]);
  const [userData, setUserData] = React.useState({});
  const [update, doUpdate] = React.useState(true);
  const [showSuccessAlert, setShowSuccessAlert] = React.useState(false);
  const [showAssignAlert, setShowAssignAlert] = React.useState(false);
  const [showSaveAlert, setShowSaveAlert] = React.useState(false);

  React.useEffect(() => {
    axios
      .get("http://localhost:5000/gymuser/getcurrentusers", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setUserData(res.data);
        const names = res.data.map((user) => {
          return { label: user.Name, id: user._id };
        });
        setCurrentUsers(names);
      })
      .catch((error) => {
        console.error("Error", error);
      });
  }, [update]);

  React.useEffect(() => {
    axios
      .get("http://localhost:5000/gymexercisemaster/getcurrentexercises", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((data) => {
        const ex = data.data.data.map((exercise) => exercise.Exercise);
        setFinalArr(ex);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleChange = (value, data) => {
    let x = userData.find((value) => value._id === data.id);
    console.log("--", x);
    setUser(data);
    setExerciseInput({});
    setExerciseAdded(x.Exercise ? x.Exercise : {});
    setShowError(false);
  };

 const handleAddRow = (day) => {
   const { exercise, reps, sets } = exerciseInput[day];

   if (!exercise || !reps || !sets) {
     setShowError(true);
     setTimeout(() => {
       setShowError(false);
     }, 3000);
     return;
   }

   setShowAssignAlert(true);
   setTimeout(() => {
     // Scroll to the top of the page
     window.scrollTo({ top: 0, behavior: "smooth" });
   }, 1000);

  //  

   const updatedExercises = {
     ...exerciseAdded,
     [day]: [...(exerciseAdded[day] || []), { exercise, reps, sets }],
   };
   setExerciseAdded(updatedExercises);

   setExerciseInput((prev) => ({
     ...prev,
     [day]: { exercise: "", reps: "", sets: "", status: "" },
   }));

   setShowError(false);
 };

  const handleInputChange = (value, day) => {
    const { name, value: selectedValue } = value.target;
    setExerciseInput((prev) => ({
      ...prev,
      [day]: { ...prev[day], [name]: selectedValue },
    }));
  };

  const handleSaveClick = () => {
  setShowAssignAlert(false);
  const exercisesArray = Object.values(exerciseAdded).flat();

  if (exercisesArray.length === 0) {
    setShowSaveAlert(true);
    setTimeout(() => {
      setShowSaveAlert(false);
    }, 3000);
    return;
  }

  const object = {
    Exercise: exerciseAdded,
  };

  axios
    .post("http://localhost:5000/gymuser/assignexercise?id=" + user.id, object)
    .then((data) => {
      setFinalArr([data]);
      doUpdate(!update);
      setShowSuccessAlert(true);
      setTimeout(() => {
        setShowSuccessAlert(false);
      }, 3000);
    })
    .catch((error) => {
      console.log(error);
    });
};

  const handleDeleteClick = (day, index) => {
    if (!exerciseAdded[day] || !Array.isArray(exerciseAdded[day])) {
      return;
      
    }

    const updatedExercises = { ...exerciseAdded };

    updatedExercises[day] = [...exerciseAdded[day]];
    updatedExercises[day].splice(index, 1);
    setExerciseAdded(updatedExercises);
     setShowAssignAlert(true);
     setTimeout(() => {
       setShowAssignAlert(false);
     }, 3000);
  };

  return (
    <ThemeProvider theme={theme}>
      <Navbar />
      {showSuccessAlert && (
        <Alert
          severity="success"
          sx={{
            marginTop: "10px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          Exercise assigned to the user successfully
        </Alert>
      )}
      {showError && (
        <center>
          <Alert
            severity="error"
            className="mt-2"
            style={{
              width: "30%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            Please Fill in all the required fields!!!
          </Alert>
        </center>
      )}
      {showSaveAlert && (
        <Alert
          severity="error"
          sx={{
            marginTop: "10px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          Please assign the exercise before saving
        </Alert>
      )}
      {showAssignAlert && (
        <Alert
          severity="success"
          sx={{
            marginTop: "10px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          Now Click on the save button to assign
        </Alert>
      )}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "50px",
        }}
      >
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={currentUsers}
              onChange={handleChange}
              sx={{ width: 300, margin: "auto", height: "50px" }}
              renderInput={(params) => (
                <TextField {...params} label="Select User" />
              )}
              disableClearable
            />
          </div>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <div>
            <Button
              onClick={() => handleSaveClick()}
              variant="contained"
              color="success"
              style={{ width: "80px", marginTop: "10px" }}
            >
              Save
            </Button>
          </div>
        </div>
      </div>
      
      <TableContainer
        component={Paper}
        sx={{ maxWidth: "80%", margin: "auto", marginTop: "40px" }}
      >
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">
                <b>Day</b>
              </StyledTableCell>
              <StyledTableCell align="center">
                <b>Exercise</b>
              </StyledTableCell>
              <StyledTableCell align="center">
                <b>Reps</b>
              </StyledTableCell>
              <StyledTableCell align="center">
                <b>Sets</b>
              </StyledTableCell>
              <StyledTableCell align="center">
                <b>Actions</b>
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {daysOfWeek.map((day) => (
              <React.Fragment key={day}>
                <TableRow>
                  <StyledTableCell align="center">
                    <b>{day}</b>
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <Autocomplete
                      disablePortal
                      id={`exercise-dropdown-${day}`}
                      options={finalArr}
                      sx={{ width: 300, margin: "auto" }}
                      value={exerciseInput[day]?.exercise || ""}
                      onChange={(event, value) => {
                        handleInputChange(
                          { target: { name: "exercise", value } },
                          day
                        );
                      }}
                      renderInput={(params) => (
                        <TextField {...params} label="Exercise" />
                      )}
                      disableClearable
                    />
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <TextField
                      name="reps"
                      type="number"
                      size="small"
                      variant="standard"
                      value={exerciseInput[day]?.reps || ""}
                      onChange={(e) => handleInputChange(e, day)}
                    />
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <TextField
                      name="sets"
                      type="number"
                      size="small"
                      variant="standard"
                      value={exerciseInput[day]?.sets || ""}
                      onChange={(e) => handleInputChange(e, day)}
                    />
                  </StyledTableCell>

                  <StyledTableCell align="center">
                    <Button
                      variant="contained"
                      color="success"
                      onClick={() => handleAddRow(day)}
                    >
                      Add
                    </Button>
                  </StyledTableCell>
                </TableRow>
                {exerciseAdded[day]?.map((exercise, index) => (
                  <TableRow key={`${day}-${index}`}>
                    <StyledTableCell align="center"></StyledTableCell>
                    <StyledTableCell align="center">
                      {exercise.exercise}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {exercise.reps}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {exercise.sets}
                    </StyledTableCell>
                   
                    <StyledTableCell align="center">
                      <IconButton
                        aria-label="delete"
                        size="large"
                        style={{ color: "black" }}
                        onClick={() => handleDeleteClick(day, index)}
                      >
                        <DeleteIcon fontSize="inherit" />
                      </IconButton>
                    </StyledTableCell>
                  </TableRow>
                ))}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      
      <Footer />
    </ThemeProvider>
  );
};

export default ComboBox;
