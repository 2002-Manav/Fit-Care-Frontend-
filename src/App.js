import React from "react";
import Login from "../src/User_Side/Login";
import UserDashboard from "./User_Side/Dashboard";
import UserChat from "./User_Side/Chat";
import GymRegister from "./Gym_Side/GymRegister";
import GymLogin from "./Gym_Side/GymLogin";
import ExerciseMaster from "./Gym_Side/ExerciseMaster";
import User from "./Gym_Side/User";
import Trainer from "./Gym_Side/Trainer";
import AssignExercise from "./Gym_Side/AssignExercise";
import Chat from "./User_Side/Chat";
import Dashboard from "./Gym_Side/Dashboard";
import Home from "./Gym_Side/Home";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// Authentication
const PrivateAuth = ({ children }) => {
  const isAuth = () => {
    let token = localStorage.getItem("token");
    return token ? true : false;
  };

  return isAuth() ? children : <Navigate to="/" />;
};

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={ <Home/>} />
          <Route
            path="/Gym_Side/GymLogin"
            element={
              // <PrivateAuth>
                <GymLogin />
              // </PrivateAuth>
            }
          />
          <Route
            path="/Gym_Side/User"
            element={
              <PrivateAuth>
                <User />
              </PrivateAuth>
            }
          />
          <Route
            path="/Gym_Side/Trainer"
            element={
              <PrivateAuth>
                <Trainer />
              </PrivateAuth>
            }
          />
          <Route
            path="/Gym_Side/AssignExercise"
            element={
              <PrivateAuth>
                <AssignExercise />
              </PrivateAuth>
            }
          />
          <Route
            path="/Gym_Side/Dashboard"
            element={
              <PrivateAuth>
                <Dashboard />
              </PrivateAuth>
            }
          />
          <Route
            path="/Gym_Side/ExerciseMaster"
            element={
              <PrivateAuth>
                <ExerciseMaster />
              </PrivateAuth>
            }
          />
          <Route path="/Gym_Side/GymRegister" element={<GymRegister />} />
          <Route
            path="/User_Side/Chat"
            element={
              <PrivateAuth>
                <Chat />
              </PrivateAuth>
            }
          />
          <Route path="/User_Side/Login" element={<Login />} />
          <Route
            path="/User_Side/Dashboard"
            element={
              <PrivateAuth>
                <UserDashboard />
              </PrivateAuth>
            }
          />
          <Route
            path="/User_Side/Chat"
            element={
              <PrivateAuth>
                <UserChat />
              </PrivateAuth>
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
