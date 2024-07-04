import {
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
    tax_id_and_EIN_number: "",
    zip: "",
    status: "",
  });

  useEffect(() => {
    if (router.query.slug) {
      fetchBusinessDetails(router.query.slug);
    }
  }, [router.query.slug]);

  useEffect(() => {
    if (businessData) {
      setState((prevState) => ({
        ...prevState,
        address: businessData.address || "",
        bank_account_number: businessData.bank_account_number || "",
        bank_name: businessData.bank_name || "",
        business_establish_date: businessData.business_establish_date || "",
        business_name: businessData.business_name || "",
        city: businessData.city || "",
        country: businessData.country || "",
        owner_name: businessData.owner_name || "",
        routing_number: businessData.routing_number || "",
        ssn: businessData.ssn || "",
        state: businessData.state || "",
        tax_id_and_EIN_number: businessData.tax_id_and_EIN_number || "",
        zip: businessData.zip || "",
        status: businessData.status || "",
      }));
    }
  }, [businessData]);

  const fetchBusinessDetails = (detailsID) => {
    listingController
      .getBusinessDetails(detailsID)
      .then((res) => {
        setBusinessData(res.data.data);
      })
      .catch((err) => {
        console.log("error", err);
      });
  };

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
      tax_id_and_EIN_number: state.tax_id_and_EIN_number,
      zip: state.zip,
      status: state.status,
    };

    editcontroller
      .updateBusiness(router.query.slug, body)
      .then((res) => {
        console.log("response", res);
      })
      .catch((err) => {
        console.log("error", err);
      });
  };

  const addNotes = (val) => {
    dispatch(showModal(<AddNotes value={val} />));
  };
  const uploadImage = (val) => {
    dispatch(showModal(<UploadImageModal value={val} />));
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
                            label="Owner's Name"
                            fullWidth
                            onChange={inputHandler}
                            id="owner_name"
                            value={state.owner_name}
                          />
                        </Box>
                        <Box sx={{ mt: 2 }}>
                          <TextField
                            label="Tax ID / EIN Number"
                            fullWidth
                            onChange={inputHandler}
                            id="tax_id_and_EIN_number"
                            value={state.tax_id_and_EIN_number}
                          />
                        </Box>
                        <Box sx={{ mt: 2 }}>
                          <TextField
                            label="SSN (optional)"
                            fullWidth
                            onChange={inputHandler}
                            id="ssn"
                            value={state.ssn}
                          />
                        </Box>
                        <Box sx={{ mt: 2 }}>
                          <TextField
                            label="Bank Name (optional)"
                            fullWidth
                            onChange={inputHandler}
                            id="bank_name"
                            value={state.bank_name}
                          />
                        </Box>
                        <Box sx={{ mt: 2 }}>
                          <TextField
                            label="Bank Account Number (optional)"
                            fullWidth
                            onChange={inputHandler}
                            id="bank_account_number"
                            value={state.bank_account_number}
                          />
                        </Box>
                        <Box sx={{ mt: 2 }}>
                          <TextField
                            label="Routing Number (optional)"
                            fullWidth
                            onChange={inputHandler}
                            id="routing_number"
                            value={state.routing_number}
                          />
                        </Box>
                        <Box sx={{ mt: 2 }}>
                          <TextField
                            label="Address"
                            fullWidth
                            onChange={inputHandler}
                            id="address"
                            value={state.address}
                          />
                        </Box>
                        <Box sx={{ mt: 2 }}>
                          <TextField
                            label="City"
                            fullWidth
                            onChange={inputHandler}
                            id="city"
                            value={state.city}
                          />
                        </Box>
                        <Box sx={{ mt: 2 }}>
                          <TextField
                            label="State/Province"
                            fullWidth
                            onChange={inputHandler}
                            id="state"
                            value={state.state}
                          />
                        </Box>
                        <Box sx={{ mt: 2 }}>
                          <TextField
                            label="Zip/Postal"
                            fullWidth
                            onChange={inputHandler}
                            id="zip"
                            value={state.zip}
                          />
                        </Box>
                        <Box sx={{ mt: 2 }}>
                          <TextField
                            label="Country"
                            fullWidth
                            onChange={inputHandler}
                            id="country"
                            value={state.country}
                          />
                        </Box>
                        <Box sx={{ mt: 2 }}>
                          <TextField
                            label="Business Establish Date"
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
                  <Tabs sx={{ borderBottom: "1px solid #d3d3d3" }}>
                    <Tab
                      label="Service details"
                      sx={{
                        color: "#859bee",
                        fontSize: "12px",
                        fontWeight: 600,
                        border: "1px solid #859bee",
                        borderRadius: "2px",
                      }}
                      onClick={() => showData()}
                    />
                  </Tabs>
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
