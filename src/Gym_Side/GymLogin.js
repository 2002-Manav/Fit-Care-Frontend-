import React, { useState, useRef} from "react";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  Card,
  CardContent,
  TextField,
  FormControlLabel,
  Checkbox,

  Grid,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link } from "react-router-dom";
import Img from "../Gym_Side/images/Fit1.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Alert from "@mui/material/Alert";
import Footer from "./Footer";

function GymLogin() {
  let navigate = useNavigate();
  const [GymName, setGymName] = useState(localStorage.getItem("GymName") || "");
  const [Password, setPassword] = useState("");
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  // const[gymError, setGymError] = useState(false);

  let usernameInputRef = useRef();


  const handleChange = (e, type) => {
    if (type === "Username") {
      setGymName(e.target.value);
    } else if (type === "Password") {
      setPassword(e.target.value);
    } else {
      console.log("Error value!!!");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let obj = { GymName: GymName, Password: Password };
    axios
      .post("http://localhost:5000/Gym/Login", obj)
      .then((res) => {
        console.log(res.data);
        if (res.data.isSuccess) {
          if (res.data.token) {
            localStorage.setItem("token", res.data.token);
          }
          setShowError(false);
          setShowSuccess(true);
          setTimeout(() => {
            setShowSuccess(false);
            navigate("/Gym_Side/Dashboard");
          }, 2000);
        } else {
          setShowError(true);
          setShowSuccess(false);
        }
        // setGymError(gymError);
      })
      .catch((err) => {
        console.log(err);
        
      });
  };

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: "#1976d2",
      },
    },
  });


  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <AppBar component="nav" position="static" color="primary">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <img
                src={Img}
                alt="FitCare Logo"
                style={{
                  height: "50px",
                  width: "50px",
                }}
              />
              <b>FIT-CARE</b>
            </Typography>
          </Toolbar>
        </AppBar>
      </ThemeProvider>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "50px",
          // marginBottom: "30px",
        }}
      >
        <Card
          sx={{
            maxWidth: 450,
            width: "100%",
            padding: 2,
            boxShadow: "0px 4px 8px rgba(0, 0, 0.2, 0.5)",
            marginBottom: "-120px",
            justifyContent: "center",
          }}
        >
          <CardContent>
            <Typography variant="h5" align="center" gutterBottom>
              <b>Gym Login</b>
            </Typography>
            {showError && (
              <Alert severity="error" className="mt-2">
                Please Fill in all the required fields!!!
              </Alert>
            )}
            {showSuccess && (
              <Alert severity="success" className="mt-2">
                Logged-In Successfully
              </Alert>
            )}
            {/* {gymError && (
              <Alert severity="success" className="mt-2">
                Logged-In Successfully
              </Alert>
            )} */}
            <br />
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Gym Username"
                type="text"
                id="username"
                value={GymName}
                onChange={(e) => handleChange(e, "Username")}
                required
                sx={{ "& .MuiOutlinedInput-root": { borderColor: "black" } }}
                ref={usernameInputRef}
              />
              <br />
              <br />
              <TextField
                fullWidth
                label="Password"
                type="password"
                id="password"
                value={Password}
                onChange={(e) => handleChange(e, "Password")}
                required
                sx={{ "& .MuiOutlinedInput-root": { borderColor: "black" } }}
              />
              <br />
              <FormControlLabel
                sx={{
                  display: "flex",
                  justifyContent: "center",
                }}
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  marginBottom: "20px",
                }}
              >
                <Button
                  variant="contained"
                  color="success"
                  onClick={handleSubmit}
                >
                  Log In
                </Button>
              </Box>
              <Grid
                container
                style={{ display: "flex", justifyContent: "center" }}
              >
                <Grid item>
                  Don't have an account? &nbsp;
                  <Button>
                    <Link to="/Gym_Side/GymRegister" variant="body2">
                      {"Sign Up"}
                    </Link>
                  </Button>
                </Grid>
              </Grid>
              <b>Note</b>: Use your "Gym Name" & "Password" for Login
            </form>
          </CardContent>
        </Card>
      </Box>
      {/* Calling Footer */}
      <Footer />
    </>
  );
}

export default GymLogin;
