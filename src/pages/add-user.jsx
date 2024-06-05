import { authControllers } from "@/api/auth";
import { Status } from "@/utils/enum";
import { generatePassword } from "@/utils/validation";
import {
  AddAPhoto,
  NavigateNext,
  Delete,
  VisibilityOutlined,
  VisibilityOffOutlined,
} from "@mui/icons-material";
import {
  Autocomplete,
  Box,
  Breadcrumbs,
  Button,
  Card,
  Chip,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { MuiTelInput } from "mui-tel-input";
import { Roboto_Slab } from "next/font/google";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";

const roboto = Roboto_Slab({
  weight: "500",
  subsets: ["latin"],
});
const roboto_slab_normal = Roboto_Slab({
  weight: "400",
  subsets: ["latin"],
});

const AddUser = () => {
  const router = useRouter();
  const fileRef = useRef();
  const [imagePreview, setImagePreview] = useState(null);
  const [data, setData] = useState([]);
  const [selectedMerchant, setSelectedMerchant] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const handleRoute = (path) => {
    router.push(path);
  };

  const [state, setState] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    phone_number: "",
    business_ids: [],
    status: "",
    gender: "",
    password: "",
    access_module: [],
  });

  const userStatus = [
    {
      label: Status.ACTIVE,
    },
    {
      label: Status.INACTIVE,
    },
  ];
  const gender = [
    {
      label: "Male",
    },
    {
      label: "Female",
    },
  ];

  const getMerchantsList = () => {
    authControllers
      .getMerchants()
      .then((res) => {
        setData(res.data.message);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const merchantHandler = (e, newValue) => {
    setSelectedMerchant(newValue);
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

  const autoGeneratePassword = () => {
    console.log(generatePassword());
  };

  useEffect(() => {
    getMerchantsList();
  }, []);

  return (
    <div className="main-wrapper">
      <Head>
        <title>Add New User</title>
      </Head>
      <Box sx={{ p: 1 }}>
        <Typography
          className={roboto.className}
          fontSize={20}
          sx={{ fontWeight: "600 !important" }}
        >
          Add User
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
            Add New User
          </Typography>
        </Breadcrumbs>

        <Grid container mt={4} spacing={3}>
          <Grid item lg={4}>
            <Card sx={{ height: 300, display: "grid", placeItems: "center" }}>
              <Box position="relative">
                <Box
                  sx={{
                    border: "1px dashed #d7d7d7",
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
                  Allowed *.jpeg, *.jpg, *.png, *.gif max size of 3 Mb
                </Typography>
                <input
                  type="file"
                  style={{ display: "none" }}
                  ref={fileRef}
                  onChange={handleFileChange}
                />
              </Box>
            </Card>
          </Grid>
          <Grid item lg={8}>
            <Card sx={{ p: 2 }}>
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
                  />
                </Grid>
              </Grid>
              <Grid container spacing={2} mt={1}>
                <Grid item lg={6}>
                  <TextField
                    label="Username"
                    sx={{
                      ".MuiOutlinedInput-input": {
                        padding: "12px",
                      },
                      "& label": {
                        fontSize: 12,
                      },
                    }}
                    fullWidth
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
                  />
                </Grid>
                <Grid item lg={6}>
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
                          <br /> {option.bank_name} <br /> {option.merchant_id}
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
                          },
                          "& label": {
                            fontSize: 12,
                          },
                        }}
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
              <Grid container spacing={2} mt={1}>
                <Grid item lg={6}>
                  <Autocomplete
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
                      />
                    )}
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
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Gender"
                        sx={{
                          ".MuiOutlinedInput-input": {
                            padding: "12px",
                            font: 12,
                          },
                          "& label": {
                            fontSize: 12,
                          },
                        }}
                      />
                    )}
                    options={gender}
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
              </Grid>
              <Grid container spacing={2} mt={1}>
                <Grid item lg={6}>
                  <TextField
                    label="Password"
                    sx={{
                      ".MuiOutlinedInput-input": {
                        padding: "12px",
                      },
                      "& label": {
                        fontSize: 12,
                      },
                    }}
                    fullWidth
                    type={showPassword ? "text" : "password"}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment>
                          <IconButton onClick={passwordShowHandler}>
                            {!showPassword ? (
                              <VisibilityOutlined />
                            ) : (
                              <VisibilityOffOutlined />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item lg={6}>
                  <Button
                    sx={{
                      border: "1px solid #d7d7d7",
                      fontSize: 12,
                      p: 1.4,
                      textTransform: "capitalize",
                      color: "#000",
                    }}
                    onClick={autoGeneratePassword}
                  >
                    Auto Generate
                  </Button>
                </Grid>
              </Grid>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default AddUser;
