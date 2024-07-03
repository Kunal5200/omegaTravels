import { authControllers } from "@/api/auth";
import { UserSettingControllers } from "@/api/usersetting";
import { hideModal } from "@/redux/reducers/modal";
import { Status } from "@/utils/enum";
import { CloudUpload } from "@mui/icons-material";
import {
  Alert,
  Autocomplete,
  Box,
  Button,
  Divider,
  FormControl,
  Snackbar,
  Stack,
  TextField,
  Typography,
  createFilterOptions,
  styled,
} from "@mui/material";
import { Roboto_Slab } from "next/font/google";
import React, { useEffect, useState } from "react";
import Loading from "react-loading";
import { useDispatch } from "react-redux";

const roboto = Roboto_Slab({
  weight: "600",
  subsets: ["latin"],
});
const filter = createFilterOptions();
const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const top100Films = [
  { moduleName: "Settings", subModuleName: "new" },
  { moduleName: "Modules", subModuleName: "new" },
  { moduleName: "user", subModuleName: "new" },
  { moduleName: "list", subModuleName: "new" },
];

const status = [
  {
    label: Status.ACTIVE,
    value: true,
  },
  {
    label: Status.INACTIVE,
    value: false,
  },
];

const AddModules = () => {
  const [moduleData, setModuleData] = useState([]);
  const [value, setValue] = useState(null);
  const [subModuleData, setSubModuleData] = useState([]);
  const [subModuleValue, setSubModuleValue] = useState(null);
  const [sub_sub_module_nameValue, setsub_sub_module_nameValue] =
    useState(null);
  const [state, setState] = useState({
    module_name: "",
    sub_module_name: "",
    slug: "",
    module_icon: null,
    status: "",
    name: "",
    sub_sub_module_name: "",
  });

  const [snackBar, setSnackBar] = useState({
    open: false,
    message: "",
    variant: "",
  });
  const dispatch = useDispatch();
  const [subModuleLoading, setSubModuleLoading] = useState(false);

  const moduleHandler = (e, newValue) => {
    if (typeof newValue === "string") {
      setValue({ name: newValue });
      setState({ ...state, name: newValue });
    } else if (newValue && newValue.inputValue) {
      setValue({ name: newValue.inputValue });
      setState({ ...state, name: newValue.inputValue });
    } else if (newValue && newValue._id) {
      setValue(newValue);
      setSubModuleLoading(true);
      setState({ ...state, module_name: newValue._id });
      UserSettingControllers.getSubmodules(newValue._id)
        .then((res) => {
          setSubModuleData(res.data.data);
          setSubModuleLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setValue(newValue);
    }
    setSubModuleValue(null);
  };

  const handleCloseSnackbar = () => {
    setSnackBar({
      open: false,
    });
  };

  const subModuleHandler = (e, newValue) => {
    if (typeof newValue === "string") {
      setSubModuleValue({ sub_module_name: newValue });

      setState({ ...state, name: newValue.inputValue });
    } else if (newValue && newValue.inputValue) {
      setSubModuleValue({ name: newValue.inputValue });
      setState({ ...state, name: newValue.inputValue });
    } else if (newValue && newValue._id) {
      setSubModuleValue(newValue);
      setState({ ...state, sub_module_name: newValue._id });
    } else {
      setSubModuleValue(newValue);
    }
  };

  const subSubModuleHandler = (e, newValue) => {
    if (typeof newValue === "string") {
      setsub_sub_module_nameValue({ sub_sub_module_name: newValue });

      setState({ ...state, name: newValue.inputValue });
    } else if (newValue && newValue.inputValue) {
      setsub_sub_module_nameValue({ sub_sub_module_name: newValue.inputValue });
      setState({ ...state, name: newValue.inputValue });
    } else if (newValue && newValue._id) {
      setsub_sub_module_nameValue(newValue);
      setState({ ...state, sub_sub_module_name: newValue._id });
    } else {
      setsub_sub_module_nameValue(newValue);
    }
  };

  const slugHandler = (e) => {
    setState({ ...state, slug: e.target.value });
  };
  const [selectedStatus, setSelectedStatus] = useState(null);
  const statusHandler = (e, newValue) => {
    setSelectedStatus(newValue);
    setState({ ...state, status: newValue.value });
  };
  const [imagePreview, setImagePreview] = useState(null);

  const fileHandler = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      setState({ ...state, module_icon: file });
    }
  };

  const isExistingOption =
    value && moduleData.some((option) => option.name === value.name);
  const isExistingSubModuleOption =
    subModuleValue &&
    subModuleData.some((option) => option.name === subModuleValue.name);
  const [moduleLoading, setModuleLoading] = useState(true);
  const getModules = () => {
    UserSettingControllers.getModules()
      .then((res) => {
        setModuleData(res.data.data.data);
        setModuleLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getModules();
  }, []);
  const [loading, setLoading] = useState(false);
  const submitHandler = (e) => {
    e.preventDefault();
    setLoading(true);
    const fd = new FormData();
    fd.append("file", state.module_icon);
    fd.append("location_type", "module_icon");
    authControllers
      .uploadImage(fd)
      .then((res) => {
        const body = {
          module_name: state.module_name,
          sub_module_name: state.sub_module_name,
          slug: state.slug,
          status: state.status,
          module_icon: res.data.data,
          name: state.name,
        };
        UserSettingControllers.addModules(body)
          .then((response) => {
            dispatch(hideModal());
            setSnackBar({
              open: true,
              message: response.data.message,
              variant: "success",
            });
            setLoading(false);
          })
          .catch((err) => {
            let errMessage =
              (err.response && err.response.data.message) || err.message;
            setSnackBar({
              open: true,
              message: errMessage,
              variant: "error",
            });
            setLoading(false);
          });
      })
      .catch((error) => {
        let errMessage =
          (error.response && error.response.data.message) || error.message;
        setSnackBar({
          open: true,
          message: errMessage,
          variant: "error",
        });
        setLoading(false);
      });
  };
  return (
    <div>
      <Typography fontSize={20} className={roboto.className}>
        Add Modules
      </Typography>
      <Divider sx={{ borderStyle: "dashed", borderColor: "#000" }} />
      <FormControl fullWidth sx={{ mt: 3 }}>
        <form onSubmit={submitHandler}>
          <Stack spacing={2}>
            <Autocomplete
              value={value}
              size="medium"
              loading={moduleLoading}
              onChange={moduleHandler}
              filterOptions={(options, params) => {
                const filtered = filter(options, params);
                const { inputValue } = params;
                const isExisting = options.some(
                  (option) => inputValue === option.name
                );
                if (inputValue !== "" && !isExisting) {
                  filtered.push({
                    inputValue,
                    name: inputValue,
                    name: `Add "${inputValue}"`,
                  });
                }
                return filtered;
              }}
              selectOnFocus
              clearOnBlur
              handleHomeEndKeys
              options={moduleData}
              getOptionLabel={(option) => {
                if (typeof option === "string") {
                  return option;
                }
                if (option.inputValue) {
                  return option.name;
                }
                return option.name;
              }}
              renderOption={(props, option) => (
                <Box component={"li"} {...props}>
                  <Typography textTransform={"capitalize"} fontSize={12}>
                    {option.name}
                  </Typography>
                </Box>
              )}
              freeSolo
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Module Name"
                  sx={{
                    "& .MuiOutlinedInput-input": {
                      padding: "10px",
                    },
                    "& label": {
                      fontSize: 13,
                      top: 5,
                    },
                  }}
                />
              )}
            />
            {isExistingOption && (
              <Autocomplete
                value={subModuleValue}
                size="medium"
                onChange={subModuleHandler}
                loading={subModuleLoading}
                filterOptions={(options, params) => {
                  const filtered = filter(options, params);
                  const { inputValue } = params;
                  const isExisting = options.some(
                    (option) => inputValue === option.name
                  );
                  if (inputValue !== "" && !isExisting) {
                    filtered.push({
                      inputValue,
                      name: inputValue,
                      name: `Add "${inputValue}"`,
                    });
                  }
                  return filtered;
                }}
                selectOnFocus
                clearOnBlur
                handleHomeEndKeys
                id="free-solo-sub-module"
                options={subModuleData}
                getOptionLabel={(option) => {
                  if (typeof option === "string") {
                    return option;
                  }
                  if (option.inputValue) {
                    return option.name;
                  }
                  return option.name;
                }}
                renderOption={(props, option) => (
                  <li {...props}>{option.name}</li>
                )}
                freeSolo
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Sub Module Name"
                    sx={{
                      "& .MuiOutlinedInput-input": {
                        padding: "12px",
                      },
                      "& label": {
                        fontSize: 13,
                      },
                    }}
                  />
                )}
              />
            )}
            {/* {isExistingSubModuleOption && (
              <Autocomplete
                value={subModuleValue}
                size="medium"
                onChange={subModuleHandler}
                loading={subModuleLoading}
                filterOptions={(options, params) => {
                  const filtered = filter(options, params);
                  const { inputValue } = params;
                  const isExisting = options.some(
                    (option) => inputValue === option.name
                  );
                  if (inputValue !== "" && !isExisting) {
                    filtered.push({
                      inputValue,
                      name: inputValue,
                      name: `Add "${inputValue}"`,
                    });
                  }
                  return filtered;
                }}
                selectOnFocus
                clearOnBlur
                handleHomeEndKeys
                id="free-solo-sub-module"
                options={subModuleData}
                getOptionLabel={(option) => {
                  if (typeof option === "string") {
                    return option;
                  }
                  if (option.inputValue) {
                    return option.name;
                  }
                  return option.name;
                }}
                renderOption={(props, option) => (
                  <li {...props}>{option.name}</li>
                )}
                freeSolo
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Sub Module Name"
                    sx={{
                      "& .MuiOutlinedInput-input": {
                        padding: "12px",
                      },
                      "& label": {
                        fontSize: 13,
                      },
                    }}
                  />
                )}
              />
            )} */}
            <TextField
              label="Slug"
              id="slug"
              fullWidth
              sx={{
                "& .MuiOutlinedInput-input": {
                  padding: "12px",
                },
                "& label": {
                  fontSize: 12,
                },
              }}
              onChange={slugHandler}
            />
            <Autocomplete
              renderInput={(params) => <TextField {...params} label="Status" />}
              options={status}
              value={selectedStatus}
              onChange={statusHandler}
              getOptionLabel={(option) => option.label}
              renderOption={(props, option) => (
                <Box component={"li"} {...props}>
                  <Typography
                    fontSize={12}
                    sx={{
                      "& .MuiOutlinedInput-input": {
                        padding: "12px",
                      },
                      "& label": {
                        fontSize: 12,
                      },
                    }}
                  >
                    {option.label}
                  </Typography>
                </Box>
              )}
            />
            <Stack direction={"row"} alignItems={"flex-start"} spacing={6}>
              <Button
                component="label"
                sx={{
                  backgroundColor: "#000",
                  color: "#fff",
                  ":hover": {
                    backgroundColor: "#000",
                    color: "#fff",
                  },
                }}
                tabIndex={-1}
                startIcon={<CloudUpload />}
                type="button"
              >
                Upload file
                <VisuallyHiddenInput type="file" onChange={fileHandler} />
              </Button>
              {imagePreview && (
                <img src={imagePreview} width={50} height={50} alt="Preview" />
              )}
            </Stack>
          </Stack>
          <Button
            sx={{
              backgroundColor: "#000",
              color: "#fff",
              fontSize: 12,
              mt: 2,
              ":hover": {
                backgroundColor: "#000",
                color: "#fff",
              },
              p: 1.3,
            }}
            type="submit"
            fullWidth
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
        </form>
      </FormControl>

      <Snackbar open={snackBar.open} onClose={handleCloseSnackbar}>
        <Alert variant={snackBar.variant}>{snackBar.message}</Alert>
      </Snackbar>
    </div>
  );
};

export default AddModules;
