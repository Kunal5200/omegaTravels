import {
  Box,
  Card,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import Image from "next/image";
import React from "react";
import logo from "@/logo/logo.png";
import { routes } from "@/assesst/routes";
import { useRouter } from "next/router";
const Sidebar = () => {
  const router = useRouter();

  const routesHandler = (path) => {
    router.push(path);
  };
  return (
    <div>
      <Card
        sx={{
          position: "fixed",
          width: 200,
          minHeight: "100vh",
          height: "100%",
          overflow: "auto",
        }}
      >
        <Box
          sx={{
            p: 2,
            textAlign: "center",
            height: 62,
            borderBottom: "1px solid #eee",
          }}
        >
          <Image src={logo} width={100} />
        </Box>
        <Box sx={{ mt: 2, p: 1 }}>
          <List>
            {routes.map((val, i) => (
              <ListItemButton
                key={i}
                onClick={() => routesHandler(val.url)}
                sx={{
                  backgroundColor: router.pathname === val.url && "#00000039",
                  color: router.pathname === val.url && "#000",
                  ":hover": {
                    backgroundColor: "#00000039",
                    color: "#000",
                    boxShadow: "0px 0px 1px 1px #eee",
                  },
                  transition: "0.5s ease-in-out",
                  borderRadius: 2,
                  mt: 1,
                  backdropFilter: "blur(5px)",
                  boxShadow:
                    router.pathname === val.url && "0px 0px 1px 1px #eee",
                }}
              >
                <ListItemAvatar sx={{ minWidth: 30 }}>
                  {val.icon}
                </ListItemAvatar>
                <ListItemText
                  primary={<Typography fontSize={12}>{val.name}</Typography>}
                />
              </ListItemButton>
            ))}
          </List>
        </Box>
      </Card>
    </div>
  );
};

export default Sidebar;
