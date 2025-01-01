import React, { ReactNode, useState } from "react";
import {
  Box,
  Typography,
  Avatar,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  Tabs,
  Tab,
} from "@mui/material";

import netflixlogo from "src/assets/netflixlogo.png";
import { useAppDispatch, useAppSelector } from "src/store";
import { useNavigate } from "react-router-dom";
import { requestSignOut } from "src/store/app/appThunk";
import { paths } from "src/routes/paths";
import { setLoading } from "src/store/app/appReducer";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import FileDownloadIcon from "@mui/icons-material/CloudDownload";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import {
  API_METHODS,
  ENDPOINT_USER_LOGOUT,
  makeNetworkCall,
} from "src/network";
import { Movie } from "src/sections/content/movie";
import { Series } from "src/sections/content/series";
import { Anime } from "src/sections/content/anime";

interface DashboardLayoutProps {
  children?: ReactNode;
}

interface TabPanelProps {
  children?: React.ReactNode;
  value: number;
  index: number;
}

const TabPanel: React.FC<TabPanelProps> = ({
  children,
  value,
  index,
  ...other
}) => {
  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </Box>
  );
};

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
}) => {
  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        width: "100vw",
        height: "100vh",
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: "white",
        overflow: "hidden",
      }}
    >
      {/* Sidebar */}
      <Box
        sx={{
          display: { xs: "none", lg: "block" },
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          width: { lg: "200px" },
          minHeight: "100vh",
          padding: "20px",
          position: "fixed",
          top: 0,
          left: 0,
        }}
      >
        <Box
          sx={{
            height: "20px",
            backgroundImage:`url(${netflixlogo})`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        />
        <Box sx={{ ml: 4, mt: 4, display: "flex", flexDirection: "column" }}>
          {["Home", "Trending", "Playlist", "Following"].map((item) => (
            <Typography key={item} variant="h6" sx={{ mt: 2 }}>
              {item}
            </Typography>
          ))}
        </Box>
        <Divider sx={{ my: 3, borderColor: "rgba(255, 255, 255, 0.2)" }} />
        <Typography variant="h6">Accounts</Typography>
        {["Alex Smith", "Angelina Lie"].map((name) => (
          <Box
            key={name}
            sx={{ display: "flex", alignItems: "center", mt: 2, gap: 2 }}
          >
            <Avatar>{name[0]}</Avatar>
            <Typography>{name}</Typography>
          </Box>
          
        ))}
      </Box>
       {/* Main Content */}
       <Box
        sx={{
          flexGrow: 1,
          bgcolor: "#800000",
          width:"40vw",
          ml:{
            xs:0,
            lg:"200px"
          }
        }}
      >
        {children} {/* This will render the content passed to the DashboardLayout */}
      </Box>
      <Box
        sx={{
          display: { xs: "flex", lg: "none" }, // Show only on xs devices
          position: "fixed", // Position it at the bottom
          bottom: 0,
          left: 0,
          width: "100%",
          bgcolor: "rgba(0, 0, 0, 0.7)", // Dark background for visibility
          justifyContent: "space-around", // Distribute items evenly
          alignItems: "center",
          
        }}
      >
        {/* Home Icon */}
        <IconButton  color="inherit">
          <HomeIcon   sx={{ fontSize: 40 }}/>
        </IconButton>

        {/* Search Icon */}
        <IconButton color="inherit">
          <SearchIcon  sx={{ fontSize: 40 }} />
        </IconButton>

        {/* Download Icon */}
        <IconButton color="inherit">
          <FileDownloadIcon  sx={{ fontSize: 40 }} />
        </IconButton>

        {/* Profile Icon */}
        <IconButton color="inherit">
          <AccountCircleIcon  sx={{ fontSize: 40 }} />
        </IconButton>
      </Box>
    </Box>
  );
};
