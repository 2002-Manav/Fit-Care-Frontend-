import React, { useState } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  Card,
  CardContent,
  TextField,
} from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import Alert from "@mui/material/Alert";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate, Link } from "react-router-dom";
import FormControlLabel from "@mui/material/FormControlLabel";
import Img from "../Gym_Side/images/Fit1.png";
import axios from "axios";
import Footer from "./Footer";

const GymRegister = () => {
  const [formData, setFormData] = useState({
    GymName: "",
    OwnerName: "",
    Email: "",
    Password: "",
    PhoneNo: "",
    GSTNo: "",
    City: "",
    Address: "",
    checked: false,
  });

  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);


  const handleChange = (e) => {
    setShowError(false);
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: "#1976d2",
      },
    },
  });

  

  let navigate = useNavigate();

  const handleSubmit = () => {

     const phoneRegex = /^[6-9]\d{9}$/;
     if (!phoneRegex.test(formData.PhoneNo)) {
       console.log("Invalid phone number");
       setShowError(true);
       return;
     }
    
    if (
      formData.GymName.trim() !== "" &&
      formData.OwnerName.trim() !== "" &&
      formData.Email.trim() !== "" &&
      formData.PhoneNo.trim() !== "" &&
      formData.City.trim() !== "" &&
      formData.Address.trim() !== "" &&
      formData.Password.trim() !== "" &&
      formData.checked
    ) {
      axios
        .post("http://localhost:5000/Gym/Register", formData)
        .then((res) => {
          console.log(res.data);
          if (res.data.isSuccess) {
            setShowSuccess(true);
            setTimeout(() => {
              setShowSuccess(false);
              navigate("/");
            }, 2000);
          } else {
            setShowError(true);
            setShowSuccess(false);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setShowError(true);
      setShowSuccess(false);
    }
  };

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <ThemeProvider theme={darkTheme}>
          <AppBar component="nav" position="static" color="primary">
            <Toolbar>
              <Typography
                variant="h6"
                component="div"
                sx={{ display: "flex", alignItems: "center" }}
              >
                <img
                  src={Img}
                  alt="FitCare Logo"
                  style={{ height: "50px", width: "50px" }}
                />
                <b>FIT-CARE</b>
              </Typography>
            </Toolbar>
          </AppBar>
        </ThemeProvider>
      </Box>
      <Card
        style={{
          display: "flex",
          justifyContent: "center",
          margin: "10px auto",
          maxWidth: 500,
          maxHeight: 570,
          boxShadow: "0px 4px 8px rgba(0, 0, 0.2, 0.5)",
        }}
      >
        <CardContent>
          <Typography variant="h5" align="center" gutterBottom>
            <b>Gym Register</b>
          </Typography>
          {showError && (
            <Alert severity="error" className="mt-2">
              Please Fill in all the required fields!!!
            </Alert>
          )}
          {showSuccess && (
            <Alert severity="success" className="mt-2">
              Registered successfully! Redirecting to the Login Page
            </Alert>
          )}
          <br />
          <div className="row justify-content-between text-left">
            <div className="form-group col-sm-6 flex-column d-flex">
              <TextField
                label="Gym Name"
                type="text"
                variant="outlined"
                required
                onChange={handleChange}
                name="GymName"
              />
            </div>
            <div className="form-group col-sm-6 flex-column d-flex">
              <TextField
                label="Owner Name"
                type="text"
                variant="outlined"
                required
                onChange={handleChange}
                name="OwnerName"
              />
            </div>
          </div>
          <div className="row justify-content-between text-left">
            <div className="form-group col-sm-6 flex-column d-flex">
              <TextField
                label="Email Address"
                variant="outlined"
                required
                onChange={handleChange}
                name="Email"
              />
            </div>

            <div className="form-group col-sm-6 flex-column d-flex">
              <TextField
                label="Password"
                type="password"
                variant="outlined"
                required
                onChange={handleChange}
                name="Password"
              />
            </div>
          </div>
          <div className="row justify-content-between text-left">
            <div className="form-group col-sm-6 flex-column d-flex">
              <TextField
                label="Phone number"
                variant="outlined"
                required
                type="number"
                id="phone"
                pattern="[0–9]{10}"
                onChange={handleChange}
                name="PhoneNo"
              />
            </div>
            <div className="form-group col-sm-6 flex-column d-flex">
              <TextField
                label="GST Number"
                variant="outlined"
                required
                onChange={handleChange}
                name="GSTNo"
              />
            </div>
          </div>
          <div className="row justify-content-between text-left">
            <div className="form-group col-sm-6 flex-column d-flex">
              <TextField
                label="City"
                variant="outlined"
                required
                onChange={handleChange}
                name="City"
              />
            </div>

            <div className="form-group col-sm-6 flex-column d-flex">
              <TextField
                label="Address"
                variant="outlined"
                required
                onChange={handleChange}
                name="Address"
              />
            </div>
          </div>

          <center>
            <div>
              <FormControlLabel
                control={<Checkbox color="primary" />}
                label="I agree to these Terms & Conditions"
                name="checked"
                checked={formData.checked}
                onChange={handleChange}
              />
            </div>
          </center>
          <center>
            <Button
              variant="contained"
              color="success"
              size="medium"
              onClick={handleSubmit}
            >
              Register
            </Button>
            <br />
            Already Registered? &nbsp;
            <Link to="/Gym_Side/GymLogin" variant="body2">
              {"Login"}
            </Link>
          </center>
        </CardContent>
      </Card>
      <br />
      <Footer />
    </>
  );
};

export default GymRegister;
