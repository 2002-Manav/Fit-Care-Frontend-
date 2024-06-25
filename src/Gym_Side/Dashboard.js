import * as React from "react";
import {
  CssBaseline,
  Container,
  Grid,
  Paper,
  Typography,
  ThemeProvider,
} from "@mui/material";
import Navbar from "./Navbar";
import { createTheme } from "@mui/material/styles";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import Footer from "./Footer";


const mainTheme = createTheme({
  palette: {
    mode: "light",
  },
});

export default function Dashboard() {
  const [usersCount, setUsersCount] = React.useState(0);
  const [exercisesCount, setExercisesCount] = React.useState(0);
  const [trainersCount, setTrainersCount] = React.useState(0);

  const fetchData = async () => {
    try {

      const usersResponse = await axios.get(
        "http://localhost:5000/gymuser/getcurrentusers",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );


      const exercisesResponse = await axios.get(
        "http://localhost:5000/gymexercisemaster/getcurrentexercises",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );


      const trainersResponse = await axios.get(
        "http://localhost:5000/gymtrainer/getcurrenttrainers",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const usersCount = usersResponse.data.length;
      const exercisesCount = exercisesResponse.data.data.length;
      const trainersCount = trainersResponse.data.data.length;

      setUsersCount(usersCount);
      setExercisesCount(exercisesCount);
      setTrainersCount(trainersCount);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  React.useEffect(() => {
    fetchData();
  }, []);


  const data = [
    { name: "Jan", users: 400, trainers: 240, exercises: 200 },
    { name: "Feb", users: 300, trainers: 139, exercises: 221 },
    { name: "Mar", users: 200, trainers: 980, exercises: 229 },
    { name: "Apr", users: 278, trainers: 390, exercises: 200 },
    { name: "May", users: 189, trainers: 480, exercises: 218 },
    { name: "Jun", users: 239, trainers: 380, exercises: 250 },
    { name: "Jul", users: 349, trainers: 430, exercises: 210 },
    { name: "Aug", users: 249, trainers: 123, exercises: 300 },
    { name: "Sep", users: 123, trainers: 450, exercises: 190 },
    { name: "Oct", users: 189, trainers: 420, exercises: 210 },
    { name: "Nov", users: 239, trainers: 340, exercises: 230 },
    { name: "Dec", users: 349, trainers: 390, exercises: 180 },
  ];

  return (
    <React.Fragment>
      <CssBaseline />
      <Navbar />
      <ThemeProvider theme={mainTheme}>
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Grid container spacing={3} justifyContent="center">
            <Grid item xs={12} md={4} lg={3}>
              <Paper
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  height: 140,
                  backgroundColor: "lightyellow",
                }}
              >
                <Typography variant="h6" gutterBottom>
                  <b>Users</b>
                </Typography>
                <Typography variant="h4">{usersCount}</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4} lg={3}>
              <Paper
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  height: 140,
                  backgroundColor: "lightblue",
                }}
              >
                <Typography variant="h6" gutterBottom>
                  <b>Exercises</b>
                </Typography>
                <Typography variant="h4">{exercisesCount}</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4} lg={3}>
              <Paper
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  height: 140,
                  backgroundColor: "lightgreen",
                }}
              >
                <Typography variant="h6" gutterBottom>
                  <b>Trainers</b>
                </Typography>
                <Typography variant="h4">{trainersCount}</Typography>
              </Paper>
            </Grid>

            <Grid item xs={12} md={8} lg={9}>
              <br />
              <br />
              <br />
              <Paper
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  height: 240,
                }}
              >
                <Typography variant="h6" gutterBottom>
                  <b>User Growth</b>
                </Typography>
                <ResponsiveContainer width="100%" height="80%">
                  <LineChart
                    width={500}
                    height={300}
                    data={data}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="users" stroke="#8884d8" />
                    <Line type="monotone" dataKey="trainers" stroke="#82ca9d" />
                    <Line
                      type="monotone"
                      dataKey="exercises"
                      stroke="#ffc658"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </ThemeProvider>
      <Footer />
    </React.Fragment>
  );
}
