import React, { ReactNode, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Tabs,
  Tab,
  Avatar,
  Divider,
} from "@mui/material";
import dasboardlayoutimg from "src/assets/netflixbghome.jpg";
import netflixlogo from "src/assets/netflixlogo.png";
import { AnimeView } from "src/sections/anime/view";
import { MovieView } from "src/sections/movies/view";
interface DashboardLayoutProps {
  children?: ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = () => {
  const [activetab, setactivetab] = useState(0);

  const handletabchange = (_: React.SyntheticEvent, newvalue: number) => {
    setactivetab(newvalue);
  };

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
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          width: "200px",  // Fixed width for sidebar
          minHeight: "100vh",
          padding: "20px",
          position: "fixed",  // Keep the sidebar fixed
          top: 0,  // Align it to the top
          left: 0,  // Align it to the left
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
        <Box sx={{ ml: 4, mt: 4 }}>
          <Typography variant="h6" sx={{ mt: 2 }}>
            Home
          </Typography>
          <Typography variant="h6" sx={{ mt: 2 }}>
            Trending
          </Typography>
          <Typography variant="h6" sx={{ mt: 2 }}>
            Following
          </Typography>
          <Typography variant="h6" sx={{ mt: 2 }}>
            Your Videos
          </Typography>
          <Typography variant="h6" sx={{ mt: 2 }}>
            Playlist
          </Typography>
        </Box>

        <Divider sx={{ my: 3, borderColor: "rgba(255, 255, 255, 0.2)" }} />

        <Typography variant="h6">Following</Typography>
        <Box sx={{ display: "flex", alignItems: "center", mt: 2, gap: 2 }}>
          <Avatar>A</Avatar>
          <Typography>Alex Smith</Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", mt: 2, gap: 2 }}>
          <Avatar>A</Avatar>
          <Typography>Angelina Lie</Typography>
        </Box>
      </Box>

      {/* Main Content */}
      <Box
        sx={{
          flexGrow: 1,
          overflowY: "auto",
          padding: "20px",
          marginLeft: "200px",  // Offset the content to the right, so it doesn't overlap the sidebar
        }}
      >
        {/* Tabs Section */}
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
          <Tabs
            value={activetab}
            onChange={handletabchange}
            textColor="inherit"
            indicatorColor="secondary"
            sx={{ "& .MuiTabs-flexContainer": { gap: 4 } }}
          >
            <Tab label="Movie" />
            <Tab label="TV Show" />
            <Tab label="Anime" />
          </Tabs>

          <Button variant="contained" color="primary">
            Upgrade
          </Button>
        </Box>
        {activetab === 0 && <MovieView />}
        {activetab === 2 && <AnimeView />}
      </Box>
    </Box>
  );
};
