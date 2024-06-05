import { authControllers } from "@/api/auth";
import DashboardCard from "@/components/dashboardCard";
import { loginDetails } from "@/redux/reducers/userInfo";
import { Grid, Typography } from "@mui/material";
import { jwtDecode } from "jwt-decode";
import { Roboto_Slab } from "next/font/google";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import business from "@/avatar/business.png";
import merchant from "@/avatar/seller.png";
import agent from "@/avatar/agent.png";
import admin from "@/avatar/admin.png";
const roboto = Roboto_Slab({
  weight: "500",
  subsets: ["latin"],
});
const Dashboard = () => {
  const [data, setData] = useState();

  useEffect(() => {
    authControllers
      .dashboard()
      .then((res) => {
        setData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  console.log("data", data);

  const dashboardArray = [
    {
      img: business,
      label: "Total Business",
      value: data && data.business,
    },
    {
      img: merchant,
      label: "Total Merchant",
      value: data && data.merchant,
    },
    {
      img: agent,
      label: "Total agent",
      value: data && data.agent,
    },
    {
      img: admin,
      label: "Total Admin",
      value: data && data.admin,
    },
  ];
  return (
    <div className="main-wrapper">
      <Typography fontFamily={roboto.style} fontSize={20} p={3}>
        Hi,Welcome back 👋
      </Typography>
      <Grid container spacing={2}>
        {dashboardArray.map((val, i) => (
          <Grid item lg={3} key={i}>
            <DashboardCard img={val.img} label={val.label} value={val.value} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Dashboard;
