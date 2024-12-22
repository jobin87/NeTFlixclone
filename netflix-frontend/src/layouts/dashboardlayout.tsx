
import React, { ReactNode } from "react";
import {
  Box,
  Typography,
  Avatar,
  Divider,

} from "@mui/material";

import dasboardlayoutimg from "src/assets/netflixbghome.jpg";
import netflixlogo from "src/assets/netflixlogo.png";


interface DashboardLayoutProps {
  children?: ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps>=({ children }) => {

 
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        width: "100vw",
        height: "100vh",
        backgroundImage: `url(${dasboardlayoutimg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: "white",
        overflow: "hidden",
      }}
    >
      {/* Left Sidebar */}
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
            height: "40px",
            backgroundImage: `url(${netflixlogo})`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        ></Box>
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
          overflowY: "auto",
          padding: "20px",
          marginLeft: { lg: "200px" },
        }}
      >
         {children}
      </Box>
    </Box>
  );
};
