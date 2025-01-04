import { Box, TextField, Button, Typography, FormControlLabel, Checkbox } from "@mui/material";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import leftimage from "src/assets/hero.png";
import { ENDPOINT_USER_LOGIN, makeNetworkCall } from "src/network";
import { paths } from "src/routes/paths";
import { useAppDispatch, useAppSelector } from "src/store";
import { setLogged } from "src/store/app/appReducer";
import { requestSignInWithPassword } from "src/store/app/appThunk";
import { SignInParams, SignInResponse } from "src/store/app/types";

export const SignInView = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [token, settoken] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }
    setLoading(true);

    try {
      const credentials = {
        username, // Add a username if required or remove if not needed
        email,
        password,
        token,
      };
     const response = await dispatch(requestSignInWithPassword(credentials))
     if(response.payload?.success){
      const username = response.payload.user.username
      console.log(username)
      setLogged(true)
      navigate(paths.dashboard.home)
     }
    } catch (err) {
      toast.error("Sign-in failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        color: "white",
        alignItems: "center",
        backgroundImage: `url(${leftimage})`,
        backgroundSize: "cover",
        backgroundColor: "rgba(0, 0, 0, 0.6)", // Optional: for a semi-transparent overlay
        backgroundBlendMode: "overlay", // Optional: blend background color and image
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: {
            xs: "98vw",
            lg: 400,
          },
          p: 4,
          bgcolor: "rgba(24, 21, 21, 0.9)", // Semi-transparent white background
          borderRadius: 7,
          boxShadow: 3,
          pb: {
            xs: 13,
            lg: 8,
          },
          mt: {
            xs: 30,
            lg:8
          },
        }}
      >
        <Typography variant="h4" gutterBottom>
          Sign In
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            sx={{
              input: {
                color: "white",
              },
              label: {
                color: "white",
              },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "white", // Change the border color to white if you want
                },
                "&:hover fieldset": {
                  borderColor: "white", // Change the border color on hover if needed
                },
              },
            }}
            fullWidth
            label="Full Name"
            variant="outlined"
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            sx={{
              input: {
                color: "white",
              },
              label: {
                color: "white",
              },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "white", // Change the border color to white if you want
                },
                "&:hover fieldset": {
                  borderColor: "white", // Change the border color on hover if needed
                },
              },
            }}
            fullWidth
            label="Email"
            type="email"
            variant="outlined"
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            sx={{
              input: {
                color: "white",
              },
              label: {
                color: "white",
              },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "white", // Change the border color to white if you want
                },
                "&:hover fieldset": {
                  borderColor: "white", // Change the border color on hover if needed
                },
              },
            }}
            fullWidth
            label="Password"
            type="password"
            variant="outlined"
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Box sx={{
            display: 'flex',
            justifyContent: 'space-between',
            mt: 2
          }}>
            <FormControlLabel
            control={<Checkbox color="primary"/>}
            label="Remember me"
            sx={{margin:0}}
            />
            <Typography>
              need help
            </Typography>
          </Box>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="error"
            sx={{
              mt: {
                xs: 5,
                lg: 4
              },
              height: {
                xs: 65,
                lg: 50,
              },
              borderRadius: 4,
            }}
            disabled={loading}
          >
            {loading ? "Signing In..." : "Sign In"}
          </Button>
        </form>
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mt:{
            xs: 2,
            lg: 0
          }
        }}>
        <Typography>
          First time here?{" "}
          <Link
            to="/sign-up"
            color="primary"
          >
            Sign up
          </Link>
        </Typography>
        </Box>
      </Box>
    </Box>
  );
};
