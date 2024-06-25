import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Toolbar,
  AppBar,
  Box,
  Typography,
  Grid,
  Card,
  CardActions,
  Alert,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Image from "../User_Side/images/Fit1.png";
import axios from "axios";
import Footer from "../User_Side/Footer";


function Login() {
  const [myData, setMyData] = useState({});
  const [showError, setShowError] = useState(false);
  const [color, setColor] = useState();
  const navigate = useNavigate();



  const handleChange = (e, type) => {
    
    setShowError(false);

    if (type === "Email") {
      setMyData({ ...myData, Email: e.target.value });
    } else if (type === "Password") {
      setMyData({ ...myData, Password: e.target.value });
    } else {
      console.log("Error value!!!");
    }
  };


 const handleLogin = () => {
   if (!myData.Email || !myData.Password) {
     setColor("error");
     setShowError(true);
   } else {
     axios
       .post("http://localhost:5000/gymuser/userlogin", myData)
       .then((res) => {
         if (res.data.isSuccess) {
           if (res.data.token) {
             localStorage.setItem("token", res.data.token);
           }

           setShowError(true);
           setColor("success");
           localStorage.setItem("token", res.data.token);
           localStorage.setItem("userId", res.data.userID);
           setTimeout(() => {
             navigate("/User_Side/Dashboard");
           }, 2000);
         } else {
           setShowError(true);
           setColor("error");
         }
       })
       .catch((err) => {
         console.log(err);
       });
   }
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
                  src={Image}
                  alt="FitCare Logo"
                  style={{ height: "50px", width: "50px" }}
                />
                <b>FIT-CARE</b>
              </Typography>
            </Toolbar>
          </AppBar>
        </ThemeProvider>
      </Box>

      <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={{ minHeight: "80vh" }}
      >
        <Grid item xs={12} sm={8} md={6} lg={4}>
          <Card
            variant="outlined"
            style={{
              padding: "20px",
              borderRadius: "10px",
              boxShadow: "0px 4px 8px rgba(0, 0, 0.2, 0.5)",
            }}
          >
            <Typography variant="h5" align="center" gutterBottom>
              <b>User Login</b>
            </Typography>
            <form>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  {color === "error" && showError && (
                    <Alert severity="error" className="mt-2">
                      Please fill in all the required fields!!!
                    </Alert>
                  )}

                  {color === "success" && showError && (
                    <Alert severity="success" sx={{ mt: 2 }}>
                      Log In successful! Redirecting to Dashboard
                    </Alert>
                  )}
                  <br />
                  <TextField
                    fullWidth
                    id="email"
                    name="email"
                    label="Email Address"
                    placeholder="Enter your email address"
                    variant="outlined"
                    required
                    onChange={(e) => handleChange(e, "Email")}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="password"
                    name="password"
                    label="Password"
                    type="password"
                    placeholder="Enter your password"
                    variant="outlined"
                    required
                    onChange={(e) => handleChange(e, "Password")}
                  />
                </Grid>
              </Grid>
            </form>
            <br />
            <CardActions style={{ justifyContent: "center" }}>
              <Button variant="contained" color="success" onClick={handleLogin}>
                Log In
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
      <Footer/>
    </>
  );
}

export default Login;
