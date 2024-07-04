import {
  Autocomplete,
  Box,
  Breadcrumbs,
  FormLabel,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Roboto_Slab } from "next/font/google";
import { NavigateNext } from "@mui/icons-material";
import axios from "axios";
import { authControllers } from "@/api/auth";

const roboto = Roboto_Slab({
  weight: "500",
  subsets: ["latin"],
});
const roboto_slab_normal = Roboto_Slab({
  weight: "400",
  subsets: ["latin"],
});

const AddBusiness = () => {
  let router = useRouter();
  const handleRoute = (path) => {
    router.push(path);
  };

  const [state, setState] = useState({
    address: "",
    bank_account_number: "",
    bank_name: "",
    business_establish_date: "",
    business_name: "",
    city: "",
    country: "",
    owner_name: "",
    routing_number: "",
    ssn: "",
    state: "",
    status: "",
    tax_id_and_EIN_number: "",
    zip: "",
  });

  const inputHandler = (e) => {
    let { id, value } = e.target;
    setState({ ...state, [id]: value });
  };

  const citySelectHandler = (e, newValue) => {
    setState({ ...state, state: newValue ? newValue.label : null });
  };
  const statusSelectHandler = (e, newValue) => {
    setState({ ...state, status: newValue ? newValue.label : null });
  };
  const businessStatus = [
    { label: "Active" },
    { label: "In Process" },
    { label: "Terminated" },
    { label: "Terminated Merchant File" },
    { label: "Closed" },
  ];

  const [countryCode, setCountryCode] = useState([]);
  const [stateList, setStateList] = useState([]);
  const [citiesList, setCitiesList] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);

  const countryList = () => {
    axios
      .get(`https://countriesnow.space/api/v0.1/countries/positions`)
      .then((response) => {
        let arr = response.data.data.map((val) => ({
          value: val.iso2,
          label: val.name,
        }));
        setCountryCode(arr);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    countryList();
  }, []);

  const CountryHandler = (e, value) => {
    setState({ ...state, country: value ? value.label : null });
    setSelectedCountry(value ? value.label : null);
    if (value && value.label) {
      let body = {
        country: value.label,
      };

      const url = "https://countriesnow.space/api/v0.1/countries/states";

      axios
        .post(url, body)
        .then((response) => {
          let options =
            response.data && response.data.data && response.data.data.states
              ? response.data.data.states.map((val) => ({
                  value: val.state_code,
                  label: `${val.name}`,
                }))
              : [];

          if (options.length === 0) {
            options.push({
              value: "default",
              label: "State not available",
            });
          }

          setStateList(options);
          setCitiesList([]);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      setStateList([]);
    }
  };

  const cityHandler = (e, value) => {
    setState({ ...state, city: value ? value.label : null });
    setSelectedState(value ? value.label : null);
    if (value && value.label) {
      let body = {
        country: selectedCountry,
        state: value.label,
      };

      const url = "https://countriesnow.space/api/v0.1/countries/state/cities";

      axios
        .post(url, body)
        .then((response) => {
          let options =
            response.data && response.data.data
              ? response.data.data.map((val) => {
                  return {
                    value: val,
                    label: val,
                  };
                })
              : [];

          if (options.length === 0) {
            options.push({
              value: "default",
              label: "City not available",
            });
          }

          setCitiesList(options);
        })
        .catch((error) => {
          console.error("error", error);
        });
    } else {
      setCitiesList([]);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    let body = {
      address: state.address,
      bank_account_number: state.bank_account_number,
      bank_name: state.bank_name,
      business_establish_date: state.business_establish_date,
      business_name: state.business_name,
      city: state.city,
      country: state.country,
      owner_name: state.owner_name,
      routing_number: state.routing_number,
      ssn: state.ssn,
      state: state.state,
      status: state.status,
      tax_id_and_EIN_number: state.tax_id_and_EIN_number,
      zip: state.zip,
    };

    console.log("body", body);
    authControllers
      .addBusiness(body)
      .then((res) => {
        console.log("response", res);
      })
      .catch((err) => {
        console.log("error", err);
      });
  };

  return (
    <Box className="main-wrapper">
      <Box sx={{ p: 1 }}>
        <Typography
          className={roboto.className}
          fontSize={20}
          sx={{ fontWeight: "600 !important" }}
        >
          Add Business
        </Typography>
        <Breadcrumbs
          separator={<NavigateNext fontSize="small" />}
          sx={{ mt: 2 }}
        >
          <Typography
            fontSize={12}
            className={roboto_slab_normal.className}
            onClick={() => handleRoute("/omegabusiness/business")}
            sx={{ cursor: "pointer" }}
          >
            Business
          </Typography>
          <Typography fontSize={12} className={roboto_slab_normal.className}>
            Add New Business
          </Typography>
        </Breadcrumbs>
      </Box>
      <form onSubmit={handleSubmit}>
        <Box sx={{ p: 1 }}>
          <Box>
            <Grid container spacing={2}>
              <Grid item xs={3}>
                <Box>
                  <TextField
                    fullWidth
                    label="Business Name"
                    id="business_name"
                    onChange={inputHandler}
                    sx={{
                      mt: 1,
                      "& input": {
                        fontSize: "16px",
                      },
                    }}
                  />
                </Box>
              </Grid>{" "}
              <Grid item xs={3}>
                <Box>
                  <TextField
                    fullWidth
                    label="Owner Name"
                    id="owner_name"
                    onChange={inputHandler}
                    sx={{
                      mt: 1,
                      "& input": {
                        fontSize: "16px",
                      },
                    }}
                  />
                </Box>
              </Grid>{" "}
              <Grid item xs={3}>
                <Box>
                  <TextField
                    fullWidth
                    label=" Tax ID / EIN Number"
                    id="tax_id_and_EIN_number"
                    onChange={inputHandler}
                    sx={{
                      mt: 1,
                      "& input": {
                        fontSize: "16px",
                      },
                    }}
                  />
                </Box>
              </Grid>
              <Grid item xs={3}>
                <Box>
                  <TextField
                    type="number"
                    fullWidth
                    id="ssn"
                    label=" SSN (optional)"
                    onChange={inputHandler}
                    sx={{
                      mt: 1,
                      "& input": {
                        fontSize: "16px",
                      },
                    }}
                  />
                </Box>
              </Grid>{" "}
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
                  <TextField
                    fullWidth
                    id="bank_name"
                    label="Bank Name "
                    onChange={inputHandler}
                    sx={{
                      mt: 1,
                      "& input": {
                        fontSize: "16px",
                      },
                    }}
                  />
                </Box>
              </Grid>{" "}
              <Grid item xs={3}>
                <Box>
                  <TextField
                    fullWidth
                    type="number"
                    id="bank_account_number"
                    label="Bank A/c Number "
                    onChange={inputHandler}
                    sx={{
                      mt: 1,
                      "& input": {
                        fontSize: "16px",
                      },
                    }}
                  />
                </Box>
              </Grid>{" "}
              <Grid item xs={3}>
                <Box>
                  <TextField
                    fullWidth
                    label="Routing Number"
                    id="routing_number"
                    onChange={inputHandler}
                    sx={{
                      mt: 1,
                      "& input": {
                        fontSize: "16px",
                      },
                    }}
                  />
                </Box>
              </Grid>{" "}
              <Grid item xs={3}>
                <Box>
                  <TextField
                    fullWidth
                    id="address"
                    label="Address"
                    onChange={inputHandler}
                    sx={{
                      mt: 1,
                      "& input": {
                        fontSize: "16px",
                      },
                    }}
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
                  <Autocomplete
                    sx={{
                      mt: 1,
                    }}
                    disablePortal
                    id="country"
                    options={countryCode}
                    onChange={CountryHandler}
                    fullWidth
                    renderInput={(params) => (
                      <TextField {...params} label="Country" />
                    )}
                  />
                </Box>
              </Grid>{" "}
              <Grid item xs={3}>
                <Box>
                  <Autocomplete
                    sx={{
                      mt: 1,
                    }}
                    disablePortal
                    id="state"
                    options={stateList}
                    onChange={cityHandler}
                    fullWidth
                    renderInput={(params) => (
                      <TextField {...params} label="State" />
                    )}
                  />
                </Box>
              </Grid>{" "}
              <Grid item xs={3}>
                <Box>
                  <Autocomplete
                    sx={{
                      mt: 1,
                    }}
                    disablePortal
                    id="city"
                    onChange={citySelectHandler}
                    options={citiesList}
                    fullWidth
                    renderInput={(params) => (
                      <TextField {...params} label="City" />
                    )}
                  />
                </Box>
              </Grid>{" "}
              <Grid item xs={3}>
                <Box>
                  <TextField
                    fullWidth
                    type="number"
                    id="zip"
                    label=" Zip/Postal"
                    onChange={inputHandler}
                    sx={{
                      mt: 1,
                      "& input": {
                        fontSize: "16px",
                      },
                    }}
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
                  <TextField
                    type="date"
                    fullWidth
                    id="business_establish_date"
                    onChange={inputHandler}
                    sx={{
                      mt: 1,
                      "& input": {
                        fontSize: "16px",
                      },
                    }}
                  />
                </Box>
              </Grid>{" "}
              <Grid item xs={3}>
                <Box>
                  <Autocomplete
                    sx={{
                      mt: 1,
                    }}
                    disablePortal
                    id="status"
                    onChange={statusSelectHandler}
                    options={businessStatus}
                    fullWidth
                    renderInput={(params) => (
                      <TextField {...params} label="Status" />
                    )}
                  />
                </Box>
              </Grid>{" "}
            </Grid>
          </Box>
          <Box
            sx={{
              mt: 3,
            }}
          >
            <button
              type="submit"
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
      </form>
    </Box>
  );
};

export default AddBusiness;
