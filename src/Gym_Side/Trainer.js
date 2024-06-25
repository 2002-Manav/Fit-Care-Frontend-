import * as React from "react";
import { useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Grid from "@mui/material/Grid";
import { TableBody } from "@mui/material";
import { Select, InputLabel, FormControl } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Alert from "@mui/material/Alert";
import axios from "axios";
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

export default function Trainer() {
  const [data, setData] = useState({
    Trainername: "",
    Age: "",
    Gender: "",
    City: "",
    State: "",
    Height: "",
    Weight: "",
    Specialization: "",
    Experience: "",
    Description: "",
    Qualification: "",
    PhoneNo: "",
    Email: "",
    Password: "",
  });

  const [open, setOpen] = useState(false);
  const [finalArr, setFinalArr] = useState([]);
  const [showError, setShowError] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [updateId, setUpdateId] = React.useState();
  const [update, doUpdate] = React.useState(false);

  React.useEffect(() => {
    axios
      .get("http://localhost:5000/gymtrainer/getcurrenttrainers", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((data) => {
        setFinalArr(data.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [update]);

  const handleClickOpen = () => {
    setOpen(true);
  };

const handleChange = (e, type) => {
  console.log("handleChange:", type, e.target.value); 
  setShowError(false);
  setData({ ...data, [type]: e.target.value });
};

const handleSubmitClick = () => {
  console.log("Form data:", data); 
  const hasEmptyField = Object.values(data).some(
    (value) => typeof value === "string" && value.trim() === ""
  );

  if (hasEmptyField) {
    console.log("Empty field detected"); 
    setShowError(true);
    return;
  }

  // Age validation
  if (parseInt(data.Age) <= 14) {
    alert("Invalid age"); 
    setShowError(true);
    return;
  }

  // Contact number validation
  const phoneRegex = /^[6-9]\d{9}$/;
  if (!phoneRegex.test(data.PhoneNo)) {
    alert("Invalid phone number");
    setShowError(true);
    return;
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(data.Email) || !data.Email.endsWith("@gmail.com")) {
    alert("Invalid email"); 
    setShowError(true);
    return;
  }

  // Height, Weight, and Experience validation
  const positiveNumberFields = ["Height", "Weight", "Experience"];
  const invalidPositiveNumberField = positiveNumberFields.find(
    (field) => isNaN(parseFloat(data[field])) || parseFloat(data[field]) <= 0
  );
  if (invalidPositiveNumberField) {
    console.log("Invalid value for", invalidPositiveNumberField);
    setShowError(true);
    return;
  }

  setShowError(false);

  if (!updateId) {
    axios
      .post("http://localhost:5000/gymtrainer/addtrainer", data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        if (res.data.isSuccess) {
          setOpen(false);
          setData({});
          doUpdate(!update);
          setFormSubmitted(true);
          setTimeout(() => {
            setFormSubmitted(false);
          }, 3000);
        } else {
          setShowError(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    axios
      .post(
        `http://localhost:5000/gymtrainer/updatetrainer?id=${updateId}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
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
};

  const handleClose = () => {
    setFormSubmitted(false);
    setShowError(false);
    setData({});
    setOpen(false);
  };

  const handleDeleteClick = (id) => {
    console.log("error", id);
    axios
      .delete(`http://localhost:5000/gymtrainer/softdeletetrainer?id=${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    let idx = finalArr.findIndex((val) => val.id === id);
    finalArr.splice(idx, 1);
    setData({});
  };

  const handleUpdateClick = (id) => {
    setOpen(true);
    let ans = finalArr.find((val) => val._id === id);
    setData(ans);
    setUpdateId(id);
  };

  return (
    <>
      <Navbar />
      <div style={{ textAlign: "center", margin: "10px" }}>
        <Button variant="contained" color="success" onClick={handleClickOpen}>
          Add Trainer
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
              handleSubmitClick();
            },
          }}
        >
          <DialogContent>
            <h2 id="modal-modal-title" style={{ textAlign: "center" }}>
              Add New Trainer
            </h2>
            <Button
              variant="outlined"
              color="error"
              onClick={handleClose}
              style={{ position: "absolute", right: 0, top: 0 }}
            >
              X
            </Button>

            {showError && (
              <Alert severity="error" className="mt-2">
                Please fill in all the required fields!!!
              </Alert>
            )}
            {formSubmitted && (
              <Alert severity="success" sx={{ mt: 2 }}>
                Data added successfully! You can close this dialog
              </Alert>
            )}
            <br />
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  label="Trainer Name"
                  variant="outlined"
                  fullWidth
                  value={data.Trainername}
                  onChange={(e) => handleChange(e, "Trainername")}
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Age (>14)"
                  variant="outlined"
                  type="number"
                  fullWidth
                  value={data.Age}
                  onChange={(e) => handleChange(e, "Age")}
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <FormControl variant="outlined" fullWidth required>
                  <InputLabel id="gender-select-label">Gender</InputLabel>
                  <Select
                    labelId="gender-select-label"
                    id="gender-select"
                    value={data.Gender}
                    onChange={(e) => handleChange(e, "Gender")}
                    label="Gender"
                  >
                    <MenuItem value="Gender">Gender</MenuItem>
                    <MenuItem value="Male">Male</MenuItem>
                    <MenuItem value="Female">Female</MenuItem>
                    <MenuItem value="Other">Other</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="City"
                  variant="outlined"
                  fullWidth
                  value={data.City}
                  onChange={(e) => handleChange(e, "City")}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="State"
                  variant="outlined"
                  fullWidth
                  value={data.State}
                  onChange={(e) => handleChange(e, "State")}
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  label="Height (cm)"
                  variant="outlined"
                  type="number"
                  fullWidth
                  value={data.Height}
                  onChange={(e) => handleChange(e, "Height")}
                  inputProps={{ min: "0" }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Weight (Kg)"
                  variant="outlined"
                  type="number"
                  fullWidth
                  value={data.Weight}
                  onChange={(e) => handleChange(e, "Weight")}
                  inputProps={{ min: "0" }}
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  label="Specialization"
                  type="text"
                  fullWidth
                  value={data.Specialization}
                  onChange={(e) => handleChange(e, "Specialization")}
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Experience(in Yrs)"
                  type="number"
                  fullWidth
                  value={data.Experience}
                  onChange={(e) => handleChange(e, "Experience")}
                  inputProps={{ min: "0" }} 
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Description"
                  type="text"
                  fullWidth
                  value={data.Description}
                  onChange={(e) => handleChange(e, "Description")}
                  required
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  label="Qualification"
                  type="text"
                  fullWidth
                  value={data.Qualification}
                  onChange={(e) => handleChange(e, "Qualification")}
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Contact Number"
                  variant="outlined"
                  fullWidth
                  type="number"
                  id="phone"
                  pattern="[0–9]{10}"
                  value={data.PhoneNo}
                  onChange={(e) => handleChange(e, "PhoneNo")}
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Email"
                  type="email"
                  fullWidth
                  value={data.Email}
                  onChange={(e) => handleChange(e, "Email")}
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
                Trainer Name
              </StyledTableCell>
              <StyledTableCell align="center" style={{ fontWeight: "bold" }}>
                Specialization
              </StyledTableCell>
              <StyledTableCell align="center" style={{ fontWeight: "bold" }}>
                Experience(Yrs)
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
                <TableRow key={_id}>
                  <TableCell align="center">{val.Trainername}</TableCell>
                  <TableCell align="center">{val.Specialization}</TableCell>
                  <TableCell align="center">{val.Experience}</TableCell>
                  <TableCell align="center">
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
