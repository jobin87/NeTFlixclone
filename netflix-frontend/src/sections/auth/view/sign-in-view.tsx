import { Box, TextField, Button, Typography } from "@mui/material";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import leftimage from "src/assets/hero.png";
import xsbackground from "src/assets/hero.png";
import { ENDPOINT_USER_LOGIN, makeNetworkCall } from "src/network";
import { paths } from "src/routes/paths";

export const SignInView = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }
    setLoading(true);

    try {
      const response = await makeNetworkCall({
        method: "POST",
        url: ENDPOINT_USER_LOGIN,
        data: { email, password },
      });
      if (response?.data?.success && response?.data?.token) {
        localStorage.setItem("token", response.data.token);

        toast.success("Sign-in successful");
        navigate(paths.dashboard.home);
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
        alignItems: "center",
        backgroundImage: `url(${leftimage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundColor: "rgba(0, 0, 0, 0.6)", // Optional: for a semi-transparent overlay
        backgroundBlendMode: "overlay", // Optional: blend background color and image
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: 300,
          p: 4,
          bgcolor: "rgba(255, 255, 255, 0.9)", // Semi-transparent white background
          borderRadius: 2,
          boxShadow: 3,
          textAlign: "center",
          pb:8
        }}
      >
        <Typography variant="h4" gutterBottom>
          Sign In
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Full Name"
            variant="outlined"
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            fullWidth
            label="Email"
            type="email"
            variant="outlined"
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            variant="outlined"
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            disabled={loading}
          >
            {loading ? "Signing In..." : "Sign In"}
          </Button>
        </form>
      </Box>
    </Box>
  );
};
