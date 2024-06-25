import * as React from "react";
import { useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Alert from "@mui/material/Alert";
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { TableBody } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import Fab from "@mui/material/Fab";
import Navbar from "./Navbar";
import Footer from "./Footer";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 30,
  },
}));

export default function User() {
  const [data, setData] = useState({
    Name: "",
    Email: "",
    Password: "",
    Age: "",
    Gender: "",
    PhoneNo: "",
    Address: "",
    City: "",
    State: "",
    Height: "",
    Weight: "",
    MedicalIssue: "",
    Target: "",
  });

  const [open, setOpen] = useState(false);
  const [finalArr, setFinalArr] = useState([]);
  const [showError, setShowError] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [updateId, setUpdateId] = React.useState();
  const [update, doUpdate] = React.useState(false);
  const [invalidInput, setInvalidInput] = useState(false);
  const [invalidEmail, setInvalidEmail] = useState(false);

  React.useEffect(() => {
    axios
      .get("http://localhost:5000/gymuser/getcurrentusers", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((data) => {
        setFinalArr(data.data);
        console.log(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [update]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleChange = (e, type) => {
    setShowError(false);

    let value = e.target.value;

    setData({ ...data, [type]: value });
  };

  const handleName = (e, type) => {
    if (/^[a-zA-Z\s]*$/.test(e.target.value)) {
      setData({ ...data, [type]: e.target.value });
      setInvalidInput(false);
    } else {
      setInvalidInput(true);
    }
  };
  const handleBlur = (e, type) => {
    if (type === "Email") {
      const email = e.target.value;
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailRegex.test(email)) {
        setInvalidEmail(true);
      } else {
        setInvalidEmail(false);
      }
    }
  };

  // const phoneRegex = /^[6-9]\d{9}$/;
  // if (!phoneRegex.test(data.PhoneNo)) {
  //   setShowError(true);
  //   return;
  // }

  //Add User
  const handleSubmitClick = () => {
    // Height validation
    if (parseInt(data.Height) <= 0) {
      setShowError(true);
      return;
    }

    // Weight validation
    if (parseInt(data.Weight) <= 0) {
      setShowError(true);
      return;
    }

    // Age validation
    if (parseInt(data.Age) <= 14) {
      console.log("Invalid age");
      setShowError(true);
      return;
    }

    if (
      !data.Name ||
      !data.Email ||
      !data.Password ||
      !data.Age ||
      !data.Gender ||
      !data.PhoneNo ||
      !data.Address ||
      !data.City ||
      !data.State ||
      !data.Height ||
      !data.Weight ||
      !data.MedicalIssue ||
      !data.Target
    ) {
      setShowError(true);

      setTimeout(() => {
        setShowError(false);
      }, 3000);
      return;
    }

    const userData = {
      Name: data.Name,
      Email: data.Email,
      Password: data.Password,
      Age: data.Age,
      Gender: data.Gender,
      PhoneNo: data.PhoneNo,
      Address: data.Address,
      City: data.City,
      State: data.State,
      Height: data.Height,
      Weight: data.Weight,
      MedicalIssue: data.MedicalIssue,
      Target: data.Target,
    };

    if (!updateId) {
      axios
        .post("http://localhost:5000/gymuser/adduser", userData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          if (res.data.isSuccess) {
            setOpen(false);

            setData({});
            setFormSubmitted(true);
            doUpdate(!update);
          } else {
            setTimeout(() => {
              setShowError(true);
            }, 3000);
            setFormSubmitted(false);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      axios
        .post(`http://localhost:5000/gymuser/updateuser?id=${updateId}`, data, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          console.log("Update", res.data);
          if (res.data.isSuccess) {
            setOpen(false);
            doUpdate(!update);
            setFormSubmitted(true);
            setTimeout(() => {
              setFormSubmitted(false);
            }, 3000);
          } else {
            setFormSubmitted(false);
            setData({});
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
    setFormSubmitted(false);
  };

  const handleClose = () => {
    setData({});
    setOpen(false);
    setShowError(false);
    setFormSubmitted(false);
  };

  // Delete User
  const handleDeleteClick = (id) => {
    console.log("error", id);
    axios
      .delete(`http://localhost:5000/gymuser/softdeleteuser?id=${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log(res);
        let idx = finalArr.findIndex((val) => val.id === id);
        finalArr.splice(idx, id);
        setData(data);
        doUpdate(!update);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Update User
  const handleUpdateClick = (id) => {
    setFormSubmitted(false);
    setShowError(false);
    setOpen(true);
    let userToUpdate = finalArr.find((val) => val._id === id);
    setData(userToUpdate);
    setUpdateId(id);
  };

  return (
    <>
      <Navbar />
      <div style={{ textAlign: "center", margin: "10px" }}>
        <Button variant="contained" color="success" onClick={handleClickOpen}>
          Add User
        </Button>
        <Dialog
          open={open}
          onClose={handleClose}
          PaperProps={{
            style: {
              width: "80%",
              margin: "auto",
            },
            component: "form",
            onSubmit: (event) => {
              event.preventDefault();
              handleClose();
            },
          }}
        >
          <DialogContent>
            <h2 style={{ textAlign: "center" }}>Add New User</h2>
            <Button
              variant="outlined"
              color="error"
              onClick={handleClose}
              style={{ position: "absolute", right: 0, top: 0 }}
            >
              X{/* Close */}
            </Button>

            {showError && (
              <Alert severity="error" className="mt-2">
                Please Fill in all the required fields!!!
              </Alert>
            )}
            {formSubmitted && (
              <Alert severity="success" sx={{ mt: 2 }}>
                User added successfully! You can close this dialog now :)
              </Alert>
            )}
            <br />
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  label="Name"
                  variant="outlined"
                  fullWidth
                  value={data.Name}
                  onChange={(e) => handleName(e, "Name")}
                  required
                  error={invalidInput}
                  helperText={
                    invalidInput ? "Only letters and spaces are allowed" : ""
                  }
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  label="Email Address"
                  variant="outlined"
                  fullWidth
                  value={data.Email}
                  type="email"
                  onChange={(e) => handleChange(e, "Email")}
                  onBlur={(e) => handleBlur(e, "Email")}
                  error={invalidEmail}
                  helperText={invalidEmail ? "Invalid email address" : ""}
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Password"
                  type="password"
                  fullWidth
                  value={data.Password}
                  onChange={(e) => handleChange(e, "Password")}
                  required
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  labelId="demo-simple-select-label"
                  id="outlined-basic"
                  label="Age(>14)"
                  variant="outlined"
                  type="number"
                  fullWidth
                  value={data.Age}
                  inputProps={{ min: "14" }}
                  onChange={(e) => handleChange(e, "Age")}
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                  <Select
                    labelid="demo-simple-select-label"
                    id="demo-simple-select"
                    variant="outlined"
                    value={data.Gender}
                    label="Gender"
                    required
                    onChange={(e) => handleChange(e, "Gender")}
                  >
                    <MenuItem value="Gender" selected>
                      Gender
                    </MenuItem>
                    <MenuItem value="Male">Male</MenuItem>
                    <MenuItem value="Female">Female</MenuItem>
                    <MenuItem value="Other">Other</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={6}>
                <TextField
                  label="Contact Number"
                  variant="outlined"
                  fullWidth
                  type="tel"
                  id="phone"
                  pattern="[0–9]{10}"
                  value={data.PhoneNo}
                  onChange={(e) => handleChange(e, "PhoneNo")}
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Address"
                  type="text"
                  fullWidth
                  value={data.Address}
                  onChange={(e) => handleChange(e, "Address")}
                  required
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  label="City"
                  variant="outlined"
                  fullWidth
                  type="text"
                  value={data.City}
                  onChange={(e) => handleChange(e, "City")}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="State"
                  variant="outlined"
                  fullWidth
                  type="text"
                  value={data.State}
                  onChange={(e) => handleChange(e, "State")}
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  label="Height(cm)"
                  variant="outlined"
                  type="number"
                  fullWidth
                  value={data.Height}
                  onChange={(e) => handleChange(e, "Height")}
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Weight(Kg)"
                  variant="outlined"
                  type="number"
                  fullWidth
                  value={data.Weight}
                  onChange={(e) => handleChange(e, "Weight")}
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Medical Issue"
                  variant="outlined"
                  fullWidth
                  type="text"
                  value={data.MedicalIssue}
                  onChange={(e) => handleChange(e, "MedicalIssue")}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Target"
                  variant="outlined"
                  fullWidth
                  type="text"
                  value={data.Target}
                  onChange={(e) => handleChange(e, "Target")}
                  required
                />
              </Grid>

              {/* User Photo */}
            </Grid>
          </DialogContent>
          <DialogActions style={{ display: "flex", justifyContent: "center" }}>
            <Button
              variant="contained"
              color="success"
              onClick={handleSubmitClick}
            >
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      <TableContainer
        component={Paper}
        sx={{ maxWidth: "80%", margin: "auto", marginTop: "20px" }}
      >
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center" style={{ fontWeight: "bold" }}>
                User Name
              </StyledTableCell>
              <StyledTableCell align="center" style={{ fontWeight: "bold" }}>
                Height (cm)
              </StyledTableCell>
              <StyledTableCell align="center" style={{ fontWeight: "bold" }}>
                Weight (Kg)
              </StyledTableCell>
              <StyledTableCell align="center" style={{ fontWeight: "bold" }}>
                Edit
              </StyledTableCell>
              <StyledTableCell align="center" style={{ fontWeight: "bold" }}>
                Delete
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.isArray(finalArr) &&
              finalArr.map((val, _id) => (
                <TableRow key={val._id}>
                  <TableCell align="center">{val.Name}</TableCell>
                  {/* <TableCell align="center">{val.AssignExercise}</TableCell> */}
                  <TableCell align="center">{val.Height}</TableCell>
                  <TableCell align="center">{val.Weight}</TableCell>

                  <TableCell align="center">
                    {/* <button
                    className="btn btn-primary"
                    onClick={() => handleUpdateClick(val._id)}
                  >
                    Update
                  </button> */}
                    <Fab
                      color="secondary"
                      aria-label="edit"
                      style={{
                        width: "35px",
                        height: "30px",
                        backgroundColor: "black",
                      }}
                      onClick={() => handleUpdateClick(val._id)}
                    >
                      <EditIcon style={{ color: "white", fontSize: "large" }} />
                    </Fab>
                  </TableCell>
                  <TableCell align="center">
                    {/* <button
                    className="btn btn-danger"
                    onClick={() => handleDeleteClick(val._id)}
                  >
                    Delete
                  </button> */}
                    <IconButton
                      aria-label="delete"
                      size="large"
                      style={{ color: "black" }}
                      onClick={() => handleDeleteClick(val._id)}
                    >
                      <DeleteIcon fontSize="inherit" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <br />
      <br />
      <Footer />
    </>
  );
}
