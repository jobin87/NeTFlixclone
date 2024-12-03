import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  InputBase,
  Link,
  Typography,
} from "@mui/material";
import movieBg from "../../assets/hero.png";
// import moviebg2 from "../../assets/kids.png";
import strangerthings1 from "../../assets/stranger-things-lg.png";
import netflicon from "../../assets/netflixlogo.png";
import tv from "../../assets/tv.png";

import { useState } from "react";
import "../../globalcss.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandle = (e: any) => {
    e.preventDefault();
    console.log(`Email: ${email} and Password: ${password}`);
    setEmail("");
    setPassword("");
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          height: {
            xs: "none",
            lg: "100vh",
          },
          margin: 0, // Ensure no margin on the Box
          padding: 0, // Ensure no padding
          display: "flex",
          flexDirection: "column",
          backgroundPosition: "center",
          backgroundImage: `url(${movieBg})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          top: 0,
          left: 0,
          width: "100%",
        }}
      >
        <Box sx={{
          display:"flex",
          flexDirection:"row",
          justifyContent:"space-around"
        }}>
          <Box
            component="img"
            src={netflicon}
            sx={{
              width: "17%",
              height: "11vh",
              mt:"1rem",
              mr:"40rem",
              bgcolor:"	#1c1c1c"
              
            }}
          ></Box>
          <Box sx={{
            mt:"2rem"
          }}>
          <Button variant="contained" color="error">
            Sign In
          </Button>

          </Box>

        </Box>
        <Box sx={{
          textAlign:"center",
          mt:"8rem",
          color:"white"
        }}>
        <Typography variant="h2" component="h1" fontWeight="1200" >
        Unlimited movies, TV shows, and more
        </Typography>

        </Box>
      </Box>
      <Box
        sx={{
          height: {
            xs: "none",
            lg: "100vh",
          },
          margin: 0, // Ensure no margin on the Box
          padding: 0, // Ensure no padding
          mt: ".1rem",
          mb: ".1rem",
          display: "flex",
          backgroundPosition: "center",
          bgcolor: "black",
          backgroundSize: "cover",
          color: "white",
          backgroundRepeat: "no-repeat",
          width: "100%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            mt: "2rem",
          }}
        >
          <Box
            sx={{
              mt: "5rem",
              ml: "4rem",
            }}
          >
            <Typography variant="h3" component="h3" my={6} fontWeight={500}>
              Enjoy on your TV
            </Typography>
            <Typography variant="h6" component="p" my={6} fontWeight={500}>
              Watch on Smart TVs, PlayStation, Xbox, Chromecast, Apple TV,
              Blu-ray players, and more.
            </Typography>
          </Box>

          <Box
            component="img"
            src={tv} // Path to the image
            alt="TV image"
            sx={{
              width: { xs: "50%", md: "60%" },
              height: "auto", // Keep the image aspect ratio intact
              objectFit: "contain",
              ml: "5rem",
              mr: "4rem",
            }}
          />
        </Box>
      </Box>
      <Box
        sx={{
          height: {
            xs: "none",
            lg: "80vh",
          },
          margin: 0, // Ensure no margin on the Box
          padding: 0, // Ensure no padding
          display: "flex",
          backgroundPosition: "center",
          bgcolor: "black",
          backgroundSize: "cover",
          mb: ".1rem",
          color: "white",
          backgroundRepeat: "no-repeat",
          top: 0,
          left: 0,
          width: {
            xs: "none",
            lg: "100%",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
          }}
        >
          <Box
            component="img"
            src={strangerthings1} // Path to the image
            alt="TV image"
            sx={{
              width: { xs: "50%", md: "80%" },
              height: "auto", // Keep the image aspect ratio intact
              objectFit: "contain",
              ml: "5rem",
              mr: "4rem",
            }}
          />
        </Box>
        <Box
          sx={{
            mt: "5rem",
            ml: "4rem",
          }}
        >
          <Typography variant="h3" component="h3" my={6} fontWeight={500}>
            Download your shows to watch offline
          </Typography>
          <Typography variant="h6" component="p" fontWeight={300} mt="0">
            Save your favorites easily and always have something to watch.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
