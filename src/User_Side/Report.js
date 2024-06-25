// import React, { useState } from "react";
// import Calendar from "react-calendar";
// import "react-calendar/dist/Calendar.css";
// import UserNavbar from "./UserNavbar";
// import Button from "@mui/material/Button";
// import { styled } from "@mui/material/styles";
// import Dialog from "@mui/material/Dialog";
// import DialogTitle from "@mui/material/DialogTitle";
// import DialogContent from "@mui/material/DialogContent";
// import DialogActions from "@mui/material/DialogActions";
// import IconButton from "@mui/material/IconButton";
// import CloseIcon from "@mui/icons-material/Close";
// import Typography from "@mui/material/Typography";
// import Checkbox from "@mui/material/Checkbox"; // Add this import
// import FormControlLabel from "@mui/material/FormControlLabel"; // Add this import

// const BootstrapDialog = styled(Dialog)(({ theme }) => ({
//   "& .MuiDialogContent-root": {
//     padding: theme.spacing(2),
//   },
//   "& .MuiDialogActions-root": {
//     padding: theme.spacing(1),
//   },
// }));

// function Report() {
//   const [value, onChange] = useState(new Date());
//   const [selectedDate, setSelectedDate] = useState(null);
//   const [open, setOpen] = useState(false);

//   const handleDateClick = (date) => {
//     setSelectedDate(date);
//     setOpen(true);
//   };

//   // const handleChange = (event) => {
//   //   setState({
//   //     ...state,
//   //     [event.target.name]: event.target.checked,
//   //   });
//   // };

//   const handleClose = () => {
//     setOpen(false);
//   };

//   return (
//     <>
//       <UserNavbar />
//       <div
//         style={{
//           display: "flex",
//           alignItems: "center",
//           margin: "100px",
//         }}
//       >
//         <div
//           style={{
//             flex: 1,
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//           }}
//         >
//           <Calendar
//             value={value}
//             onChange={onChange}
//             onClickDay={handleDateClick}
//             style={{ width: "450%", height: "200%" }}
//           />
//         </div>
//         <div>
//           <BootstrapDialog
//             onClose={handleClose}
//             aria-labelledby="customized-dialog-title"
//             open={open}
//             style={{}}
//           >
//             &nbsp;&nbsp;
//             <IconButton
//               aria-label="close"
//               onClick={handleClose}
//               sx={{
//                 position: "absolute",
//                 right: 8,
//                 top: 4,
//                 color: (theme) => theme.palette.grey[500],
//               }}
//             >
//               <CloseIcon />
//             </IconButton>
//             <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
//               <b>Today's Workout Plan</b>
//               <br />
//               {selectedDate
//                 ? selectedDate.toLocaleDateString("en-GB")
//                 : "Selected Date"}
//             </DialogTitle>
//             <DialogContent dividers>
//               <Typography gutterBottom>
//                 <FormControlLabel
//                   value="start"
//                   control={<Checkbox />}
//                   label="Push-ups"
//                   labelPlacement="start"
//                 />
//               </Typography>
//               <Typography gutterBottom>
//                 <FormControlLabel
//                   value="start"
//                   control={<Checkbox />}
//                   label="Crunches"
//                   labelPlacement="start"
//                 />
//               </Typography>
//             </DialogContent>
//             <DialogActions>
//               <Button autoFocus onClick={handleClose}>
//                 Edit
//               </Button>
//               <Button>Save changes</Button>
//             </DialogActions>
//           </BootstrapDialog>
//         </div>
//       </div>
//     </>
//   );
// }

// export default Report;
