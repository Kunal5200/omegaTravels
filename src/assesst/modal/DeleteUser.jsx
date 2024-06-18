import { authControllers } from "@/api/auth";
import { hideModal } from "@/redux/reducers/modal";
import {
  Alert,
  Button,
  Divider,
  Snackbar,
  Stack,
  Typography,
} from "@mui/material";
import { Roboto_Slab } from "next/font/google";
import React, { useState } from "react";
import Loading from "react-loading";
import { useDispatch } from "react-redux";

const roboto = Roboto_Slab({
  weight: "700",
  subsets: ["latin"],
});
const DeleteUser = ({ details, getUserList, page, pageSize }) => {
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackBar] = useState({
    open: false,
    variant: "",
    message: "",
  });
  const dispatch = useDispatch();
  const deleteUser = () => {
    setLoading(true);
    authControllers
      .deleteUser(details._id)
      .then((res) => {
        setSnackBar({
          ...snackbar,
          open: true,
          variant: "success",
          message: res.data.message,
        });
        dispatch(hideModal());
        setLoading(false);
        getUserList({ page, pageSize });
      })
      .catch((err) => {
        let errMessage =
          (err.response && err.response.data.message) || err.message;
        setSnackBar({
          ...snackbar,
          open: true,
          variant: "error",
          message: errMessage,
        });
      });
  };

  const handleClose = () => {
    setSnackBar({ ...snackbar, open: false });
  };
  const handleClosed = () => {
    dispatch(hideModal());
  };
  return (
    <div>
      <Typography className={roboto.className} fontSize={20}>
        Delete User
      </Typography>
      <Divider />
      <Typography>
        Do you want to delete{" "}
        <Typography variant="span" textTransform={"capitalize"}>
          {details.first_name} {details.last_name}
        </Typography>{" "}
        ?
      </Typography>

      <Stack
        direction="row"
        alignItems="center"
        spacing={3}
        justifyContent={"center"}
        mt={3}
      >
        <Button
          sx={{
            backgroundColor: "#ff0000",
            color: "#fff",
            width: 100,
            ":hover": {
              backgroundColor: "#ff0000",
              color: "#fff",
            },
          }}
          onClick={deleteUser}
        >
          {loading ? (
            <Loading type="bars" width={20} height={20} className="m-auto" />
          ) : (
            "Yes"
          )}
        </Button>
        <Button
          sx={{
            backgroundColor: "#008000",
            color: "#fff",
            width: 100,
            ":hover": {
              backgroundColor: "#008000",
              color: "#fff",
            },
          }}
          onClick={handleClosed}
        >
          No
        </Button>
      </Stack>
      <Snackbar
        open={snackbar.open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Alert severity={snackbar.variant} onClose={handleClose}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default DeleteUser;
