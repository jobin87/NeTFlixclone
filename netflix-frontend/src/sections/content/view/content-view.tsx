import React, { useState } from "react";
import { Tabs, Tab, Box} from "@mui/material";
import { DashboardLayout } from "src/layouts/dashboardlayout";
import { Anime } from "../anime";
import { Movie } from "../movie";
import { Series } from "../series";

// TabPanel component for each tab's content
function TabPanel(props: { children?: React.ReactNode; value: number; index: number }) {
  const { children, value, index, ...other } = props;
  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
      sx={{ padding: 2 }} // Add padding to tab panel content for better spacing
    >
      {value === index && <Box>{children}</Box>}
    </Box>
  );
}

export const ContentView = () => {
  const [selectedTab, setSelectedTab] = useState(0); // State to track selected tab

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue); // Update selected tab on tab change
  };

  // Example data for Movies, Series, and Anime
  const movies = ["Movie 1", "Movie 2", "Movie 3"];
  const series = ["Series 1", "Series 2", "Series 3"];
  const anime = ["Anime 1", "Anime 2", "Anime 3"];

  return (
    <DashboardLayout>
      {/* Tab Navigation */}
      <Box sx={{ display: "flex", flexDirection: "column", marginTop: 2 }}>
      <Box>
          <Tabs
            value={selectedTab}
            onChange={handleTabChange}
            aria-label="content tabs"
            sx={{ borderBottom: 1, borderColor: "divider", ml:{
              xs: 3,
              lg: 3
            } }}
          >
            <Tab label="Movies" />
            <Tab label="Series" />
            <Tab label="Anime" />
            <Tab label="Tv-Shows" />


          </Tabs>
        </Box>
      </Box>

      {/* Tab Panels */}
      <TabPanel value={selectedTab} index={0}>
        <Movie movies={movies} /> {/* Movies data */}
      </TabPanel>
      <TabPanel value={selectedTab} index={1}>
        <Series series={series} /> {/* Series data */}
      </TabPanel>
      <TabPanel value={selectedTab} index={2}>
        <Anime anime={anime} /> {/* Anime data */}
      </TabPanel>
    </DashboardLayout>
  );
};
