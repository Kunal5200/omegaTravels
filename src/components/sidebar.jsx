import { Box, Card, Typography } from "@mui/material";
import React from "react";

const Sidebar = () => {
  return (
    <div>
      <Card sx={{ position: "absolute", width: 250, height: "100vh" }}>
        <Box>
          <Typography textAlign={"center"}>Omega</Typography>
        </Box>
      </Card>
    </div>
  );
};

export default Sidebar;
