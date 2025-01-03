import React, { ReactNode } from "react";
import { Box, Typography, Avatar, Divider} from "@mui/material";

import netflixlogo from "src/assets/netflixlogo.png";

import LogoutIcon from "@mui/icons-material/Logout";
import { BottomIconsLayout } from "./bottomiconslayout";

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
            backgroundImage: `url(${netflixlogo})`,
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
        <Box sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
          <LogoutIcon
            sx={{
              fontSize: "24px", // Adjust icon size
              color: "primary.main", // Optional: Use theme color
              mt: 16,
            }}
          />
         
        <Typography variant="h6" sx={{ mt: 16, ml: 1 }}>
            Sign Out
          </Typography>
        </Box>
      </Box>
      {/* Main Content */}
      <Box
        sx={{
          flexGrow: 1,
          bgcolor: "#800000",
          width: "40vw",
          ml: {
            xs: 0,
            lg: "200px",
          },
        }}
      >
        {children}
        {/* This will render the content passed to the DashboardLayout */}
      </Box>
      <BottomIconsLayout/>
      
    </Box>
  );
};
