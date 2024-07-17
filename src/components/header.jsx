import { loginDetails } from "@/redux/reducers/userInfo";
import {
  Avatar,
  Box,
  Divider,
  IconButton,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Popover,
  Stack,
  Typography,
} from "@mui/material";
import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import avatar from "@/avatar/avatar_1.jpg";
import Image from "next/image";
import { Raleway, Roboto_Slab } from "next/font/google";
import { profileRoutes } from "@/assesst/routes";
import { useRouter } from "next/router";

const roboto = Raleway({
  weight: "600",
  subsets: ["latin"],
});
const roboto_slab = Roboto_Slab({
  weight: "600",
  subsets: ["latin"],
});
const Header = () => {
  const router = useRouter();
  const user = useSelector((state) => state.UserDetails);
  const handleRoute = (path) => {
    router.push(path);
    setAnchorEl(null);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      const decode = jwtDecode(accessToken);
      dispatch(loginDetails({ ...decode }));
    }
  }, []);
  const [fixed, setFixed] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", () => setFixed(window.pageYOffset > 0));
    }
  }, []);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const showPopover = (e) => {
    setAnchorEl(e.currentTarget);
  };
  return (
    <div>
      <Box
        sx={{
          position: "fixed",
          top: 0,
          width: "86%",
          left: 200,
          p: 1,
          boxShadow: "0px 0px 1px 1px #eee",
          background: fixed ? "#00000029" : "#ffffff",
          backdropFilter: "blur(5px)",
          transition: "0.5s ease-in-out",
          zIndex: 99,
        }}
      >
        <Stack
          direction="row"
          alignItems={"center"}
          justifyContent={"flex-end"}
        >
          <IconButton onClick={showPopover}>
            <Image
              src={avatar}
              width={30}
              height={30}
              style={{ borderRadius: "50%" }}
            />
          </IconButton>
        </Stack>
      </Box>
      <Popover
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        onClose={() => setAnchorEl(null)}
        sx={{
          "& .MuiPopover-paper": {
            boxShadow: "none",
            background: "#ffffff29",
            width: 250,
            border: "1px solid #eee",
            backdropFilter: "blur(5px)",
          },
        }}
      >
        <Stack direction={"row"} spacing={1} p={1}>
          <IconButton>
            <Image
              src={avatar}
              width={25}
              height={25}
              style={{ borderRadius: "50%" }}
            />
          </IconButton>
          <Box>
            <Typography
              fontSize={13}
              className={roboto.className}
              textTransform={"capitalize"}
            >
              {user.name} {`(${user.type})`}
            </Typography>
            <Typography
              fontSize={12}
              className={roboto.className}
              textTransform={"capitalize"}
            >
              {user.email}
            </Typography>
          </Box>
        </Stack>
        <Divider sx={{ borderStyle: "dashed", borderColor: "#000" }} />
        <List>
          {profileRoutes.map((val, i) => (
            <ListItemButton key={i} onClick={() => handleRoute(val.url)}>
              <ListItemAvatar>{val.icon}</ListItemAvatar>
              <ListItemText
                primary={
                  <Typography fontSize={12} fontFamily={roboto_slab.style}>
                    {val.name}
                  </Typography>
                }
              />
            </ListItemButton>
          ))}
        </List>
      </Popover>
    </div>
  );
};

export default Header;
