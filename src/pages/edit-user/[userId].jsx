import { authControllers } from "@/api/auth";
import BackdropFilter from "@/components/backdrop";
import { Status, userRoles } from "@/utils/enum";
import { isEmail } from "@/utils/regex";
import {
  addUserValidation,
  editUserValidation,
  generatePassword,
} from "@/utils/validation";
import {
  AddAPhoto,
  NavigateNext,
  Delete,
  VisibilityOutlined,
  VisibilityOffOutlined,
  CheckBoxOutlineBlank,
  CheckBox,
  CopyAll,
} from "@mui/icons-material";
import {
  Alert,
  Autocomplete,
  Box,
  Breadcrumbs,
  Button,
  Card,
  Checkbox,
  Chip,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { MuiTelInput, matchIsValidTel } from "mui-tel-input";
import { Roboto_Slab } from "next/font/google";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import Loading from "react-loading";

const roboto = Roboto_Slab({
  weight: "500",
  subsets: ["latin"],
});
const roboto_slab_normal = Roboto_Slab({
  weight: "400",
  subsets: ["latin"],
});

const icon = <CheckBoxOutlineBlank fontSize="small" />;
const checkedIcon = <CheckBox fontSize="small" />;

const AddUser = () => {
  const router = useRouter();

  const fileRef = useRef();
  const [imagePreview, setImagePreview] = useState(null);
  const [data, setData] = useState([]);
  const [selectedMerchant, setSelectedMerchant] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [state, setState] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    business_ids: [],
    status: "",
    access_module: [],
    img: null,
    _id: "",
  });
  const [error, setError] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    business_ids: "",
    status: "",
    access_module: "",
    img: null,
  });

  const userStatus = [{ label: Status.ACTIVE }, { label: Status.INACTIVE }];
  const gender = [{ label: "male" }, { label: "female" }];

  const roles = [{ label: userRoles.ADMIN }, { label: userRoles.AGENT }];
  const [dataLoading, setDataLoading] = useState(true);

  const getMerchantsList = () => {
    authControllers
      .getMerchants()
      .then((res) => {
        setData(res.data.message);
        setDataLoading(false);
      })
      .catch((err) => {
        let errMessage =
          (err.response && err.response.data.message) || err.message;
        setOpenSnackBar({
          ...openSnackbar,
          open: true,
          message: errMessage,
          variant: "error",
        });
      });
  };

  const inputHandler = (e) => {
    let { id, value } = e.target;
    setState({ ...state, [id]: value });
    setError({
      ...error,
      [id]:
        id === "email"
          ? isEmail(value)
            ? ""
            : "Please Enter Valid Email"
          : "",
    });
  };
  const [phone, setPhone] = useState(null);
  const phoneNumberHandler = (newPhone, countryData) => {
    setPhone(newPhone);
    const validTel = matchIsValidTel(newPhone);
    if (validTel) {
      setState({
        ...state,
        phone_number: `${countryData.countryCallingCode} ${countryData.nationalNumber}`,
      });
      setError({ ...error, phone_number: "" });
    } else {
      setError({ ...error, phone_number: "Please Enter Valid Phone Number" });
    }
  };

  const merchantHandler = (e, newValue) => {
    setSelectedMerchant(newValue);
    // console.log("ttt", newValue);
    if (newValue) {
      const merchantIds = newValue.map((merchant) => merchant._id);
      setState({ ...state, business_ids: merchantIds });
      setError({ ...error, business_ids: "" });
    }
  };
  const [selectedStatus, setSelectedStatus] = useState(null);
  const statusHandler = (e, newValue) => {
    setSelectedStatus(newValue);
    setState({ ...state, status: newValue.label === "Active" ? true : false });
    setError({ ...error, status: "" });
  };
  const [selectedGender, setSelectedGender] = useState(null);
  const genderHandler = (e, newValue) => {
    setSelectedGender(newValue);
    setState({ ...state, gender: newValue.label });
    setError({ ...error, gender: "" });
  };

  const [modules, setModules] = useState([]);
  const moduleHandler = (e, newValue) => {
    setModules(newValue);
    const agentModule = newValue.map((option) => option.label);
    setState({ ...state, access_module: agentModule });
    setError({ ...error, access_module: "" });
  };

  const passwordShowHandler = () => {
    setShowPassword(!showPassword);
  };

  const changeFileHandler = () => {
    fileRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setError({ ...error, img: "" });
      setState({ ...state, img: file });
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImageHandler = () => {
    setImagePreview(null);
    fileRef.current.value = null;
  };
  const [openSnackbar, setOpenSnackBar] = useState({
    open: false,
    message: "",
    variant: "",
  });

  useEffect(() => {
    getMerchantsList();
  }, []);

  const HandleSnackbarClsoed = () => {
    setOpenSnackBar({ ...openSnackbar, open: false });
  };
  const [loading, setLoading] = useState(false);
  const addUserSubmitHandler = async (e) => {
    e.preventDefault();
    if (editUserValidation({ state, setError, error })) {
      let profileUrl = state.img;
      setLoading(true);
      if (typeof state.img !== "string") {
        let formData = new FormData();
        formData.append("file", state.img);
        formData.append("location_type", "user");

        try {
          const uploadResponse = await authControllers.uploadImage(formData);
          profileUrl = uploadResponse.data.data;
        } catch (err) {
          let errMessage =
            (err.response && err.response.data.message) || err.message;
          setOpenSnackBar({
            ...openSnackbar,
            open: true,
            message: errMessage,
            variant: "error",
          });
          return;
        }
      }

      let body = {
        first_name: state.first_name,
        last_name: state.last_name,
        profile: profileUrl,
        email: state.email,
        phone_number: state.phone_number,
        merchants_ids: state.business_ids,
        status: state.status,
        userType: "master",
        access_module: state.access_module,
      };

      try {
        const editResponse = await authControllers.editUser({
          id: state._id,
          data: body,
        });
        setOpenSnackBar({
          ...openSnackbar,
          open: true,
          message: editResponse.data.message,
          variant: "success",
        });
        router.push("/user-management");
        setLoading(false);
      } catch (err) {
        let errMessage =
          (err.response && err.response.data.message) || err.message;
        setOpenSnackBar({
          ...openSnackbar,
          open: true,
          message: errMessage,
          variant: "error",
        });
        setLoading(false);
      }
    } else {
      setOpenSnackBar({
        ...openSnackbar,
        open: true,
        message: "Please Enter All Information",
        variant: "error",
      });
    }
  };

  const handleRoute = (path) => {
    router.push(path);
  };

  useEffect(() => {
    const fetchData = () => {
      const userId = router.query.userId;
      if (userId) {
        authControllers
          .getUserInfo(userId)
          .then((res) => {
            const response = res.data.data;
            setState({
              ...state,
              first_name: response.first_name,
              last_name: response.last_name,
              phone_number: response.phone_number,
              email: response.email,
              status: response.status,
              access_module: response.access_module,
              business_ids: response.merchants_ids,
              img: response.profile,
              _id: response._id,
            });
            setPhone(`+${response.phone_number}`);
            setSelectedStatus(response.status ? "Active" : "InActive");
            setModules(
              response.access_module.map((option) => ({ label: option }))
            );
            const matchedMerchants = response.merchants_ids
              .map((merchantId) => {
                return data.find((merchant) => merchant._id === merchantId);
              })
              .filter(Boolean);
            setSelectedMerchant(matchedMerchants);
            setImagePreview(response.profile);
            setDataLoading(false);
          })
          .catch((err) => {
            let errMessage =
              (err.response && err.response.data.message) || err.message;
            setOpenSnackBar({
              ...openSnackbar,
              open: true,
              message: errMessage,
              variant: "error",
            });
          });
      }
    };
    fetchData();
  }, [router.query.userId, data]);

  return (
    <div className="main-wrapper">
      <Head>
        <title>Edit User</title>
      </Head>
      <BackdropFilter open={dataLoading}  />
      <Box sx={{ p: 1 }}>
        <Typography
          className={roboto.className}
          fontSize={20}
          sx={{ fontWeight: "600 !important" }}
        >
          Edit User
        </Typography>
        <Breadcrumbs
          separator={<NavigateNext fontSize="small" />}
          sx={{ mt: 2 }}
        >
          <Typography
            fontSize={12}
            className={roboto_slab_normal.className}
            onClick={() => handleRoute("/user-management")}
            sx={{ cursor: "pointer" }}
          >
            User Management
          </Typography>
          <Typography fontSize={12} className={roboto_slab_normal.className}>
            Edit User
          </Typography>
        </Breadcrumbs>
        <form onSubmit={addUserSubmitHandler}>
          <Grid container mt={4} spacing={3}>
            <Grid item lg={4}>
              <Card sx={{ height: 440, display: "grid", placeItems: "center" }}>
                <Box position="relative">
                  <Box
                    sx={{
                      border: error.img
                        ? "1px dashed #ff0000"
                        : "1px dashed #d7d7d7",
                      width: "fit-content",
                      borderRadius: 50,
                      margin: "auto",
                      cursor: "pointer",
                    }}
                    onClick={changeFileHandler}
                  >
                    {imagePreview ? (
                      <img
                        src={imagePreview}
                        alt="Selected"
                        style={{
                          width: 150,
                          height: 150,
                          borderRadius: "50%",
                          objectFit: "cover",
                        }}
                      />
                    ) : (
                      <IconButton
                        sx={{
                          width: 150,
                          height: 150,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <AddAPhoto sx={{ fontSize: 50 }} />
                      </IconButton>
                    )}
                  </Box>
                  {imagePreview && (
                    <IconButton
                      sx={{
                        position: "absolute",
                        top: 0,
                        right: 0,
                        transform: "translate(50%, -50%)",
                        backgroundColor: "white",
                      }}
                      onClick={removeImageHandler}
                    >
                      <Delete />
                    </IconButton>
                  )}
                  <Typography
                    fontSize={12}
                    textAlign={"center"}
                    width={200}
                    color={"#00000059"}
                    mt={2}
                    className={roboto_slab_normal.className}
                  >
                    Allowed *.jpeg, *.jpg, *.png,
                  </Typography>
                  <FormHelperText
                    sx={{ color: "#ff0000", textAlign: "center" }}
                  >
                    {error.img}
                  </FormHelperText>
                  <input
                    type="file"
                    style={{ display: "none" }}
                    ref={fileRef}
                    onChange={handleFileChange}
                    accept="image/*"
                  />
                </Box>
              </Card>
            </Grid>
            <Grid item lg={8}>
              <Card sx={{ p: 3, height: "100%" }}>
                <Grid container spacing={2}>
                  <Grid item lg={6}>
                    <TextField
                      label="First Name"
                      sx={{
                        ".MuiOutlinedInput-input": {
                          padding: "12px",
                        },
                        "& label": {
                          fontSize: 12,
                        },
                      }}
                      fullWidth
                      id="first_name"
                      onChange={inputHandler}
                      error={Boolean(error.first_name)}
                      helperText={error.first_name}
                      value={state.first_name}
                    />
                  </Grid>
                  <Grid item lg={6}>
                    <TextField
                      label="Last Name"
                      sx={{
                        ".MuiOutlinedInput-input": {
                          padding: "12px",
                        },
                        "& label": {
                          fontSize: 12,
                        },
                      }}
                      fullWidth
                      id="last_name"
                      onChange={inputHandler}
                      error={Boolean(error.last_name)}
                      helperText={error.last_name}
                      value={state.last_name}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={2} mt={1}>
                  <Grid item lg={6}>
                    <MuiTelInput
                      label="Phone Number"
                      defaultCountry="IN"
                      sx={{
                        ".MuiOutlinedInput-input": {
                          padding: "12px",
                        },
                        "& label": {
                          fontSize: 12,
                        },
                      }}
                      fullWidth
                      onChange={phoneNumberHandler}
                      value={phone}
                      error={Boolean(error.phone_number)}
                      helperText={error.phone_number}
                    />
                  </Grid>
                  <Grid item lg={6}>
                    <TextField
                      label="Email"
                      sx={{
                        ".MuiOutlinedInput-input": {
                          padding: "12px",
                        },
                        "& label": {
                          fontSize: 12,
                        },
                      }}
                      fullWidth
                      id="email"
                      onChange={inputHandler}
                      error={Boolean(error.email)}
                      helperText={error.email}
                      value={state.email}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={2} mt={1}>
                  <Grid item lg={6}>
                    <Autocomplete
                      onChange={statusHandler}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Status"
                          sx={{
                            ".MuiOutlinedInput-input": {
                              padding: "12px",
                              font: 12,
                            },
                            "& label": {
                              fontSize: 12,
                            },
                          }}
                          error={Boolean(error.status)}
                          helperText={error.status}
                        />
                      )}
                      value={selectedStatus}
                      options={userStatus}
                      renderOption={(props, option) => (
                        <Box
                          component={"li"}
                          {...props}
                          fontSize={12}
                          fontFamily={roboto_slab_normal.style}
                        >
                          {option.label}
                        </Box>
                      )}
                      sx={{
                        "&.MuiAutocomplete-root .MuiOutlinedInput-root": {
                          padding: "5px",
                        },
                      }}
                    />
                  </Grid>
                  <Grid item lg={6}>
                    <Autocomplete
                      multiple
                      value={modules}
                      onChange={moduleHandler}
                      options={roles.filter(
                        (option) =>
                          !modules.some(
                            (selected) => selected.label === option.label
                          )
                      )}
                      disableCloseOnSelect
                      filterSelectedOptions
                      getOptionLabel={(option) => option.label}
                      renderOption={(props, option, { selected }) => (
                        <li {...props}>
                          <Checkbox
                            style={{ marginRight: 8 }}
                            checked={selected}
                            checkedIcon={checkedIcon}
                            icon={icon}
                          />
                          <Typography
                            fontSize={12}
                            fontFamily={roboto_slab_normal.style}
                          >
                            {option.label}
                          </Typography>
                        </li>
                      )}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Modules"
                          sx={{
                            ".MuiOutlinedInput-input": {
                              padding: "12px",
                              font: 12,
                            },
                            "& label": {
                              fontSize: 12,
                            },
                          }}
                          error={Boolean(error.access_module)}
                          helperText={error.access_module}
                        />
                      )}
                      fullWidth
                      sx={{
                        "&.MuiAutocomplete-root .MuiOutlinedInput-root": {
                          padding: "5px",
                        },
                      }}
                    />
                  </Grid>
                </Grid>

                <Grid container mt={1} spacing={2}>
                  <Grid item lg={12}>
                    <Autocomplete
                      value={selectedMerchant}
                      onChange={merchantHandler}
                      options={data}
                      multiple
                      filterSelectedOptions
                      getOptionLabel={(option) => option.business_name || ""}
                      renderOption={(props, option) => (
                        <Box {...props} component={"li"}>
                          <Typography
                            fontSize={12}
                            className={roboto_slab_normal.className}
                            textTransform={"capitalize"}
                          >
                            {option.business_name}
                            <br /> {option.bank_name} <br />{" "}
                            {option.merchant_id}
                          </Typography>
                        </Box>
                      )}
                      renderTags={(value, getTagProps) =>
                        value.map((option, index) => (
                          <Chip
                            variant="outlined"
                            label={option.bank_name}
                            {...getTagProps({ index })}
                          />
                        ))
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Select Merchant"
                          sx={{
                            ".MuiOutlinedInput-input": {
                              padding: "12px",
                              fontSize: 12,
                              textTransform: "capitalize",
                            },
                            "& label": {
                              fontSize: 12,
                            },
                          }}
                          error={Boolean(error.business_ids)}
                          helperText={error.business_ids}
                        />
                      )}
                      sx={{
                        "&.MuiAutocomplete-root .MuiOutlinedInput-root": {
                          padding: "8px",
                        },
                      }}
                    />
                  </Grid>
                </Grid>

                <Box textAlign={"end"}>
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
                      width: 100,
                      textTransform: "capitalize",
                      mt: 2,
                    }}
                    type="submit"
                  >
                    {loading ? (
                      <Loading
                        type="bars"
                        width={20}
                        height={20}
                        className="m-auto"
                        color="#fff"
                      />
                    ) : (
                      "Edit User"
                    )}
                  </Button>
                </Box>
              </Card>
            </Grid>
          </Grid>
        </form>
        <Snackbar
          open={openSnackbar.open}
          autoHideDuration={2000}
          onClose={HandleSnackbarClsoed}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <Alert
            severity={openSnackbar.variant}
            variant="filled"
            onClose={HandleSnackbarClsoed}
          >
            {openSnackbar.message}
          </Alert>
        </Snackbar>
      </Box>
    </div>
  );
};

export default AddUser;
