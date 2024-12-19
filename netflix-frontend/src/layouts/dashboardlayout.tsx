import React, { ReactNode, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Tabs,
  Tab,
  Avatar,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SettingsIcon from "@mui/icons-material/Settings";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import dasboardlayoutimg from "src/assets/netflixbghome.jpg";
import netflixlogo from "src/assets/netflixlogo.png";
import { AnimeView } from "src/sections/anime/view";
import { MovieView } from "src/sections/content/view";

interface DashboardLayoutProps {
  children?: ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = () => {
  const [activetab, setactivetab] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(false); // State to control drawer

  const handletabchange = (_: React.SyntheticEvent, newvalue: number) => {
    setactivetab(newvalue);
  };

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  const handleAccountSettings = () => {
    console.log("Navigating to Account Settings...");
    // Add navigation logic here
  };

  const handleLogout = () => {
    console.log("Logging out...");
    // Add logout logic here
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
          display: {
            xs: "none",
            lg: "block",
          },
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          width: {
            lg: "200px",
          },
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
        <Box
          sx={{
            ml: 4,
            mt: 4,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography variant="h6" sx={{ mt: 2 }}>
            Home
          </Typography>
          <Typography variant="h6" sx={{ mt: 2 }}>
            Trending
          </Typography>
          <Typography variant="h6" sx={{ mt: 2 }}>
            Playlist
          </Typography>
          <Typography variant="h6" sx={{ mt: 2 }}>
            Following
          </Typography>
        </Box>

        <Divider sx={{ my: 3, borderColor: "rgba(255, 255, 255, 0.2)" }} />

        <Typography variant="h6">Accounts</Typography>
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
          marginLeft: {
            lg: "200px",
          },
        }}
      >
        {/* Tabs Section */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mb: 3,
            alignItems: "center",
          }}
        >
          <IconButton
            color="inherit"
            onClick={toggleDrawer(true)}
            sx={{
              display: {
                xs: "block",
                lg: "none",
              },
            }}
          >
            <MenuIcon sx={{ fontSize: "24px" }} />
          </IconButton>
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
          <Box
            sx={{
              display: {
                xs: "none",
                lg: "flex",
              },
              gap: 2,
            }}
          >
            <Button variant="contained" color="primary">
              Upgrade
            </Button>
          </Box>
        </Box>

        {/* Drawer */}
        <Drawer
          anchor="left"
          open={drawerOpen}
          onClose={toggleDrawer(false)}
        >
          <Box
            sx={{
              width: 250,
              padding: 2,
            }}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
          >
            <List>
              <ListItem 
              component="button" onClick={handleAccountSettings}>
                <ListItemIcon>
                  <SettingsIcon />
                </ListItemIcon>
                <ListItemText primary="Account Settings" />
              </ListItem>
              <ListItem component="button" onClick={handleLogout}>
                <ListItemIcon>
                  <ExitToAppIcon />
                </ListItemIcon>
                <ListItemText primary="Logout" />
              </ListItem>
            </List>
          </Box>
        </Drawer>

        {/* Tab Content */}
        {activetab === 0 && <MovieView />}
        {activetab === 2 && <AnimeView />}
      </Box>
    </Box>
  );
};
