import React, { useState } from "react";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";
import axios from "axios";
import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
  TableBody,
  Select,
  MenuItem,
  Alert,
  FormControl,
  InputLabel,
} from "@mui/material";
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

export default function Exercise() {
  const [data, setData] = useState({
    Exercise: "",
    ImpactArea: "",
  });
  const [open, setOpen] = useState(false);
  const [finalArr, setFinalArr] = useState([]);
  const [showError, setShowError] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [invalidInput, setInvalidInput] = useState(false);
  const [updateId, setUpdateId] = React.useState();
  const [update, doUpdate] = React.useState(false);

  React.useEffect(() => {
    axios
      .get("http://localhost:5000/gymexercisemaster//getcurrentexercises", {
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
    setShowError(false);
    if (/^[a-zA-Z\s]*$/.test(e.target.value)) {
      setData({ ...data, [type]: e.target.value });
      console.log(data);
      setInvalidInput(false);
    } else {
      setInvalidInput(true);
    }
  };


  const handleSubmitClick = () => {
    if (!updateId) {
      axios
        .post("http://localhost:5000/gymexercisemaster/addexercise", data, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          if (res.data.isSuccess) {
            setOpen(false);
            setData({});
            doUpdate(!update);
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
          `http://localhost:5000/gymexercisemaster/updateexercise?id=${updateId}`,
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
      .delete(
        `http://localhost:5000/gymexercisemaster/softdeleteexercise?id=${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
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
      <div style={{ textAlign: "center", margin: "15px" }}>
        <Button variant="contained" color="success" onClick={handleClickOpen}>
          Add Exercise
        </Button>
        {/* <br /> */}
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
              Add New Exercise
            </h2>
            <Button
              color="error"
              variant="outlined"
              onClick={handleClose}
              style={{ position: "absolute", right: 0, top: 0 }}
            >
              X
            </Button>
            {showError && (
              <Alert severity="error" sx={{ mt: 2 }}>
                Please fill in all the required fields!
              </Alert>
            )}

            {formSubmitted && (
              <Alert severity="success" sx={{ mt: 2 }}>
                Exercise added successfully! You can close this dialog :)
              </Alert>
            )}
            <br />
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Exercise"
                  variant="outlined"
                  fullWidth
                  type="text"
                  value={data.Exercise}
                  onChange={(e) => handleChange(e, "Exercise")}
                  error={invalidInput}
                  helperText={
                    invalidInput ? "Only letters and spaces are allowed" : ""
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Impact Area
                  </InputLabel>
                  <Select
                    labelid="demo-simple-select-label"
                    id="demo-simple-select"
                    variant="outlined"
                    value={data.ImpactArea}
                    label="Impact Area"
                    required
                    onChange={(e) => handleChange(e, "ImpactArea")}
                  >
                    <MenuItem value="">Impact Area</MenuItem>
                    <MenuItem value="Lower Body">Lower Body</MenuItem>
                    <MenuItem value="Core">Core</MenuItem>
                    <MenuItem value="Upper Body">Upper Body</MenuItem>
                  </Select>
                </FormControl>
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
      <br />
      <TableContainer
        component={Paper}
        sx={{ maxWidth: "75%", margin: "auto" }}
      >
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center" style={{ fontWeight: "bold" }}>
                Exercise Name
              </StyledTableCell>
              <StyledTableCell align="center" style={{ fontWeight: "bold" }}>
                Impact Area
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
                  {/* Add key prop here */}
                  <TableCell align="center">{val.Exercise}</TableCell>
                  <TableCell align="center">{val.ImpactArea}</TableCell>
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
