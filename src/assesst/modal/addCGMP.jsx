import { CGMP, Status } from "@/utils/enum";
import { roboto_600 } from "@/utils/font";
import { Camera, CloudUpload } from "@mui/icons-material";
import {
  Autocomplete,
  Box,
  Divider,
  FormControl,
  Grid,
  IconButton,
  Stack,
  TextareaAutosize,
  TextField,
  Typography,
} from "@mui/material";

const CGMPTYPE = [
  {
    label: CGMP.Processor,
  },
  {
    label: CGMP.CRM,
  },
  {
    label: CGMP.Gateway,
  },
  {
    label: CGMP.Member,
  },
];

const status = [
  {
    label: Status.ACTIVE,
  },

  {
    label: Status.INACTIVE,
  },
];
const AddCGMP = () => {
  return (
    <div style={{ minWidth: 500 }}>
      <Typography fontFamily={roboto_600.style} fontSize={20}>
        Add Setting
      </Typography>
      <Divider sx={{ borderStyle: "dashed", borderColor: "#000" }} />

      <FormControl fullWidth sx={{ mt: 2 }}>
        <Grid container spacing={3} >
          <Grid item lg={4}>
            <IconButton
              sx={{ width: "100%", height: 140, border: "1px dashed #000" }}
            >
              <Camera sx={{ fontSize: 25 }} />
            </IconButton>
          </Grid>
          <Grid item lg={8}>
            <Stack spacing={2}>
              <TextField
                fullWidth
                sx={{
                  "& .MuiOutlinedInput-input": {
                    padding: "10px",
                  },
                  "& label": {
                    fontSize: 12,
                  },
                }}
                label="Setting Name"
              />
              <Autocomplete
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Type"
                    sx={{
                      "& .MuiOutlinedInput-input": {
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
                  "& .MuiOutlinedInput-root": {
                    padding: "5px",
                  },
                }}
                options={CGMPTYPE}
                renderOption={(props, option) => (
                  <Box component={"li"} {...props}>
                    <Typography fontSize={12}>{option.label}</Typography>
                  </Box>
                )}
              />
              <Autocomplete
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Status"
                    sx={{
                      "& .MuiOutlinedInput-input": {
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
                  "& .MuiOutlinedInput-root": {
                    padding: "5px",
                  },
                }}
                options={status}
                renderOption={(props, option) => (
                  <Box component={"li"} {...props}>
                    <Typography fontSize={12}>{option.label}</Typography>
                  </Box>
                )}
              />
              <TextField
                label="Redirect URL"
                sx={{
                  "& .MuiOutlinedInput-input": {
                    // fontSize: 12,
                    padding: "10px",
                  },
                  "& label": {
                    fontSize: 12,
                  },
                }}
              />
              <TextareaAutosize
                className="textArea"
                minRows={4}
                placeholder="Description"
              />
            </Stack>
          </Grid>
        </Grid>
      </FormControl>
    </div>
  );
};

export default AddCGMP;
