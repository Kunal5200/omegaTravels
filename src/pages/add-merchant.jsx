import {
  Autocomplete,
  Box,
  Breadcrumbs,
  Button,
  FormLabel,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { Roboto_Slab } from "next/font/google";
import {
  AddAPhoto,
  NavigateNext,
  Delete,
  VisibilityOutlined,
  VisibilityOffOutlined,
} from "@mui/icons-material";
import { useRouter } from "next/router";
const roboto = Roboto_Slab({
  weight: "500",
  subsets: ["latin"],
});
const roboto_slab_normal = Roboto_Slab({
  weight: "400",
  subsets: ["latin"],
});

const AddMerchant = () => {
  let router = useRouter();
  const handleRoute = (path) => {
    router.push(path);
  };

  const options = [
    { label: "The Godfather", id: 1 },
    { label: "Pulp Fiction", id: 2 },
  ];

  const [state, setState] = useState({
    businessName: "",
    merchantId: "",
    websiteName: "",
    contactPerson: "",
    currency: "",
    description: "",
    retail: "",
    bankName: "",
    bankNumber: "",
    monthlyCap: "",
    reservePercentage: "",
    discount: "",
    supportNumber: "",
    supportEmail: "",
    supportFax: "",
  });

  return (
    <Box className="main-wrapper">
      <Box sx={{ p: 1 }}>
        <Typography
          className={roboto.className}
          fontSize={20}
          sx={{ fontWeight: "600 !important" }}
        >
          Add Merchant
        </Typography>
        <Breadcrumbs
          separator={<NavigateNext fontSize="small" />}
          sx={{ mt: 2 }}
        >
          <Typography
            fontSize={12}
            className={roboto_slab_normal.className}
            onClick={() => handleRoute("/merchants")}
            sx={{ cursor: "pointer" }}
          >
            Merchants
          </Typography>
          <Typography fontSize={12} className={roboto_slab_normal.className}>
            Add New Merchants
          </Typography>
        </Breadcrumbs>
      </Box>
      <Box sx={{ p: 1 }}>
        <Box>
          <Grid container spacing={2}>
            <Grid item xs={3}>
              <Box>
                <FormLabel
                  sx={{
                    fontSize: "12px",
                    fontWeight: 500,
                    color: "#000",
                  }}
                >
                  Business Name
                </FormLabel>
                <Autocomplete
                  disablePortal
                  id="businessName"
                  options={options}
                  sx={{ width: 280, mt: 1 }}
                  renderInput={(params) => (
                    <TextField {...params} label="Select Business Name" />
                  )}
                />
              </Box>
            </Grid>{" "}
            <Grid item xs={3}>
              <Box>
                <FormLabel
                  sx={{
                    fontSize: "12px",
                    fontWeight: 500,
                    color: "#000",
                  }}
                >
                  Merchant Id
                </FormLabel>
                <TextField
                  fullWidth
                  label="Merchant Id"
                  sx={{
                    mt: 1,
                  }}
                  id="merchantId"
                />
              </Box>
            </Grid>{" "}
            <Grid item xs={3}>
              <Box>
                <FormLabel
                  sx={{
                    fontSize: "12px",
                    fontWeight: 500,
                    color: "#000",
                  }}
                >
                  Website/DBA Name
                </FormLabel>
                <TextField
                  fullWidth
                  label="Website/DBA Name"
                  sx={{
                    mt: 1,
                  }}
                  id="websiteName"
                />
              </Box>
            </Grid>
          </Grid>
        </Box>{" "}
        <Box
          sx={{
            mt: 3,
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={3}>
              <Box>
                <FormLabel
                  sx={{
                    fontSize: "12px",
                    fontWeight: 500,
                    color: "#000",
                  }}
                >
                  Contact Person
                </FormLabel>
                <TextField
                  fullWidth
                  label="Contact Person"
                  sx={{
                    mt: 1,
                  }}
                  id="contactPerson"
                />
              </Box>
            </Grid>{" "}
            <Grid item xs={3}>
              <Box>
                <FormLabel
                  sx={{
                    fontSize: "12px",
                    fontWeight: 500,
                    color: "#000",
                  }}
                >
                  Currencies
                </FormLabel>
                <Autocomplete
                  disablePortal
                  id="currency"
                  options={options}
                  sx={{ width: 280, marginTop: "8px" }}
                  renderInput={(params) => (
                    <TextField {...params} label="Select Currency" />
                  )}
                />
              </Box>
            </Grid>{" "}
            <Grid item xs={3}>
              <Box>
                <FormLabel
                  sx={{
                    fontSize: "12px",
                    fontWeight: 500,
                    color: "#000",
                  }}
                >
                  Description for Goods/Services
                </FormLabel>
                <TextField
                  fullWidth
                  label="Description for Goods/Services"
                  sx={{
                    mt: 1,
                  }}
                  id="description"
                />
              </Box>
            </Grid>{" "}
            <Grid item xs={3}>
              <Box>
                <FormLabel
                  sx={{
                    fontSize: "12px",
                    fontWeight: 500,
                    color: "#000",
                  }}
                >
                  Retail Descriptor/s
                </FormLabel>
                <TextField
                  fullWidth
                  label="Retail Descriptor/s"
                  sx={{
                    mt: 1,
                  }}
                  id="retail"
                />
              </Box>
            </Grid>
          </Grid>
        </Box>
        {/* second form start */}
        <Box
          sx={{
            mt: 3,
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={3}>
              <Box>
                <FormLabel
                  sx={{
                    fontSize: "12px",
                    fontWeight: 500,
                    color: "#000",
                  }}
                >
                  Bank Name (Optional)
                </FormLabel>
                <TextField
                  fullWidth
                  label="Bank Name"
                  sx={{
                    mt: 1,
                  }}
                  id="bankName"
                />
              </Box>
            </Grid>{" "}
            <Grid item xs={3}>
              <Box>
                <FormLabel
                  sx={{
                    fontSize: "12px",
                    fontWeight: 500,
                    color: "#000",
                  }}
                >
                  Bank A/C Number (optional)
                </FormLabel>
                <TextField
                  fullWidth
                  label="Bank A/C Number"
                  sx={{
                    mt: 1,
                  }}
                  id="bankNumber"
                />
              </Box>
            </Grid>{" "}
            <Grid item xs={3}>
              <Box>
                <FormLabel
                  sx={{
                    fontSize: "12px",
                    fontWeight: 500,
                    color: "#000",
                  }}
                >
                  Monthly Cap
                </FormLabel>
                <TextField
                  fullWidth
                  label="Monthly Cap"
                  sx={{
                    mt: 1,
                  }}
                  id="monthlyCap"
                />
              </Box>
            </Grid>{" "}
            <Grid item xs={3}>
              <Box>
                <FormLabel
                  sx={{
                    fontSize: "12px",
                    fontWeight: 500,
                    color: "#000",
                  }}
                >
                  Reserve Percentage (Optional)
                </FormLabel>
                <TextField
                  fullWidth
                  type="number"
                  label="Reserve Percentage"
                  sx={{
                    mt: 1,
                  }}
                  id="reservePercentage"
                />
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Box
          sx={{
            mt: 3,
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={3}>
              <Box>
                <FormLabel
                  sx={{
                    fontSize: "12px",
                    fontWeight: 500,
                    color: "#000",
                  }}
                >
                  MDR Discount Ratio (Optional)
                </FormLabel>
                <TextField
                  fullWidth
                  label="MDR Discount Ratio"
                  sx={{
                    mt: 1,
                  }}
                  id="discount"
                />
              </Box>
            </Grid>{" "}
            <Grid item xs={3}>
              <Box>
                <FormLabel
                  sx={{
                    fontSize: "12px",
                    fontWeight: 500,
                    color: "#000",
                  }}
                >
                  Support Number
                </FormLabel>
                <TextField
                  fullWidth
                  type="number"
                  label="Support Number"
                  sx={{
                    mt: 1,
                  }}
                  id="supportNumber"
                />
              </Box>
            </Grid>{" "}
            <Grid item xs={3}>
              <Box>
                <FormLabel
                  sx={{
                    fontSize: "12px",
                    fontWeight: 500,
                    color: "#000",
                  }}
                >
                  Support Email
                </FormLabel>
                <TextField
                  fullWidth
                  label="Support Email"
                  sx={{
                    mt: 1,
                  }}
                  id="supportEmail"
                />
              </Box>
            </Grid>{" "}
            <Grid item xs={3}>
              <Box>
                <FormLabel
                  sx={{
                    fontSize: "12px",
                    fontWeight: 500,
                    color: "#000",
                  }}
                >
                  Support Fax Number (Optional)
                </FormLabel>
                <TextField
                  fullWidth
                  type="number"
                  label="Support Fax Number"
                  sx={{
                    mt: 1,
                  }}
                  id="supportFax"
                />
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Box
          sx={{
            mt: 3,
          }}
        >
          <button
            style={{
              backgroundColor: "#000",
              color: "#fff",
              width: "15%",
              padding: "15px",
              fontSize: "13px",
              fontWeight: 500,
              borderRadius: "4px",
            }}
          >
            Submit
          </button>
        </Box>
      </Box>
    </Box>
  );
};

export default AddMerchant;
