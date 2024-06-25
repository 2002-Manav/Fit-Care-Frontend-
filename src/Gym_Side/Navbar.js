import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import Img from "../Gym_Side/images/Fit1.png";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

const drawerWidth = 240;
const navItems = [
  "User",
  "Trainer",
  "Exercise Master",
  "Assign Exercise",
  "Dashboard",
];

function DrawerAppBar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [GymName, setGymName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const isSuccess = localStorage.getItem("isSuccess");
    if (isSuccess) {
      fetchGymData();
    }
  }, []);

  const fetchGymData = async () => {
    try {
      const response = await fetch("http://localhost:5000/Gym/Login", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch gym data");
      }
      const data = await response.json();
      setGymName(data.data.GymName); 
    } catch (error) {
      console.error("Error fetching gym data:", error.message);
    }
  };

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: "#1976d2",
      },
    },
  });

  const handleItemClick = (item) => {
    switch (item) {
      case "User":
        navigate("/Gym_Side/User");
        break;
      case "Trainer":
        navigate("/Gym_Side/Trainer");
        break;
      case "Exercise Master":
        navigate("/Gym_Side/ExerciseMaster");
        break;
      case "Dashboard":
        navigate("/Gym_Side/Dashboard");
        break;
      case "Assign Exercise":
        navigate("/Gym_Side/AssignExercise");
        break;
      default:
        break;
    }
    handleDrawerToggle();
  };

  const drawer = (
    <Drawer
      variant="temporary"
      open={mobileOpen}
      onClose={handleDrawerToggle}
      ModalProps={{
        keepMounted: true,
      }}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          border: "3px",
        },
      }}
    >
      <Box sx={{ textAlign: "center" }}>
        <Typography variant="h6" sx={{ my: 2 }}>
          {GymName}
        </Typography>

        <List>
          {navItems.map((item) => (
            <ListItem key={item} disablePadding>
              <ListItemButton
                onClick={() => handleItemClick(item)}
                sx={{
                  "&:hover": {
                    backgroundColor: "#35455d",
                  },
                }}
              >
                <ListItemText primary={item} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <ThemeProvider theme={darkTheme}>
        <AppBar component="nav" position="static" color="primary">
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
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
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                style={{ width: "220px" }}
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={() => setOpenDialog(true)}>
                  <button
                    style={{
                      color: "white",
                      background: "transparent",
                      border: "none",
                    }}
                  >
                    Profile
                  </button>
                </MenuItem>
                <MenuItem
                  onClick={(token) => {
                    navigate("/");
                    localStorage.clear(token);
                  }}
                >
                  Log Out
                </MenuItem>
              </Menu>
            </div>
          </Toolbar>
        </AppBar>

        {drawer}
      </ThemeProvider>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Gym Profile</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
           
            Gym Name: {GymName}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

DrawerAppBar.propTypes = {
  window: PropTypes.func,
};

export default DrawerAppBar;
