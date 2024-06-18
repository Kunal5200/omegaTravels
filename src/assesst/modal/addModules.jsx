import { CloudUpload } from "@mui/icons-material";
import {
  Autocomplete,
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
import React, { useState } from "react";

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

const subModules = [
  { name: "CGMR" },
  { name: "Payment processor" },
  { name: "Kunal" },
];

const AddModules = () => {
  const [imagePreview, setImagePreview] = useState(null);
  const [value, setValue] = useState(null);
  const [subModuleValue, setSubModuleValue] = useState(null);

  const fileHandler = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const isExistingOption =
    value &&
    top100Films.some((option) => option.moduleName === value.moduleName);

  return (
    <div>
      <Typography fontSize={20} className={roboto.className}>
        Add Modules
      </Typography>
      <Divider sx={{ borderStyle: "dashed", borderColor: "#000" }} />
      <FormControl fullWidth sx={{ mt: 3 }}>
        <form>
          <Stack spacing={2}>
            <Autocomplete
              value={value}
              size="medium"
              onChange={(event, newValue) => {
                if (typeof newValue === "string") {
                  setValue({ moduleName: newValue });
                } else if (newValue && newValue.inputValue) {
                  setValue({ moduleName: newValue.inputValue });
                } else {
                  setValue(newValue);
                }
                // Clear sub-module value when changing module
                setSubModuleValue(null);
              }}
              filterOptions={(options, params) => {
                const filtered = filter(options, params);
                const { inputValue } = params;
                const isExisting = options.some(
                  (option) => inputValue === option.moduleName
                );
                if (inputValue !== "" && !isExisting) {
                  filtered.push({
                    inputValue,
                    moduleName: inputValue,
                    title: `Add "${inputValue}"`,
                  });
                }
                return filtered;
              }}
              selectOnFocus
              clearOnBlur
              handleHomeEndKeys
              id="free-solo-with-text-demo"
              options={top100Films}
              getOptionLabel={(option) => {
                if (typeof option === "string") {
                  return option;
                }
                if (option.inputValue) {
                  return option.title;
                }
                return option.moduleName;
              }}
              renderOption={(props, option) => (
                <li {...props}>{option.moduleName}</li>
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
            />
            <Stack direction={"row"} alignItems={"flex-start"} spacing={6}>
              <Button
                component="label"
                variant="contained"
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
        </form>
      </FormControl>
    </div>
  );
};

export default AddModules;
