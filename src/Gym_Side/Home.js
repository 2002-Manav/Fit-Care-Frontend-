import React from "react";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  Card,
  CardActions,
  CardContent,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import Img from "../Gym_Side/images/Fit1.png";
import Footer from "./Footer";

const Home = () => {
   const darkTheme = createTheme({
     palette: {
       mode: "dark",
       primary: {
         main: "#1976d2",
       },
     },
   });
  let navigate = useNavigate();
  
  return (
    <div>
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
                  marginRight: "10px",
                }}
              />
              <b>FIT-CARE</b>
            </Typography>
          </Toolbar>
        </AppBar>
      </ThemeProvider>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "50px",
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "center", gap: 10 }}>
          <Card sx={{ width: "400px", height: "400px", textAlign: "center" }}>
            <CardContent>
              <Typography variant="h5" component="div">
                Welcome to Fit-Care
              </Typography>
              <br />
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                Choose your login
              </Typography>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <CardActions
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Button
                    variant="contained"
                    color="success"
                    style={{ margin: "30px" }}
                    onClick={() => {
                      navigate("/Gym_Side/GymLogin");
                    }}
                  >
                    Login As Gym
                  </Button>
                  OR
                  <Button
                    variant="contained"
                    color="success"
                    style={{ margin: "30px" }}
                    onClick={() => {
                      navigate("/User_Side/Login");
                    }}
                  >
                    Login As User
                  </Button>
                </CardActions>
              </div>
            </CardContent>
          </Card>
          <Card sx={{ width: "400px", height: "400px", textAlign: "center" }}>
            <CardContent>
              <Typography variant="h5" component="div">
                Subscription Pricing
                <p style={{color:"red"}}>(In Future)</p>
              </Typography>
              <br />
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                Choose your plan
              </Typography>
              <br />
              <Typography variant="h4">₹499/Month</Typography>
              <br />
              <Typography variant="h4">₹1299/3-Months</Typography>
              <br />
              <Typography variant="h4">₹4999/Year</Typography>
              <br />
            </CardContent>
          </Card>
        </Box>
      </div>
      <br />
      <br />
      <br />
      <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
        <Card sx={{ width: 900, textAlign: "center" }}>
          <CardContent>
            <Typography variant="h5" component="div">
              About Us
            </Typography>
            <br />
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              Who we are?
            </Typography>
            <br />
            <Typography
              variant="body2"
              style={{
                textAlign: "justify",
                justifyItems: "center",
                fontFamily: "sans-serif",
              }}
            >
              <b>
                Fit-Care is a "Fitness Management & Monitoring System for Gyms"
                project stands as a groundbreaking solution poised to transform
                the fitness industry landscape. By empowering gym owners with
                innovative technology and user-centric design principles, this
                project aims to elevate gym management standards, enhance member
                experiences, and drive sustainable business growth in an
                increasingly competitive market environment.
              </b>
            </Typography>
            <br />
            <Typography
              variant="body2"
              style={{
                textAlign: "justify",
                justifyItems: "center",
                fontFamily: "sans-serif",
              }}
            >
              <b>
                One key aspect of the project is the implementation of Gym
                Cards, which serve as a convenient and secure way to
                authenticate members and provide access to gym facilities and
                services. These Gym Cards not only serve as a means of
                identifying members but also enable seamless integration with
                the Fitness Management & Monitoring System, allowing for
                efficient membership management and access control.
              </b>
            </Typography>
          </CardContent>
        </Card>
      </Box>
      <Footer style={{ minHeight: "2vh" }} />
    </div>
  );
};



export default Home;
