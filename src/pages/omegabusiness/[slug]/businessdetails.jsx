import {
  Box,
  Divider,
  Grid,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { Roboto_Slab } from "next/font/google";
const roboto = Roboto_Slab({
  weight: "500",
  subsets: ["latin"],
});
const roboto_normal = Roboto_Slab({
  weight: "400",
  subsets: ["latin"],
});
const Businessdetails = () => {
  const detailsType = [
    { label: "Business Details", id: "businessdetails" },
    { label: "Documents", id: "Documents" },
  ];

  const [showForm, setShowForm] = useState("businessdetails");
  const changeDocType = (id) => {
    setShowForm(id);
  };

  return (
    <Box className="main-wrapper">
      <Box>
        {/* <Stack>
          <Typography
            className={roboto.className}
            sx={{ fontWeight: "700 !important" }}
            fontSize={20}
          >
            Edit Business Details
          </Typography>
        </Stack> */}
        {/* <Divider /> */}
        <Box
          sx={{
            mt: 2,
          }}
        >
          <Grid container spacing={2} sx={{ flexGrow: 1 }} padding={2}>
            <Grid xs={6}>
              <Box>
                <Tabs>
                  {detailsType.map((val, id) => {
                    return (
                      <Tab
                        key={id}
                        label={val.label}
                        onClick={() => changeDocType(val.id)}
                        sx={{
                          color: showForm === val.id ? "#859bee" : "#d3d3d3",
                          fontSize: showForm === val.id ? "12px" : "12px",
                          fontWeight: showForm === val.id ? 600 : 600,
                          borderBottom:
                            showForm === val.id ? "1px solid #d3d3d3" : "none",
                        }}
                      ></Tab>
                    );
                  })}
                </Tabs>
                <Box
                  sx={{
                    p: 2,
                  }}
                >
                  {showForm === "businessdetails" ? (
                    <Box>
                      <form>
                        <Box>
                          <TextField label="Business Name" fullWidth />
                        </Box>
                        <Box
                          sx={{
                            mt: 2,
                          }}
                        >
                          <TextField label="Owner's Name" fullWidth />
                        </Box>
                        <Box
                          sx={{
                            mt: 2,
                          }}
                        >
                          <TextField label="Tax ID / EIN Number" />
                        </Box>
                        <Box
                          sx={{
                            mt: 2,
                          }}
                        >
                          <TextField label="SSN (optional)" />
                        </Box>
                        <Box
                          sx={{
                            mt: 2,
                          }}
                        >
                          <TextField label="Bank Name (optional)" />
                        </Box>
                        <Box
                          sx={{
                            mt: 2,
                          }}
                        >
                          <TextField label="Bank Account Number (optional)" />
                        </Box>
                        <Box
                          sx={{
                            mt: 2,
                          }}
                        >
                          <TextField label="Routing Number (optional)" />
                        </Box>
                        <Box
                          sx={{
                            mt: 2,
                          }}
                        >
                          <TextField label="Address" />
                        </Box>
                        <Box
                          sx={{
                            mt: 2,
                          }}
                        >
                          <TextField label="City" />
                        </Box>
                        <Box
                          sx={{
                            mt: 2,
                          }}
                        >
                          <TextField label="State/Province" />
                        </Box>
                        <Box
                          sx={{
                            mt: 2,
                          }}
                        >
                          <TextField label="Zip/Postal" />
                        </Box>
                        <Box
                          sx={{
                            mt: 2,
                          }}
                        >
                          <TextField label="Country" />
                        </Box>
                        <Box
                          sx={{
                            mt: 2,
                          }}
                        >
                          <TextField label="Business Establish Date" />
                        </Box>
                      </form>
                    </Box>
                  ) : (
                    "Two"
                  )}
                </Box>
              </Box>
            </Grid>
            <Grid xs={6}>One</Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default Businessdetails;
