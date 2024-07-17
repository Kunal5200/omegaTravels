import AddCGMP from "@/assesst/modal/addCGMP";
import { showModal } from "@/redux/reducers/modal";
import { Add } from "@mui/icons-material";
import { Box, Button, Stack, Typography } from "@mui/material";
import { Roboto_Slab } from "next/font/google";
import React from "react";
import { useDispatch } from "react-redux";

const roboto = Roboto_Slab({
  weight: "600",
  subsets: ["latin"],
});
const CGMP = () => {
  const dispatch = useDispatch();
  const addModal = () => {
    dispatch(showModal(<AddCGMP />));
  };
  return (
    <div className="main-wrapper">
      <Box>
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
          p={2}
        >
          <Typography fontFamily={roboto.style} fontSize={20}>
            CGMP Management
          </Typography>
          <Button
            endIcon={<Add />}
            sx={{
              border: "1px solid #000",
              backgroundColor: "#000",
              color: "#fff",
              ":hover": {
                backgroundColor: "#000",
                color: "#fff",
              },
            }}
            onClick={addModal}
          >
            Add Setting
          </Button>
        </Stack>
      </Box>
    </div>
  );
};

export default CGMP;
