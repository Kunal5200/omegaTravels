import { UserSettingControllers } from "@/api/usersetting";
import { Status } from "@/utils/enum";
import { CloudUpload } from "@mui/icons-material";
import {
  Autocomplete,
  Box,
  Button,
  Divider,
  FormControl,
  Stack,
  TextField,
  Typography,
  createFilterOptions,
  styled,
} from "@mui/material";
import { Roboto_Slab } from "next/font/google";
import React, { useEffect, useState } from "react";

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

const subModules = [
  { name: "CGMR" },
  { name: "Payment processor" },
  { name: "Kunal" },
];

const AddModules = () => {
  const [moduleData, setModuleData] = useState([]);
  const [state, setState] = useState({
    module_name: "",
    sub_module_name: "",
    slug: "",
    module_icon: null,
    status: "",
  });

  const moduleHandler = (e, newValue) => {
    if (typeof newValue === "string") {
      setValue({ module_name: newValue });
      setState({ ...state, module_name: newValue.inputValue });
    } else if (newValue && newValue.inputValue) {
      setValue({ module_name: newValue.inputValue });
      setState({ ...state, module_name: newValue.inputValue });
    } else {
      setValue(newValue);
      setState({ ...state, module_name: newValue.inputValue });
    }
    setSubModuleValue(null);
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
  const [value, setValue] = useState(null);
  const [subModuleValue, setSubModuleValue] = useState(null);

  const fileHandler = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      setState({ ...state, module_icon: file });
    }
  };

  const isExistingOption =
    value &&
    moduleData.some((option) => option.module_name === value.module_name);
  const [moduleLoading, setModuleLoading] = useState(true);
  const getModules = () => {
    UserSettingControllers.getModules()
      .then((res) => {
        // console.log(res);
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
  // console.log("first", moduleData);

  const submitHandler = (e) => {
    e.preventDefault();
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
                  (option) => inputValue === option.module_name
                );
                if (inputValue !== "" && !isExisting) {
                  filtered.push({
                    inputValue,
                    module_name: inputValue,
                    module_name: `Add "${inputValue}"`,
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
                  return option.module_name;
                }
                return option.module_name;
              }}
              renderOption={(props, option) => (
                <Box component={"li"} {...props}>
                  <Typography textTransform={"capitalize"} fontSize={12}>
                    {option.module_name}
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
                      padding: "12px",
                    },
                    "& label": {
                      fontSize: 13,
                    },
                  }}
                />
              )}
            />
            {isExistingOption && (
              <Autocomplete
                value={subModuleValue}
                size="medium"
                onChange={(event, newValue) => {
                  if (typeof newValue === "string") {
                    setSubModuleValue({ name: newValue });
                  } else if (newValue && newValue.inputValue) {
                    setSubModuleValue({ name: newValue.inputValue });
                  } else {
                    setSubModuleValue(newValue);
                  }
                }}
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
                options={subModules}
                getOptionLabel={(option) => {
                  if (typeof option === "string") {
                    return option;
                  }
                  if (option.inputValue) {
                    return option.title;
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
              size="medium"
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
                        fontSize: 13,
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
            sx={{ backgroundColor: "#000", color: "#fff", fontSize: 12, mt: 2 }}
            type="submit"
            fullWidth
          >
            Submit
          </Button>
        </form>
      </FormControl>
    </div>
  );
};

export default AddModules;
