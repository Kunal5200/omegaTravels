import { authControllers } from "@/api/auth";
import TabPanel from "@/components/tabpanel";
import { Status } from "@/utils/enum";
import {
  Add,
  DeleteOutline,
  EditOutlined,
  MoreVert,
  MoreVertOutlined,
  PasswordOutlined,
  VisibilityOutlined,
} from "@mui/icons-material";
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
import moment from "moment";
import { Roboto_Slab } from "next/font/google";
import React, { useEffect, useState } from "react";
import avatar from "@/avatar/avatar_1.jpg";
import Image from "next/image";
import Loading from "react-loading";
import BackdropFilter from "@/components/backdrop";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { showModal } from "@/redux/reducers/modal";
import ResetPassword from "@/assesst/modal/resetPassword";
import DeleteUser from "@/assesst/modal/DeleteUser";
const roboto = Roboto_Slab({
  weight: "500",
  subsets: ["latin"],
});
const roboto_normal = Roboto_Slab({
  weight: "400",
  subsets: ["latin"],
});

const UserManagement = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [search, setSearch] = useState("");
  //   const [openBackdrop, setOpenBackdrop] = useState(true);
  const pageChange = (e, newPage) => {
    setPage(newPage);
    setLoading(true);
    getUserList({ page: newPage + 1, pageSize });
  };
  const pageSizeHandler = (e) => {
    setPageSize(e.target.value);
    setLoading(true);
    getUserList({ page, pageSize: e.target.value });
  };
  const getUserList = ({ page, pageSize }) => {
    // console.log(page);
    authControllers
      .userList({ page, pageSize })
      .then((res) => {
        setData(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [value, setValue] = useState(0);

  const tabHandler = (e, newValue) => {
    setValue(newValue);
    setLoading(true);
    const textContent = e.target.textContent;
    if (textContent === Status.ACTIVE) {
      authControllers
        .userList({ page, pageSize, status: true })
        .then((res) => {
          setData(res.data.data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (textContent === Status.INACTIVE) {
      authControllers
        .userList({ page, pageSize, status: false })
        .then((res) => {
          setData(res.data.data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      authControllers
        .userList({ page, pageSize })
        .then((res) => {
          setData(res.data.data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const searchHandler = (e) => {
    setSearch(e.target.value);
    setLoading(true);
    authControllers
      .userList({ page, pageSize, name: e.target.value })
      .then((res) => {
        setData(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getUserList({ page, pageSize });
  }, []);

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
      label: "Name",
    },
    // {
    //   label: "Username",
    // },
    {
      label: "Phone Number",
    },
    {
      label: "Created On",
    },
    {
      label: "Status",
    },
    {
      label: "",
    },
  ];

  const dispatch = useDispatch();
  const [details, setDetails] = useState("");
  const resetPassWord = () => {
    dispatch(showModal(<ResetPassword details={details} />));
    setAnchorEl(null);
  };
  const handleEditUser = () => {
    router.push(`edit-user/${details._id}`);
  };

  const handleDeleteCar = () => {
    dispatch(
      showModal(
        <DeleteUser
          details={details}
          getUserList={getUserList}
          page={page}
          pageSize={pageSize}
        />
      )
    );
    setAnchorEl(null);
  };

  const Actions = [
    {
      label: "Edit",
      icon: <EditOutlined htmlColor="#008000" fontSize="small" />,
      onClick: handleEditUser,
    },
    {
      label: "Delete",
      icon: <DeleteOutline htmlColor="#ff0000" fontSize="small" />,
      onClick: handleDeleteCar,
    },
    {
      label: "Reset Password",
      icon: <PasswordOutlined htmlColor="#FF7500" fontSize="small" />,
      onClick: resetPassWord,
    },
    // {
    //   label: "View",
    //   icon: <VisibilityOutlined htmlColor="#0000FF" fontSize="small" />,
    // },
  ];

  const handlepopver = (e, value) => {
    setAnchorEl(e.currentTarget);
    // console.log("first", value);
    setDetails(value);
  };

  const handleAddUser = () => {
    router.push("/add-user");
  };

  return (
    <div className="main-wrapper">
      {/* {loading ? (
        <div className="main-wrapper">
          <BackdropFilter open={loading} setOpen={setLoading} />
        </div>
      ) : ( */}
      <div>
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
            User List
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
            onClick={handleAddUser}
          >
            Add User
          </Button>
        </Stack>

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
              <TextField
                fullWidth
                label="Search By Name"
                value={search}
                onChange={searchHandler}
              />
            </Grid>
            <Grid item lg={1} textAlign="center">
              <IconButton>
                <MoreVertOutlined />
              </IconButton>
            </Grid>
          </Grid>
          {tabs.map((val, i) => (
            <TabPanel value={value} index={i}>
              <>
                {loading ? (
                  <Loading
                    type="bars"
                    color="#000"
                    width={20}
                    height={20}
                    className="m-auto mb-2"
                  />
                ) : (
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
                        <TableBody>
                          {data &&
                            data.data.map((val, i) => (
                              <TableRow key={i} hover>
                                <TableCell>
                                  <Stack
                                    direction={"row"}
                                    alignItems={"center"}
                                    spacing={1}
                                  >
                                    <Avatar>
                                      <img
                                        src={val.profile || avatar.src}
                                        width={50}
                                        style={{ borderRadius: "50%" }}
                                      />
                                    </Avatar>
                                    <Box>
                                      <Typography
                                        fontSize={13}
                                        className={roboto.className}
                                        textTransform={"capitalize"}
                                      >
                                        {val.first_name} {val.last_name}
                                      </Typography>
                                      <Typography
                                        fontSize={11}
                                        className={roboto_normal.className}
                                      >
                                        {val.email}
                                      </Typography>
                                    </Box>
                                  </Stack>
                                </TableCell>
                                {/* <TableCell>
                                  <Typography
                                    fontSize={13}
                                    className={roboto_normal.className}
                                    textTransform={"capitalize"}
                                  >
                                    {val.username || "--"}
                                  </Typography>
                                </TableCell> */}
                                <TableCell>
                                  <Typography
                                    fontSize={13}
                                    className={roboto_normal.className}
                                    textTransform={"capitalize"}
                                  >
                                    {val.phone_number || "--"}
                                  </Typography>
                                </TableCell>
                                <TableCell>
                                  <Typography
                                    fontSize={13}
                                    className={roboto_normal.className}
                                    textTransform={"capitalize"}
                                  >
                                    {moment(val.createdAt).format("LL")}
                                  </Typography>
                                </TableCell>
                                <TableCell>
                                  <Button
                                    sx={{
                                      padding: 0,
                                      fontSize: 10,
                                      color: val.status ? "#008000" : "#ff0000",
                                      border: val.status
                                        ? "1px solid #008000"
                                        : "1px solid #ff0000",
                                      backgroundColor: val.status
                                        ? "#00800039"
                                        : "#ff000039",
                                      borderRadius: 8,
                                      padding: "4px",
                                      cursor: "default !important",
                                    }}
                                  >
                                    {val.status
                                      ? Status.ACTIVE
                                      : Status.INACTIVE}
                                  </Button>
                                </TableCell>
                                <TableCell>
                                  <IconButton
                                    onClick={(e) => handlepopver(e, val)}
                                  >
                                    <MoreVert />
                                  </IconButton>
                                </TableCell>
                              </TableRow>
                            ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                    <TablePagination
                      rowsPerPage={pageSize}
                      page={page}
                      count={data && data.totalItems}
                      sx={{
                        "& .MuiTablePagination-selectLabel": {
                          fontSize: 12,
                          fontFamily: roboto_normal.style,
                        },
                      }}
                      onPageChange={pageChange}
                      onRowsPerPageChange={pageSizeHandler}
                    />
                  </>
                )}
              </>
            </TabPanel>
          ))}
          <Popover
            sx={{
              ".MuiPaper-root": {
                boxShadow: "none",
                border: "1px solid #eee",

                backgroundColor: "#ffffff59",
                backdropFilter: "blur(5px)",
                borderRadius: 4,
              },
            }}
            anchorEl={anchorEl}
            open={open}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            onClose={() => setAnchorEl(null)}
          >
            <List>
              {Actions.map((val, i) => (
                <>
                  <ListItemButton key={i} onClick={val.onClick}>
                    <ListItemAvatar>{val.icon}</ListItemAvatar>
                    <ListItemText
                      primary={
                        <Typography
                          fontSize={12}
                          className={roboto_normal.className}
                        >
                          {val.label}
                        </Typography>
                      }
                    />
                  </ListItemButton>
                  <Divider sx={{ borderStyle: "dashed", borderWidth: 1 }} />
                </>
              ))}
            </List>
          </Popover>
        </Card>
      </div>
      {/* )} */}
    </div>
  );
};

export default UserManagement;
