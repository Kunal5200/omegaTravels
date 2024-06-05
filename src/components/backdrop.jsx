import { Backdrop, CircularProgress } from "@mui/material";
import React from "react";

const BackdropFilter = ({ open, setOpen }) => {
  return (
    <div className="main-wrapper">
      <Backdrop sx={{ color: "#fff", zIndex: 9999 }} open={open}> 
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};

export default BackdropFilter;
