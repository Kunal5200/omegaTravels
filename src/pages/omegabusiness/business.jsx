import BackdropFilter from "@/components/backdrop";
import {
  Avatar,
  Box,
  Button,
  Card,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Popover,
  Stack,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import avatar from "@/avatar/avatar_1.jpg";
import moment from "moment";
import DeleteIcon from "@mui/icons-material/Delete";
import React, { useEffect, useState } from "react";
import { Roboto_Slab } from "next/font/google";
import {
  Add,
  DeleteOutline,
  EditOutlined,
  MoreVert,
  MoreVertOutlined,
  MoreVertRounded,
  PasswordOutlined,
  VisibilityOutlined,
} from "@mui/icons-material";
import TabPanel from "@/components/tabpanel";
import Image from "next/image";
import { useRouter } from "next/router";
import { authControllers } from "@/api/auth";
import MoreVertIcon from "@mui/icons-material/MoreVert";
const roboto = Roboto_Slab({
  weight: "500",
  subsets: ["latin"],
});
const roboto_normal = Roboto_Slab({
  weight: "400",
  subsets: ["latin"],
});
const business = () => {
  let router = useRouter();
  const [loading, setLoading] = useState(true);
  const tabs = [
    {
      label: "All",
    },
    {
      label: "Active",
    },
    {
      label: "Inactive",
    },
  ];

  const tableHeader = [
    {
      label: "S.No",
    },
    {
      label: "BUSINESS NAME",
    },
    {
      label: "Owner Name",
    },
    {
      label: "TAX ID / EIN NUMBER",
    },
    {
      label: "BANK NAME	",
    },
    {
      label: "Country",
    },
    {
      label: "State",
    },
    {
      label: "Status",
    },
    {
      label: "",
    },
  ];
  const [value, setValue] = useState(0);

  const tabHandler = (e, newValue) => {
    setValue(newValue);
  };

  const addMerchant = () => {
    router.push("/add-business");
  };

  const [stablishedBusinessList, setStablishedBusinessList] = useState([]);
  const businessData = () => {
    authControllers
      .getBusiness()
      .then((res) => {
        setStablishedBusinessList(res.data.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log("error", err);
      });
  };

  useEffect(() => {
    businessData();
  }, []);

  const businessdetails = (id) => {
    router.push(`/omegabusiness/${id}/businessdetails`);
  };

  return (
    <Box className="main-wrapper">
      {loading ? (
        <div className="main-wrapper">
          <BackdropFilter open={loading} setOpen={setLoading} />
        </div>
      ) : (
        <div>
          {" "}
          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
            p={1}
            mt={2}
          >
            <Typography
              className={roboto.className}
              sx={{ fontWeight: "700 !important" }}
              fontSize={20}
            >
              BUSINESS LIST
            </Typography>
            <Button
              startIcon={<Add fontSize="small" />}
              sx={{
                border: "1px solid #000",
                backgroundColor: "#000",
                color: "#fff",
                fontSize: 12,
                ":hover": {
                  backgroundColor: "#000",
                  color: "#fff",
                },
              }}
              onClick={addMerchant}
            >
              Add Business
            </Button>
          </Stack>
          <Card>
            <Card sx={{ mt: 2 }}>
              <Box sx={{ borderBottom: "1px solid #eee" }}>
                <Tabs
                  sx={{
                    "&": {
                      ".MuiTab-root": {
                        fontSize: 12,
                      },
                      ".MuiTabs-indicator": {
                        backgroundColor: "#000",
                      },
                      ".MuiTab-root.Mui-selected": {
                        color: "#000",
                      },
                    },
                  }}
                  onChange={tabHandler}
                  value={value}
                >
                  {tabs.map((val, i) => (
                    <Tab label={val.label} key={i} />
                  ))}
                </Tabs>
              </Box>
              <Grid container p={2} alignItems={"center"}>
                <Grid item lg={11}>
                  <TextField fullWidth label="Search" />
                </Grid>
                <Grid item lg={1} textAlign="center">
                  <IconButton>
                    <MoreVertRounded />
                  </IconButton>
                </Grid>
              </Grid>
              <Box
                sx={{
                  paddingRight: 3,
                }}
              >
                {tabs.map((val, i) => (
                  <TabPanel value={value} index={i}>
                    <>
                      <TableContainer sx={{ p: 1 }}>
                        <Table>
                          <TableHead>
                            <TableRow sx={{ backgroundColor: "#eee" }}>
                              {tableHeader.map((val, i) => (
                                <TableCell key={i}>
                                  <Typography
                                    fontSize={14}
                                    className={roboto.className}
                                  >
                                    {val.label}
                                  </Typography>
                                </TableCell>
                              ))}
                            </TableRow>
                          </TableHead>

                          {stablishedBusinessList.map((val, id) => {
                            return (
                              <TableBody key={id}>
                                <TableRow hover>
                                  <TableCell>
                                    <Stack
                                      direction={"row"}
                                      alignItems={"center"}
                                      spacing={1}
                                      justifyContent={"start"}
                                    >
                                      {id + 1}.
                                    </Stack>
                                  </TableCell>{" "}
                                  <TableCell>
                                    <Stack
                                      direction={"row"}
                                      alignItems={"center"}
                                      spacing={1}
                                      justifyContent={"start"}
                                      sx={{
                                        cursor: "pointer",
                                      }}
                                      onClick={() => businessdetails(val._id)}
                                    >
                                      {val.business_name}
                                    </Stack>
                                  </TableCell>
                                  <TableCell>
                                    <Typography
                                      fontSize={13}
                                      className={roboto_normal.className}
                                      textTransform={"capitalize"}
                                    >
                                      {val.owner_name}
                                    </Typography>
                                  </TableCell>
                                  <TableCell>
                                    <Typography
                                      fontSize={13}
                                      className={roboto_normal.className}
                                      textTransform={"capitalize"}
                                    >
                                      {val.tax_id_and_EIN_number}
                                    </Typography>
                                  </TableCell>
                                  <TableCell>
                                    <Typography
                                      fontSize={13}
                                      className={roboto_normal.className}
                                      textTransform={"capitalize"}
                                    >
                                      {val.bank_name}
                                    </Typography>
                                  </TableCell>{" "}
                                  <TableCell>
                                    <Typography
                                      fontSize={13}
                                      className={roboto_normal.className}
                                      textTransform={"capitalize"}
                                    >
                                      {val.country}
                                    </Typography>
                                  </TableCell>{" "}
                                  <TableCell>
                                    <Typography
                                      fontSize={13}
                                      className={roboto_normal.className}
                                      textTransform={"capitalize"}
                                    >
                                      {val.state}
                                    </Typography>
                                  </TableCell>
                                  <TableCell>
                                    <Button
                                      sx={{
                                        padding: 0,
                                        fontSize: 10,
                                        cursor: "default !important",
                                      }}
                                    >
                                      {val.status}
                                    </Button>
                                  </TableCell>
                                  {/* <TableCell>
                                    <IconButton>
                                      <MoreVertIcon />
                                    </IconButton>
                                  </TableCell> */}
                                </TableRow>
                              </TableBody>
                            );
                          })}
                        </Table>
                      </TableContainer>
                    </>
                  </TabPanel>
                ))}
              </Box>
            </Card>
          </Card>
        </div>
      )}
    </Box>
  );
};

export default business;
