import {
  Box,
  Divider,
  Drawer,
  IconButton,
  Typography,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import FileDownloadIcon from "@mui/icons-material/CloudDownload";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import {  useState } from "react";
import { useAppSelector } from "src/store";
import { useNavigate } from "react-router-dom";
import { paths } from "src/routes/paths";
import { setLogged } from "src/store/app/appReducer";

export const BottomIconsLayout: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const user = useAppSelector((state) => state.app.auth?.data?.user);

  const navigate = useNavigate()

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };
  const handlelogout =()=>{
    setLogged(true)
    navigate(paths.auth.loadingPage)

  }

  return (
    <Box>
      {/* Bottom Navigation Bar */}
      <Box
        sx={{
          display: { xs: "flex", lg: "none" },
          position: "fixed",
          bottom: 0,
          left: 0,
          width: "100%",
          bgcolor: "rgba(0, 0, 0, 0.7)",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <IconButton color="inherit">
          <HomeIcon sx={{ fontSize: 40 }} />
        </IconButton>
        <IconButton color="inherit">
          <SearchIcon sx={{ fontSize: 40 }} />
        </IconButton>
        <IconButton color="inherit">
          <FileDownloadIcon sx={{ fontSize: 40 }} />
        </IconButton>
        <IconButton color="inherit" onClick={toggleDrawer(true)}>
          <AccountCircleIcon sx={{ fontSize: 40 }} />
        </IconButton>
      </Box>

      {/* Profile Drawer */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        sx={{
          "& .MuiDrawer-paper": {
            bgcolor: "rgba(0, 0, 0, 0.8)",
            color: "white",
            width: 250,
          },
        }}
      >
        <Box sx={{ padding: 2 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Profile :
          </Typography>
          <Box>
            <Typography>name: {user.username}</Typography>
            <Typography>email: {user.email}</Typography>

          </Box>
          <Divider sx={{ borderColor: "rgba(255, 255, 255, 0.2)" }} />
          <Box sx={{ mt: 3 }}>
            <Typography sx={{ cursor: "pointer", mb: 2 }}>
              Account Settings
            </Typography>
            <Typography sx={{ cursor: "pointer", mb: 2 }}>
              My Downloads
            </Typography>
            <Typography sx={{ cursor: "pointer", mb: 2 }}>Help</Typography>
          </Box>
          <Divider sx={{ borderColor: "rgba(255, 255, 255, 0.2)", my: 2 }} />
          <Box
            sx={{ display: "flex", alignItems: "center", cursor: "pointer",  }}
            onClick={handlelogout}
          >
            <LogoutIcon sx={{ mr: 1 }} />
            <Typography>Logout</Typography>
          </Box>
        </Box>
      </Drawer>
    </Box>
  );
};
