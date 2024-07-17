import { UserSettingControllers } from "@/api/usersetting";
import AddModules from "@/assesst/modal/addModules";
import { showModal } from "@/redux/reducers/modal";
import { Add } from "@mui/icons-material";
import {
  Button,
  Card,
  Stack,
  Table,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Roboto_Slab } from "next/font/google";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const tableHeader = [
  {
    label: "Module Name",
  },
  {
    label: "Sub Module Name",
  },
  {
    label: "Slug",
  },
  {
    label: "Status",
  },
  {
    label: "Action",
  },
];

const roboto = Roboto_Slab({
  weight: "600",
  subsets: ["latin"],
});

const Modules = () => {
  const dispatch = useDispatch();

  const addModules = () => {
    dispatch(showModal(<AddModules />));
  };
  // const [subModule, setSubModule] = useState([]);
  // const [isSubSubModule, setIsSubSubModule] = useState([]);
  useEffect(() => {
    UserSettingControllers.getModules()
      .then((res) => {
        console.log(res);
        const module = res.data.data.data;
        console.log("module", module);
        const subModule = module
          .map((i) => (i._id !== undefined ? "" : i))
          .filter((item) => console.log("item", item));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div>
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Typography fontSize={20} fontWeight={600}>
          Modules
        </Typography>
        <Button
          sx={{
            border: "1px solid #000",
            backgroundColor: "#000",
            color: "#fff",
            ":hover": {
              color: "#000",
            },
          }}
          endIcon={<Add />}
          onClick={addModules}
        >
          Add Modules
        </Button>
      </Stack>
      <Card sx={{ mt: 2, p: 2 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#eee" }}>
              {tableHeader.map((val, i) => (
                <TableCell key={i}>
                  <Typography fontSize={14} fontFamily={roboto.style}>
                    {val.label}
                  </Typography>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
        </Table>
      </Card>
    </div>
  );
};

export default Modules;
