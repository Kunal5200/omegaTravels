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
import DeleteIcon from "@mui/icons-material/Delete";
import React, { useState } from "react";
import { Roboto_Slab } from "next/font/google";
import TabPanel from "@/components/tabpanel";
import { Status } from "@/utils/enum";
import avatar from "@/avatar/avatar_1.jpg";
import moment from "moment";
import Image from "next/image";
import {
  Add,
  DeleteOutline,
  EditOutlined,
  MoreVert,
  MoreVertOutlined,
  PasswordOutlined,
  VisibilityOutlined,
} from "@mui/icons-material";
import { useRouter } from "next/router";
const roboto = Roboto_Slab({
  weight: "500",
  subsets: ["latin"],
});
const roboto_normal = Roboto_Slab({
  weight: "400",
  subsets: ["latin"],
});
const Merchant = () => {
  let router = useRouter();
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
      label: "BUSINESS NAME",
    },
    {
      label: "MERCHANT ID	",
    },
    {
      label: "WEBSITE DBA	",
    },
    {
      label: "CURRENCY",
    },
    {
      label: "PROCESSOR",
    },
    {
      label: "GATEWAY PROVIDER	",
    },
    {
      label: "MID STATUS",
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
    router.push("/add-merchant");
  };

  return (
    <Box className="main-wrapper">
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
            MERCHANT LIST
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
            Add MERCHANT
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
                  <MoreVertOutlined />
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
                        <TableBody>
                          <TableRow hover>
                            <TableCell>
                              <Stack
                                direction={"row"}
                                alignItems={"center"}
                                spacing={1}
                                justifyContent={"start"}
                              >
                                <Avatar>
                                  <Image
                                    src={val.img || avatar}
                                    width={50}
                                    style={{ borderRadius: "50%" }}
                                  />
                                </Avatar>
                              </Stack>
                            </TableCell>
                            <TableCell>
                              <Typography
                                fontSize={13}
                                className={roboto_normal.className}
                                textTransform={"capitalize"}
                              >
                                Three
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Typography
                                fontSize={13}
                                className={roboto_normal.className}
                                textTransform={"capitalize"}
                              >
                                Four
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
                            </TableCell>{" "}
                            <TableCell>
                              <Typography
                                fontSize={13}
                                className={roboto_normal.className}
                                textTransform={"capitalize"}
                              >
                                {moment(val.createdAt).format("LL")}
                              </Typography>
                            </TableCell>{" "}
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
                                Block
                              </Button>
                            </TableCell>
                            <TableCell>
                              <IconButton>
                                <DeleteIcon />
                              </IconButton>
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </>
                </TabPanel>
              ))}
            </Box>
          </Card>
        </Card>
      </div>
    </Box>
  );
};

export default Merchant;
