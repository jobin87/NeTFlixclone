import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  InputBase,
  Link,
  Typography,
} from "@mui/material";
import movieBg from "../../assets/netfliximg.jpeg";
import { useState } from "react";

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
      height: "200vh",
      margin: "0",
      display: "flex",
      flexDirection:"column",
      backgroundPosition: "center",
    }} >
      <Box
      sx={{
        height: "100vh", // Full viewport height
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "#fff",
        backgroundImage: `url(${movieBg})`,
        backgroundSize: "cover", // Cover the entire screen
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Box
        sx={{
          width: "100%",
          background: "rgba(0,0,0,0.75)", // Transparent dark background for the form
          maxWidth: "400px",
          minHeight: "70vh", // Max width of the form
          mt:"10%",
          boxSizing: "border-box", // Make sure padding is included in width
        }}
      >
        <Typography variant="h2" mb={3} fontSize="1.25rem" textAlign="center">
          Sign In
        </Typography>
        <Box component="form" sx={{ color: "#fff" }} onSubmit={submitHandle}>
          <InputBase
            required
            placeholder="Email address"
            type="email"
            fullWidth
            sx={{
              mb: 2,
              padding: "10px",
              background: "#fff",
              fontSize: "15px",
            }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <InputBase
            required
            placeholder="Password"
            type="password"
            fullWidth
            sx={{
              mb: 1,
              padding: "10px",
              background: "#fff",
              fontSize: "15px",
            }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label="Remember me"
            sx={{ color: "#fff" }}
          />
          <Button variant="contained" fullWidth sx={{ mt: 2 }} type="submit">
            Sign In
          </Button>
          <Box>
            <Typography fontWeight={300} mt={2}>
              <Link href="#" underline="hover" sx={{ color: "#fff" }}>
                Forgot Password
              </Link>
            </Typography>
            <Typography fontWeight={300} mt={2}>
              <Link href="#" underline="hover" sx={{ color: "#fff" }}>
                Don't have an account? Sign up
              </Link>
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
    <Box
      sx={{
        // Global styles for full page
        height: "100vh", // Full viewport height
        margin: 0, // Remove default margin
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "#fff",
        bgcolor:"black",
        backgroundSize: "cover", // Cover the entire screen
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
    </Box>
    </Box>
  );
};

export default Login;
