import { listingController } from "@/api/listing";
import { NavigateNext } from "@mui/icons-material";
import {
  Autocomplete,
  Box,
  Breadcrumbs,
  FormLabel,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { Roboto_Slab } from "next/font/google";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
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

  const [getCurrency, setGetCurrency] = useState([]);

  const fetchCurrency = () => {
    listingController
      .getCurrency()
      .then((res) => {
        let options =
          res.data && res.data && res.data.data
            ? res.data.data.map((val) => ({
                value: val.currency_name,
                label: val.currency_name,
              }))
            : [];
        setGetCurrency(options);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  const [getBusinessName, setBusinessName] = useState([]);

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
  const currencyInputHandler = (e, newValue) => {
    setState({ ...state, currency: newValue && newValue.label });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    console.log("state", state);
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
                    options={getCurrency}
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
      </Box>
    </Box>
  );
};

export default AddMerchant;
