import React, { useState, useEffect } from "react";
import {
  Autocomplete,
  Box,
  Breadcrumbs,
  FormLabel,
  Grid,
  TextField,
  Typography,
  Snackbar,
  Button,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import { NavigateNext } from "@mui/icons-material";
import { Roboto_Slab } from "next/font/google";
import { useRouter } from "next/router";
import Switch from "@mui/material/Switch";
import { listingController } from "@/api/listing";
import { authControllers } from "@/api/auth";
import Countries from "@/components/countries";

const roboto = Roboto_Slab({
  weight: "500",
  subsets: ["latin"],
});
const roboto_slab_normal = Roboto_Slab({
  weight: "400",
  subsets: ["latin"],
});

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
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
    bank_Information_same_as_business: "",
  });

  const [getCurrency, setGetCurrency] = useState([]);
  const [getBusinessName, setBusinessName] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const fetchCurrency = () => {
    listingController
      .getCurrency()
      .then((res) => {
        let options =
          res.data && res.data.data
            ? res.data.data.map((val) => ({
                value: val.currency_name.replace(/\s+/g, ""),
                label: val.currency_name,
              }))
            : [];
        setGetCurrency(options);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  const fetchBusinessName = () => {
    listingController
      .getBusinessName()
      .then((res) => {
        let options =
          res.data && res.data && res.data.data
            ? res.data.data.map((val) => ({
                value: val.business_name,
                label: val.business_name,
              }))
            : [];
        setBusinessName(options);
      })
      .catch((err) => {
        console.log("error", err);
      });
  };

  const inputHandler = (e) => {
    let { id, value } = e.target;
    setState({ ...state, [id]: value });
  };

  const companyInputHandler = (e, newValue) => {
    setState({ ...state, businessName: newValue && newValue.label });
  };

  const getCountriesOptions = Countries.map((country) => ({
    label: country.country_name,
    value: country.currency_code,
  }));

  const currencyInputHandler = (e, newValue) => {
    setState({ ...state, currency: newValue && newValue.value });
  };

  const switchHandler = (e) => {
    setState({ ...state, bank_Information_same_as_business: e.target.value });
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    let body = {
      MDR_discount_ratio: state.discount,
      bank_Information_same_as_business:
        state.bank_Information_same_as_business === "on" ? "true" : "false",
      bank_account_number: state.bankNumber,
      bank_name: state.bankName,
      business_id: state.merchantId,
      contact_person: state.contactPerson,
      currencies: state.currency,
      description_of_services: state.description,
      merchant_id: state.merchantId,
      monthly_cap: state.monthlyCap,
      reserve_percentage: state.reservePercentage,
      retail_description: state.retail,
      support_email: state.supportEmail,
      support_fax_number: state.supportFax,
      support_number: state.supportNumber,
      website_DBA_name: state.websiteName,
    };

    authControllers
      .addMerchant(body)
      .then((res) => {
        setSnackbarMessage("Merchant added successfully!");
        setSnackbarSeverity("success");
        setOpenSnackbar(true);
      })
      .catch((err) => {
        setSnackbarMessage("Error adding merchant. Please try again.");
        setSnackbarSeverity("error");
        setOpenSnackbar(true);
      });
  };

  useEffect(() => {
    fetchBusinessName();
    fetchCurrency();
  }, []);

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
            onClick={() => handleRoute("/omegaMerchant/merchants")}
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
        <form onSubmit={submitHandler}>
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
                    options={getBusinessName}
                    sx={{ width: 312, mt: 1 }}
                    renderInput={(params) => (
                      <TextField {...params} label="Select Business Name" />
                    )}
                    onChange={companyInputHandler}
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
                    onChange={inputHandler}
                    type="number"
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
                    onChange={inputHandler}
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
                    onChange={inputHandler}
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
                    Currency
                  </FormLabel>
                  <Autocomplete
                    disablePortal
                    id="currency"
                    options={getCountriesOptions}
                    sx={{ width: 312, marginTop: "8px" }}
                    renderInput={(params) => (
                      <TextField {...params} label="Select Currency" />
                    )}
                    onChange={currencyInputHandler}
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
                    onChange={inputHandler}
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
                    onChange={inputHandler}
                  />
                </Box>
              </Grid>
            </Grid>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              mt: 2,
            }}
          >
            <Switch
              onClick={switchHandler}
              id="bank_Information_same_as_business"
            />
            <Typography variant="h6" fontSize={"15px"}>
              Bank Information Same as Business
            </Typography>
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
                    onChange={inputHandler}
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
                    type="number"
                    onChange={inputHandler}
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
                    type="number"
                    fullWidth
                    label="Monthly Cap"
                    sx={{
                      mt: 1,
                    }}
                    id="monthlyCap"
                    onChange={inputHandler}
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
                    onChange={inputHandler}
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
                    type="number"
                    label="MDR Discount Ratio"
                    sx={{
                      mt: 1,
                    }}
                    id="discount"
                    onChange={inputHandler}
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
                    onChange={inputHandler}
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
                    onChange={inputHandler}
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
                    onChange={inputHandler}
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
              type="submit"
            >
              Submit
            </button>
          </Box>
        </form>
        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <Alert
            onClose={handleSnackbarClose}
            severity={snackbarSeverity}
            sx={{ width: "100%" }}
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Box>
    </Box>
  );
};

export default AddMerchant;
