import Modules from "@/components/modules";
import TabPanel from "@/components/tabpanel";
import { Card, Grid, Tab, Tabs } from "@mui/material";
import React, { useState } from "react";

const Settings = () => {
  const [value, setValue] = useState(0);

  const handleChange = (e, newValue) => {
    setValue(newValue);
  };
  return (
    <div className="main-wrapper">
      <Grid container p={2}>
        <Grid items lg={3}>
          <Card>
            <Tabs
              orientation="vertical"
              onChange={handleChange}
              sx={{
                "& .Mui-selected": {
                  color: "#000",
                },
              }}
              value={value}
            >
              <Tab label="Modules" />
              <Tab label="Settings" />
            </Tabs>
          </Card>
        </Grid>
        <Grid items lg={9} px={3} pt={2}>
          <TabPanel value={value} index={0}>
            <Modules />
          </TabPanel>
          <TabPanel value={value} index={1}>
            new Value
          </TabPanel>
        </Grid>
      </Grid>
    </div>
  );
};

export default Settings;
