import { authControllers } from "@/api/auth";
import { hideModal } from "@/redux/reducers/modal";
import { Box, Button, TextareaAutosize, Typography } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

const AddNotes = (value) => {
  const businessID = value.value;

  const dispatch = useDispatch();

  const [note, setNote] = useState("");

  const inputHandler = (e) => {
    setNote(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const body = {
      note: note,
    };

    authControllers
      .addnotes(body, businessID)
      .then((res) => {
        console.log("response", res.data.message);
        dispatch(hideModal());
      })
      .catch((err) => {
        console.log("error", err);
      });
  };

  return (
    <Box>
      <Typography variant="h4" fontSize={"15px"} fontWeight={600}>
        Add Notes
      </Typography>
      <form onSubmit={submitHandler}>
        <Box sx={{ mt: 2 }}>
          <TextareaAutosize
            style={{
              width: "500px",
              minHeight: "100px",
              maxHeight: "300px",
              padding: "10px",
            }}
            onChange={inputHandler}
            value={note}
          />
        </Box>
        <Button
          style={{
            marginTop: "10px",
            backgroundColor: "#000",
            color: "#fff",
            width: "30%",
            padding: "12px",
          }}
          type="submit"
        >
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default AddNotes;
