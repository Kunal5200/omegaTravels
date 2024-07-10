import {
  Autocomplete,
  Box,
  Button,
  Grid,
  Stack,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Roboto_Slab } from "next/font/google";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import DescriptionIcon from "@mui/icons-material/Description";
import Checkbox from "@mui/material/Checkbox";
import DownloadIcon from "@mui/icons-material/Download";
import { useRouter } from "next/router";
import { listingController } from "@/api/listing";
import { editcontroller } from "@/api/update";
import { useDispatch } from "react-redux";
import { showModal } from "@/redux/reducers/modal";
import AddNotes from "@/components/modalcalling/addnotesmodal";
import UploadImageModal from "@/components/modalcalling/uploadimage";

const roboto = Roboto_Slab({
  weight: "500",
  subsets: ["latin"],
});
const roboto_normal = Roboto_Slab({
  weight: "400",
  subsets: ["latin"],
});
const Merchantdetails = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [businessData, setBusinessData] = useState(null);
  const [state, setState] = useState({
    bank_Information_same_as_business: "",
    bank_account_number: "",
    bank_name: "",
    business_id: "",
    contact_person: "",
    currencies: "",
    description_of_services: "",
    merchant_id: "",
    monthly_cap: "",
    reserve_percentage: "",
    retail_description: "",
    support_email: "",
    support_fax_number: "",
    support_number: "",
    website_DBA_name: "",
  });

  // useEffect(() => {
  //   if (router.query.slug) {
  //     fetchBusinessDetails(router.query.slug);
  //   }
  // }, [router.query.slug]);

  // useEffect(() => {
  //   if (businessData) {
  //     setState((prevState) => ({
  //       ...prevState,
  //       address: businessData.address || "",
  //       bank_account_number: businessData.bank_account_number || "",
  //       bank_name: businessData.bank_name || "",
  //       business_establish_date: businessData.business_establish_date || "",
  //       business_name: businessData.business_name || "",
  //       city: businessData.city || "",
  //       country: businessData.country || "",
  //       owner_name: businessData.owner_name || "",
  //       routing_number: businessData.routing_number || "",
  //       ssn: businessData.ssn || "",
  //       state: businessData.state || "",
  //       tax_id_and_EIN_number: businessData.tax_id_and_EIN_number || "",
  //       zip: businessData.zip || "",
  //       status: businessData.status || "",
  //     }));
  //   }
  // }, [businessData]);

  // const fetchBusinessDetails = (detailsID) => {
  //   listingController
  //     .getBusinessDetails(detailsID)
  //     .then((res) => {
  //       setBusinessData(res.data.data);
  //     })
  //     .catch((err) => {
  //       console.log("error", err);
  //     });
  // };

  const detailsType = [
    { label: "Merchant Details", id: "Merchantdetails" },
    { label: "Documents", id: "Documents" },
  ];

  const [showForm, setShowForm] = useState("Merchantdetails");

  const changeDocType = (id) => {
    setShowForm(id);
  };

  const [show, setShow] = useState(false);
  const showData = () => {
    setShow(!show);
  };

  const inputHandler = (e) => {
    let { id, value } = e.target;
    setState({ ...state, [id]: value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    let body = {
      bank_Information_same_as_business:
        state.bank_Information_same_as_business,
      bank_account_number: state.bank_account_number,
      bank_name: state.bank_name,
      business_id: state.business_id,
      contact_person: state.contact_person,
      currencies: state.currencies,
      description_of_services: state.description_of_services,
      merchant_id: state.merchant_id,
      monthly_cap: state.monthly_cap,
      reserve_percentage: state.reserve_percentage,
      retail_description: state.reserve_percentage,
      support_email: state.support_email,
      support_fax_number: state.support_fax_number,
      support_number: state.support_number,
      website_DBA_name: state.website_DBA_name,
    };

    console.log("body", body);
  };

  const addNotes = (val) => {
    dispatch(showModal(<AddNotes value={val} />));
  };
  const uploadImage = (val) => {
    dispatch(showModal(<UploadImageModal value={val} />));
  };

  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const top100Films = [{ label: "maverick" }];

  const [processorState, setProcessorState] = useState({
    last_update: "",
    password: "",
    type: "processor",
    username: "",
  });

  const processorInputHandler = (e, newValue) => {
    const { id, value } = e.target;
    setProcessorState({ ...processorState, [id]: value });
  };

  const processorDateHandler = (e) => {
    const { value } = e.target;
    setProcessorState({ ...processorState, last_update: value });
  };

  const processorSubmitHandler = (e) => {
    e.preventDefault();
    console.log("stateee", processorState);
  };

  return (
    <Box className="main-wrapper">
      <Box>
        <Stack>
          <Typography
            className={roboto.className}
            sx={{ fontWeight: "700 !important", padding: 2 }}
            fontSize={20}
          >
            Edit Business Details
          </Typography>
        </Stack>
        <Box sx={{ mt: 2 }}>
          <Grid container spacing={2} sx={{ flexGrow: 1 }} padding={2}>
            <Grid item xs={6}>
              <Box sx={{ paddingRight: 4 }}>
                <Tabs>
                  {detailsType.map((val, id) => (
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
                    />
                  ))}
                </Tabs>
                <Box sx={{ p: 2 }}>
                  {showForm === "Merchantdetails" ? (
                    <Box>
                      <form onSubmit={submitHandler}>
                        <Box>
                          <TextField
                            label="Business Name"
                            fullWidth
                            onChange={inputHandler}
                            id="business_name"
                            value={state.business_name}
                          />
                        </Box>
                        <Box sx={{ mt: 2 }}>
                          <TextField
                            label="Merchant id"
                            fullWidth
                            onChange={inputHandler}
                            id="Merchant_Id"
                            value={state.owner_name}
                          />
                        </Box>
                        <Box sx={{ mt: 2 }}>
                          <TextField
                            label="Mid Status"
                            fullWidth
                            onChange={inputHandler}
                            id="tax_id_and_EIN_number"
                            value={state.tax_id_and_EIN_number}
                          />
                        </Box>
                        <Box sx={{ mt: 2 }}>
                          <TextField
                            label="Website/DBA Name"
                            fullWidth
                            onChange={inputHandler}
                            id="ssn"
                            value={state.ssn}
                          />
                        </Box>
                        <Box sx={{ mt: 2 }}>
                          <TextField
                            label="Contact Person"
                            fullWidth
                            onChange={inputHandler}
                            id="bank_name"
                            value={state.bank_name}
                          />
                        </Box>
                        <Box sx={{ mt: 2 }}>
                          <TextField
                            label="Currencies"
                            fullWidth
                            onChange={inputHandler}
                            id="bank_account_number"
                            value={state.bank_account_number}
                          />
                        </Box>
                        <Box sx={{ mt: 2 }}>
                          <TextField
                            label="Description of the Goods/Services"
                            fullWidth
                            onChange={inputHandler}
                            id="routing_number"
                            value={state.routing_number}
                          />
                        </Box>
                        <Box sx={{ mt: 2 }}>
                          <TextField
                            label="Retail Descriptor/s"
                            fullWidth
                            onChange={inputHandler}
                            id="address"
                            value={state.address}
                          />
                        </Box>
                        <Box sx={{ mt: 2 }}>
                          <TextField
                            label="Monthly Cap"
                            fullWidth
                            onChange={inputHandler}
                            id="city"
                            value={state.city}
                          />
                        </Box>
                        <Box sx={{ mt: 2 }}>
                          <TextField
                            label="Bank Name (Optional)
                            "
                            fullWidth
                            onChange={inputHandler}
                            id="state"
                            value={state.state}
                          />
                        </Box>
                        <Box sx={{ mt: 2 }}>
                          <TextField
                            label="Bank Account Number (optional)"
                            fullWidth
                            onChange={inputHandler}
                            id="zip"
                            value={state.zip}
                          />
                        </Box>
                        <Box sx={{ mt: 2 }}>
                          <TextField
                            label="Routing Number (Optional)"
                            fullWidth
                            onChange={inputHandler}
                            id="country"
                            value={state.country}
                          />
                        </Box>
                        <Box sx={{ mt: 2 }}>
                          <TextField
                            label="Support Number"
                            fullWidth
                            onChange={inputHandler}
                            id="business_establish_date"
                            value={state.business_establish_date}
                          />
                        </Box>{" "}
                        <Box sx={{ mt: 2 }}>
                          <TextField
                            label="Support Email"
                            fullWidth
                            onChange={inputHandler}
                            id="business_establish_date"
                            value={state.business_establish_date}
                          />
                        </Box>{" "}
                        <Box sx={{ mt: 2 }}>
                          <TextField
                            label="Support Fax Number"
                            fullWidth
                            onChange={inputHandler}
                            id="business_establish_date"
                            value={state.business_establish_date}
                          />
                        </Box>
                        <Box sx={{ mt: 3 }}>
                          <Button
                            style={{
                              backgroundColor: "#859bee",
                              color: "#fff",
                              width: "30%",
                              padding: "10px",
                            }}
                            type="submit"
                          >
                            Submit
                          </Button>
                        </Box>
                      </form>
                    </Box>
                  ) : (
                    <Box>
                      <TableContainer>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                          <TableHead sx={{ backgroundColor: "#d3d3d3" }}>
                            <TableRow>
                              <TableCell
                                sx={{ fontSize: "15px", fontWeight: 600 }}
                              >
                                Documents Name
                              </TableCell>
                              <TableCell
                                align="left"
                                sx={{ fontSize: "15px", fontWeight: 600 }}
                              >
                                Upload Date
                              </TableCell>
                              <TableCell
                                align="left"
                                sx={{ fontSize: "15px", fontWeight: 600 }}
                              >
                                Download
                              </TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            <TableRow
                              sx={{
                                "&:last-child td, &:last-child th": {
                                  border: 0,
                                },
                              }}
                            >
                              <TableCell component="th" scope="row">
                                yguhij
                              </TableCell>
                              <TableCell align="left">xdtfygh</TableCell>
                              <TableCell align="left">
                                <DownloadIcon sx={{ color: "#859bee" }} />
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </Box>
                  )}
                </Box>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box>
                <Box>
                  <div>
                    <Tabs
                      value={selectedTab}
                      onChange={handleTabChange}
                      sx={{ borderBottom: "1px solid #d3d3d3" }}
                    >
                      <Tab
                        label="Processor Login"
                        sx={{
                          color: "#859bee",
                          fontSize: "11px",
                          fontWeight: 600,
                          borderRadius: "2px",
                        }}
                      />
                      <Tab
                        label="GateWay Login"
                        sx={{
                          color: "#859bee",
                          fontSize: "11px",
                          fontWeight: 600,
                          borderRadius: "2px",
                        }}
                      />
                      <Tab
                        label="Member Login"
                        sx={{
                          color: "#859bee",
                          fontSize: "11px",
                          fontWeight: 600,
                          borderRadius: "2px",
                        }}
                      />
                      <Tab
                        label="CRM Login"
                        sx={{
                          color: "#859bee",
                          fontSize: "11px",
                          fontWeight: 600,
                          borderRadius: "2px",
                        }}
                      />
                      <Tab
                        label="Service Detail"
                        sx={{
                          color: "#859bee",
                          fontSize: "11px",
                          fontWeight: 600,
                          borderRadius: "2px",
                        }}
                      />
                    </Tabs>

                    <Box
                      role="tabpanel"
                      hidden={selectedTab !== 0}
                      sx={{ p: 3 }}
                    >
                      <form onSubmit={processorSubmitHandler}>
                        <Box>
                          <Autocomplete
                            disablePortal
                            id="type"
                            options={top100Films}
                            fullWidth
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                label="Please select Processor"
                                onChange={processorInputHandler}
                              />
                            )}
                          />
                        </Box>
                        <Box
                          sx={{
                            mt: 2,
                          }}
                        >
                          <TextField
                            fullWidth
                            onChange={processorInputHandler}
                            id="username"
                            label="Username"
                          />
                        </Box>
                        <Box
                          sx={{
                            mt: 2,
                          }}
                        >
                          <TextField
                            fullWidth
                            onChange={processorInputHandler}
                            id="password"
                            type="password"
                            label="Password"
                          />
                        </Box>
                        <Box
                          sx={{
                            mt: 2,
                          }}
                        >
                          <TextField
                            type="date"
                            fullWidth
                            onChange={processorDateHandler}
                            id="last_update"
                            label="Last Update"
                            InputLabelProps={{ shrink: true }}
                          />
                        </Box>
                        <Box
                          sx={{
                            mt: 2,
                          }}
                        >
                          <Button
                            type="submit"
                            style={{
                              backgroundColor: "#000",
                              color: "#fff",
                              width: "30%",
                              padding: "13px",
                            }}
                          >
                            Submit
                          </Button>
                        </Box>
                      </form>
                    </Box>
                    <Box
                      role="tabpanel"
                      hidden={selectedTab !== 1}
                      sx={{ p: 3 }}
                    >
                      <form>
                        <Box>
                          <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            options={top100Films}
                            fullWidth
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                label="Please Select Gateway"
                              />
                            )}
                          />
                        </Box>
                        <Box
                          sx={{
                            mt: 2,
                          }}
                        >
                          <TextField fullWidth />
                        </Box>
                        <Box
                          sx={{
                            mt: 2,
                          }}
                        >
                          <TextField fullWidth />
                        </Box>
                        <Box
                          sx={{
                            mt: 2,
                          }}
                        >
                          <TextField type="date" fullWidth />
                        </Box>
                        <Box
                          sx={{
                            mt: 2,
                          }}
                        >
                          <Button
                            style={{
                              backgroundColor: "#000",
                              color: "#fff",
                              width: "30%",
                              padding: "13px",
                            }}
                          >
                            Submit
                          </Button>
                        </Box>
                      </form>
                    </Box>
                    <Box
                      role="tabpanel"
                      hidden={selectedTab !== 2}
                      sx={{ p: 3 }}
                    >
                      <form>
                        <Box>
                          <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            options={top100Films}
                            fullWidth
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                label="Please select member"
                              />
                            )}
                          />
                        </Box>
                        <Box
                          sx={{
                            mt: 2,
                          }}
                        >
                          <TextField fullWidth />
                        </Box>
                        <Box
                          sx={{
                            mt: 2,
                          }}
                        >
                          <TextField fullWidth />
                        </Box>
                        <Box
                          sx={{
                            mt: 2,
                          }}
                        >
                          <TextField fullWidth />
                        </Box>
                        <Box
                          sx={{
                            mt: 2,
                          }}
                        >
                          <Button
                            style={{
                              backgroundColor: "#000",
                              color: "#fff",
                              width: "30%",
                              padding: "13px",
                            }}
                          >
                            Submit
                          </Button>
                        </Box>
                      </form>
                    </Box>
                    <Box
                      role="tabpanel"
                      hidden={selectedTab !== 3}
                      sx={{ p: 3 }}
                    >
                      <form>
                        <Box>
                          <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            options={top100Films}
                            fullWidth
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                label="Please select CRM"
                              />
                            )}
                          />
                        </Box>
                        <Box
                          sx={{
                            mt: 2,
                          }}
                        >
                          <TextField fullWidth />
                        </Box>
                        <Box
                          sx={{
                            mt: 2,
                          }}
                        >
                          <TextField fullWidth />
                        </Box>{" "}
                        <Box
                          sx={{
                            mt: 2,
                          }}
                        >
                          <TextField fullWidth />
                        </Box>
                        <Box
                          sx={{
                            mt: 2,
                          }}
                        >
                          <TextField type="date" fullWidth />
                        </Box>
                        <Box
                          sx={{
                            mt: 2,
                          }}
                        >
                          <Button
                            style={{
                              backgroundColor: "#000",
                              color: "#fff",
                              width: "30%",
                              padding: "13px",
                            }}
                          >
                            Submit
                          </Button>
                        </Box>
                      </form>
                    </Box>
                    <Box
                      role="tabpanel"
                      hidden={selectedTab !== 4}
                      sx={{ px: 3 }}
                    >
                      <TableContainer>
                        <Table
                          sx={{
                            minWidth: 400,
                            borderTop: "none",
                          }}
                          aria-label="simple table"
                        >
                          <TableBody>
                            <TableRow
                              sx={{
                                "&:last-child td, &:last-child th": {
                                  border: 0,
                                },
                              }}
                            >
                              <TableCell component="th" scope="row">
                                <Checkbox /> A/c and Bookkeeping
                              </TableCell>
                            </TableRow>
                            <TableRow
                              sx={{
                                "&:last-child td, &:last-child th": {
                                  border: 0,
                                },
                              }}
                            >
                              <TableCell component="th" scope="row">
                                <Checkbox /> CB Alert
                              </TableCell>
                            </TableRow>
                            <TableRow
                              sx={{
                                "&:last-child td, &:last-child th": {
                                  border: 0,
                                },
                              }}
                            >
                              <TableCell component="th" scope="row">
                                <Checkbox /> CB Represements
                              </TableCell>
                            </TableRow>
                            <TableRow
                              sx={{
                                "&:last-child td, &:last-child th": {
                                  border: 0,
                                },
                              }}
                            >
                              <TableCell component="th" scope="row">
                                <Checkbox /> Customer Support
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </Box>
                  </div>
                  {show && (
                    <TableContainer>
                      <Table
                        sx={{
                          minWidth: 650,
                          border: "1px solid #d3d3d3",
                          borderTop: "none",
                        }}
                        aria-label="simple table"
                      >
                        <TableBody>
                          <TableRow
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                          >
                            <TableCell component="th" scope="row">
                              <Checkbox /> yguhij
                            </TableCell>
                          </TableRow>
                          <TableRow
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                          >
                            <TableCell component="th" scope="row">
                              <Checkbox /> yguhij
                            </TableCell>
                          </TableRow>
                          <TableRow
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                          >
                            <TableCell component="th" scope="row">
                              <Checkbox /> yguhij
                            </TableCell>
                          </TableRow>
                          <TableRow
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                          >
                            <TableCell component="th" scope="row">
                              <Checkbox /> yguhij
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>
                  )}
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    padding: "25px 0",
                  }}
                >
                  <Box
                    sx={{
                      border: "1px solid #d3d3d3",
                      borderRadius: "6px",
                      width: "130px",
                    }}
                  >
                    <Box
                      sx={{ backgroundColor: "#859bee", padding: "8px 5px" }}
                    >
                      <FileUploadIcon
                        sx={{ color: "#fff", fontSize: "50px" }}
                      />
                    </Box>
                    <Typography
                      sx={{
                        borderTop: "1px solid #d3d3d3",
                        padding: "5px 20px",
                        textAlign: "center",
                        backgroundColor: "#d3d3d3",
                        color: "#000",
                        fontSize: "15px",
                        fontWeight: 400,
                      }}
                      onClick={() => uploadImage(router.query.slug)}
                    >
                      Upload
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      border: "1px solid #d3d3d3",
                      borderRadius: "6px",
                      width: "130px",
                      marginLeft: 3,
                    }}
                  >
                    <Box
                      sx={{ backgroundColor: "#859bee", padding: "8px 5px" }}
                    >
                      <DescriptionIcon
                        sx={{ color: "#fff", fontSize: "50px" }}
                      />
                    </Box>
                    <Typography
                      sx={{
                        borderTop: "1px solid #d3d3d3",
                        padding: "5px 20px",
                        textAlign: "center",
                        backgroundColor: "#d3d3d3",
                        color: "#000",
                        fontSize: "15px",
                        fontWeight: 400,
                        cursor: "pointer",
                      }}
                      onClick={() => addNotes(router.query.slug)}
                    >
                      Add Notes
                    </Typography>
                  </Box>
                </Box>
                <Box>
                  <TableContainer>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                      <TableHead sx={{ backgroundColor: "#d3d3d3" }}>
                        <TableRow>
                          <TableCell sx={{ fontSize: "15px", fontWeight: 600 }}>
                            Notes
                          </TableCell>
                          <TableCell
                            align="left"
                            sx={{ fontSize: "15px", fontWeight: 600 }}
                          >
                            Comment Date
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {businessData &&
                          businessData.notes.map((val, id) => {
                            return (
                              <TableRow
                                sx={{
                                  "&:last-child td, &:last-child th": {
                                    border: 0,
                                  },
                                }}
                                key={id}
                              >
                                <TableCell component="th" scope="row">
                                  {val.note}
                                </TableCell>
                                <TableCell align="left">
                                  {val.created}
                                </TableCell>
                              </TableRow>
                            );
                          })}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default Merchantdetails;
