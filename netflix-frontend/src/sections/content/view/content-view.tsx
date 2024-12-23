import React, { useState } from "react";
import { Tabs, Tab, Box,ListItemIcon, Menu, MenuItem, IconButton } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SettingsIcon from "@mui/icons-material/Settings";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { useAppDispatch, useAppSelector } from "src/store";
import { Movie } from "src/sections/content/movie";
import { Series } from "src/sections/content/series";
import { DashboardLayout } from "src/layouts/dashboardlayout";
import { Anime } from "../anime";
import { setLoading } from "src/store/app/appReducer";
import { API_METHODS, ENDPOINT_USER_LOGOUT, makeNetworkCall } from "src/network";
import { requestSignOut } from "src/store/app/appThunk";
import { useNavigate } from "react-router-dom";
import { paths } from "src/routes/paths";

function TabPanel(props: { children?: React.ReactNode; value: number; index: number }) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

export const ContentView = () => {
  const { movies, series, anime } = useAppSelector((state) => state.movie.data);
  const [selectedTab, setSelectedTab] = useState(0);
  const dispatch= useAppDispatch()
  const navigate = useNavigate()

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  // Drawer state
 

  const handleLogout = async () => {
        try {
          dispatch(setLoading(true));
          const response = await makeNetworkCall({
            method: API_METHODS.POST,
            url: ENDPOINT_USER_LOGOUT,
          });
          if (response?.data?.LoggedOut) {
            console.log("yes")
            dispatch(requestSignOut())
            console.log("Navigating to sign-in page...");
            navigate(paths.auth.signIn);
            console.log("Navigation executed.");

            
          }
        } catch (error) {
          console.error("Logout failed:", error);
        } finally {
          dispatch(setLoading(false));
        }
      };

  // Menu state
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
  };

  return (
    <DashboardLayout>
      <Box sx={{ display:"flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
        <Box sx={{
          display:{
            xs:"block",
            lg:"none"
          }
        }}>
          {/* Kebab Menu */}
        <IconButton onClick={handleMenuOpen}>
          <MoreVertIcon />
        </IconButton>
        <Menu
          anchorEl={menuAnchor}
          open={Boolean(menuAnchor)}
          onClose={handleMenuClose}
        >
          <MenuItem >
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            Account Settings
          </MenuItem>
          <MenuItem onClick={handleLogout}>
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>
        </Box>
        {/* Tabs */}
        <Box>
          <Tabs
            value={selectedTab}
            onChange={handleTabChange}
            aria-label="content tabs"
            sx={{ borderBottom: 1, borderColor: "divider" }}
          >
            <Tab label="Movies" />
            <Tab label="Series" />
            <Tab label="Anime" />
            <Tab label="TV Shows" />
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
