import  {  useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import movieBg from "src/assets/hero.png";
import netflicon from "src/assets/netflixlogo.png";
import { useNavigate } from "react-router-dom";
import { paths } from "src/routes/paths";
import "src/globalcss.css";
import { useAppDispatch } from "src/store";
import tv from "src/assets/tv.png";
import strangerthings1 from "src/assets/stranger-things-lg.png";
import { checkEmailExist } from "src/store/app/appThunk";
import toast from "react-hot-toast";
const LoadingView = () => {
  const [email, setEmail] = useState("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleCheckEmail = async()=>{
    const response = await dispatch(checkEmailExist(email))
    if(response.payload.success===true){
      navigate(paths.auth.signUp)
    }
    else{
      toast.error("user exist with email")
    }
  }

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
          position: "relative",
          height: { xs: "100vh", lg: "100vh" },
          width: "100%",
          backgroundImage: `url(${movieBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          color: "white",
        }}
      >
        {/* Overlay */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent black overlay
            zIndex: 1,
          }}
        />

        {/* Content */}
        <Box
          sx={{
            position: "relative",
            zIndex: 2,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "100%",
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
              onClick={() => navigate(paths.auth.signIn)}
            >
              Sign In
            </Button>
          </Box>

          {/* Hero Text */}
          <Box
            sx={{
              mb: { xs: 60, lg: 30 },
            }}
          >
            <Box
              sx={{
                height: "40%",
                textAlign: "center",
                mb: 1,
              }}
            >
              <Typography
                variant="h4"
                component="h1"
                fontWeight="bold"
                sx={{ fontSize: { xs: "1.1rem", sm: "2.5rem" } }}
              >
                Unlimited movies, TV shows, and more.
              </Typography>
            </Box>

            {/* Email Input and Button */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                m: { xs: 1.4, lg: 0 },
              }}
            >
              <TextField
                sx={{
                  bgcolor: "white",
                  width: {
                    xs: "80%",
                    lg: "60%",
                  },
                }}
                type="email"
                variant="outlined"
                fullWidth
                required
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Button
              onClick={handleCheckEmail}
                sx={{
                  bgcolor: "red",
                  color: "white",
                  ml: "1rem",
                }}
              >
                Get Started
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Other Sections */}
      {/* Add your other sections here, like the TV and Download sections */}
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
            sx={{ fontSize: { xs: "1.2rem", sm: "1.5rem" }}}
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

export default LoadingView;
