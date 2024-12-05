import {
    Box,
    Button,
    TextField,
    Typography,
  } from "@mui/material";
  import movieBg from "src/assets/hero.png";
  // import moviebg2 from "../../assets/kids.png";
  import strangerthings1 from "src/assets/stranger-things-lg.png";
  import netflicon from "src/assets/netflixlogo.png";
  import tv from "src/assets/tv.png";
  
  import { useState } from "react";
  import "src/globalcss.css";
import { paths } from "src/routes/paths";
import { useNavigate } from "react-router-dom";
  
  const SignInView = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate()

  
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
          width: "100%",
        }}
      >
        {/* Hero Section */}
        <Box
          sx={{
            height: { xs: "100vh", lg: "100vh" },
            width:{
                xs:"auto",

            },
            display: "flex",
            flexDirection: "column",
            backgroundImage: `url(${movieBg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            color: "white",

          }}
        >
          {/* Logo and Sign In Button */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              p: 2,
            }}
          >
            <Box
              component="img"
              src={netflicon}
              alt="Netflix Logo"
              sx={{
                width: { xs: "120px", sm: "160px" },
                height: "auto",
              }}
            />
            <Button
              variant="contained"
              color="error"
              sx={{
                fontSize: { xs: "0.8rem", sm: "1rem" },
              }}
              onClick={()=>navigate(paths.auth.signUp)}
            >
              Sign In
            </Button>
          </Box>
      
          {/* Hero Text */}
          <Box
            sx={{
              textAlign: "center",
              mt: { xs: "18rem", sm: "6rem" },
              px: 2,
            }}
          >
            <Typography
              variant="h4"
              component="h1"
              fontWeight="bold"
              sx={{ fontSize: { xs: "1.5rem", sm: "2.5rem" } }}
            >
              Unlimited movies, TV shows, and more.
            </Typography>
          </Box>
          <Box sx={{
            display:"flex",
            justifyContent:"center"

          }}>
          <TextField
            sx={{
                bgcolor:"white",
                width:{
                    xs:"80%",
                    lg:"60%"
                }
            }}
             type="email"
             variant="outlined"
             fullWidth
             required
             placeholder="email"
            />
            <Button sx={{
                bgcolor:"red",
                color:"white",
                ml:"1rem"
            }}>Get started</Button>
          </Box>
        </Box>
      
        {/* TV Section */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "black",
            color: "white",
            p: 3,
          }}
        >
          <Box sx={{ maxWidth: "500px", textAlign: { xs: "center", sm: "left" } }}>
            <Typography
              variant="h5"
              fontWeight="bold"
              sx={{ fontSize: { xs: "1.2rem", sm: "1.5rem" }, mb: 2 }}
            >
              Enjoy on your TV
            </Typography>
            <Typography
              variant="body1"
              sx={{ fontSize: { xs: "0.9rem", sm: "1rem" } }}
            >
              Watch on Smart TVs, PlayStation, Xbox, Chromecast, Apple TV, Blu-ray
              players, and more.
            </Typography>
          </Box>
          <Box
            component="img"
            src={tv}
            alt="TV"
            sx={{
              width: { xs: "80%", sm: "50%" },
              mt: { xs: 2, sm: 0 },
            }}
          />
        </Box>
      
        {/* Download Section */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "black",
            color: "white",
            p: 3,
          }}
        >
          <Box
            component="img"
            src={strangerthings1}
            alt="Download shows"
            sx={{
              width: { xs: "80%", sm: "50%" },
              mb: { xs: 2, sm: 0 },
            }}
          />
          <Box sx={{ maxWidth: "500px", textAlign: { xs: "center", sm: "left" } }}>
            <Typography
              variant="h5"
              fontWeight="bold"
              sx={{ fontSize: { xs: "1.2rem", sm: "1.5rem" }, mb: 2 }}
            >
              Download your shows to watch offline
            </Typography>
            <Typography
              variant="body1"
              sx={{ fontSize: { xs: "0.9rem", sm: "1rem" } }}
            >
              Save your favorites easily and always have something to watch.
            </Typography>
          </Box>
        </Box>
      </Box>
      
    );
  };
  
  export default SignInView;
  