import AddModules from "@/assesst/modal/addModules";
import { showModal } from "@/redux/reducers/modal";
import { Add } from "@mui/icons-material";
import { Button, Stack, Typography } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";

const Modules = () => {
  const dispatch = useDispatch();

  const addModules = () => {
    dispatch(showModal(<AddModules />));
  };
  return (
    <div>
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Typography fontSize={20} fontWeight={600}>
          Modules
        </Typography>
        <Button
          sx={{
            border: "1px solid #000",
            backgroundColor: "#000",
            color: "#fff",
            ":hover": {
              color: "#000",
            },
          }}
          endIcon={<Add />}
          onClick={addModules}
        >
          Add Modules
        </Button>
      </Stack>
    </div>
  );
};

export default Modules;
