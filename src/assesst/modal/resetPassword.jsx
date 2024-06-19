import { authControllers } from "@/api/auth";
import { hideModal } from "@/redux/reducers/modal";
import { updatePasswordValidation } from "@/utils/validation";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Alert,
  Button,
  Divider,
  IconButton,
  InputAdornment,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { Roboto_Slab } from "next/font/google";
import React, { useState } from "react";
import Loading from "react-loading";
import { useDispatch, useSelector } from "react-redux";
const roboto = Roboto_Slab({
  weight: "500",
  subsets: ["latin"],
});
const ResetPassword = ({ details }) => {
  // console.log("details", details);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleShowPassword = (state, setState) => {
    setState(!state);
  };

  const [state, setState] = useState({
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState({
    password: "",
    confirmPassword: "",
  });

  const inputHandler = (e) => {
    let { id, value } = e.target;
    setState({ ...state, [id]: value });
  };
  const [openSnackBar, setOpenSnackBar] = useState({
    open: false,
    message: "",
    variant: "",
  });
  const handleClose = () => {
    setOpenSnackBar({ ...openSnackBar, open: false });
  };

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const submitHandler = () => {
    if (updatePasswordValidation({ state, error, setError })) {
      if (state.password === state.confirmPassword) {
        setLoading(true);
        let data = {
          id: details._id,
          password: state.password,
          confirmPassword: state.confirmPassword,
        };
        authControllers
          .updatePassword(data)
          .then((res) => {
            setOpenSnackBar({
              ...openSnackBar,
              open: true,
              message: res.data.message,
              variant: "success",
            });
            dispatch(hideModal());

            setLoading(false);
          })
          .catch((err) => {
            let errMessage =
              (err.response && err.response.data.message) || err.message;
            setOpenSnackBar({
              ...openSnackBar,
              open: true,
              message: errMessage,
              variant: "error",
            });
            setLoading(false);
          });
      } else {
        setOpenSnackBar({
          ...openSnackBar,
          open: true,
          message: "Confirm Password Must Match Password",
          variant: "error",
        });
      }
    } else {
      setOpenSnackBar({
        ...openSnackBar,
        open: true,
        message: "Please Fill All Fields",
        variant: "error",
      });
    }
  };
  return (
    <div style={{ width: 450 }}>
      <Typography className={roboto.className}>Reset Password</Typography>
      <Divider sx={{ borderStyle: "dashed" }} />

      <TextField
        label="Password"
        id="password"
        sx={{
          "& .MuiOutlinedInput-input": {
            padding: "12px",
          },
          "& label": {
            top: -5,
          },
          my: 3,
        }}
        fullWidth
        onChange={inputHandler}
        type={showPassword ? "text" : "password"}
        InputProps={{
          endAdornment: (
            <InputAdornment>
              <IconButton
                onClick={() =>
                  handleShowPassword(showPassword, setShowPassword)
                }
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <TextField
        id="confirmPassword"
        onChange={inputHandler}
        label="Confirm Password"
        sx={{
          "& .MuiOutlinedInput-input": {
            padding: "12px",
          },
          "& label": {
            top: -5,
          },
          //   my: 3,
        }}
        fullWidth
        type={showConfirmPassword ? "text" : "password"}
        InputProps={{
          endAdornment: (
            <InputAdornment>
              <IconButton
                onClick={() =>
                  handleShowPassword(
                    showConfirmPassword,
                    setShowConfirmPassword
                  )
                }
              >
                {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <Button
        sx={{
          border: "1px solid #000",
          backgroundColor: "#000",
          color: "#fff",
          ":hover": {
            backgroundColor: "#000",
            color: "#fff",
          },
          fontSize: 12,
          mt: 2,
        }}
        fullWidth
        onClick={submitHandler}
      >
        {loading ? (
          <Loading
            type="bars"
            color="#ffffff"
            width={20}
            height={20}
            className="m-auto"
          />
        ) : (
          "Submit"
        )}
      </Button>
      <Snackbar
        open={openSnackBar.open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Alert
          severity={openSnackBar.variant}
          onClose={handleClose}
          variant="filled"
        >
          {openSnackBar.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default ResetPassword;
