import { Box, Typography } from "@mui/material";
import { ReactNode } from "react";
import dasboardlayoutimg from "src/assets/netflixbghome.jpg";

interface DashboardLayoutProps {
    children: ReactNode;
  }

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <Box
      sx={{
        display: "flex",
        minWidth: "100vw",
        height: "100vh",
        backgroundImage: `url(${dasboardlayoutimg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: "white",
        // Debugging styles to help check if the image is loaded
        backgroundColor: "black",  // fallback color to check the layout if the image isn't loaded
      }}
    >
      <Box 
      sx={{
        display:"flex",
        justifyContent:"space-between",
      }}
      >
      {/* leftSidebar */}
      <Box
        sx={{
          backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
          width: "200px",
          minHeight: "100vh",
          padding: "20px", 
        }}
      >
        <Typography variant="h6" color="white" gutterBottom>
          Search
        </Typography>
        <Typography variant="h6" color="white" gutterBottom>
          Home
        </Typography>
        <Typography variant="h6" color="white" gutterBottom>
          Trending
        </Typography>
        <Typography variant="h6" color="white" gutterBottom>
          Your Videos
        </Typography>
      </Box>

      {/* rightsidebar */}
      <Box 
      sx={{
        backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
        width: "20px",
        minHeight: "100vh",
        padding: "20px", 
      }}>
        


      </Box>
      </Box>
      

      {/* <Box
        sx={{
          flexGrow: 1,
          padding: "20px",
          backgroundColor: "#f4f4f4", 
        }}
      >
        <Typography variant="h4" gutterBottom>
          Dashboard Content
        </Typography>
      {children}
      </Box>  */}
      
    </Box>
  );
};
