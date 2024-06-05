import { Card, Typography } from "@mui/material";
import { Roboto_Slab } from "next/font/google";
import React from "react";
import business from "@/avatar/business.png";
import Image from "next/image";
const roboto = Roboto_Slab({
  weight: "500",
  subsets: ["latin"],
});
const DashboardCard = (props) => {
  return (
    <div>
      <Card sx={{ p: 1, height: 120, display: "grid", placeItems: "center" }}>
        <Image src={props.img} width={40} />
        <Typography
          fontSize={14}
          className={roboto.className}
          my={0.5}
          textTransform={"uppercase"}
        >
          {props.label}
        </Typography>
        <Typography className={roboto.className}>{props.value}</Typography>
      </Card>
    </div>
  );
};

export default DashboardCard;
