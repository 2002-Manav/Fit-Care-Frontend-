import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import { grey } from "@mui/material/colors";

const socialMediaLinks = [
  { icon: <FacebookIcon />, link: "https://www.facebook.com" },
  { icon: <TwitterIcon />, link: "https://www.twitter.com" },
  { icon: <LinkedInIcon />, link: "https://www.linkedin.com" },
  { icon: <InstagramIcon />, link: "https://www.instagram.com" },
];

const footerTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: grey[900],
    },
  },
});

function Footer() {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "25vh", height:"auto" }}>
      <Box sx={{ flex: "1" }}>

      </Box>
      <ThemeProvider theme={footerTheme}>
        <AppBar position="static" color="primary">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              &copy; {new Date().getFullYear()} FIT-CARE
            </Typography>
            <Box sx={{ textAlign: "center" }}>
              {socialMediaLinks.map((link, index) => (
                <IconButton
                  key={index}
                  aria-label={`link-${index}`}
                  color="inherit"
                  href={link.link}
                  target="_blank"
                >
                  {link.icon}
                </IconButton>
              ))}
            </Box>
          </Toolbar>
        </AppBar>
      </ThemeProvider>
    </Box>
  );
}

export default Footer;

