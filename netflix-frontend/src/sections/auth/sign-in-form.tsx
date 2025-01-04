import { Box, TextField, Button, Typography } from "@mui/material";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import leftimage from "src/assets/hero.png";
import { ENDPOINT_USER_LOGIN, makeNetworkCall } from "src/network";
import { paths } from "src/routes/paths";

export const SignInForm = () => {
  const navigate = useNavigate();
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
        const userData = response.data.users; // Assuming `users` object contains the username
        if (userData?.username) {
          toast.success(`Welcome, ${userData.username}!`);
          localStorage.setItem("username", userData.username); // Store username if needed
        }

        localStorage.setItem("token", response.data.token);
        navigate(paths.dashboard.home);
      } else {
        toast.error(response?.data?.message || "Login failed");
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
        display: "flex",
        height: "100vh",
      }}
    >
      {/* Left Side (Image) */}
      <Box
        sx={{
          flex: 1,
          backgroundImage: `url(${leftimage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></Box>

      {/* Right Side (Sign-In Form) */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          px: 4,
        }}
      >
        <Typography variant="h4" gutterBottom>
          Sign in to your account
        </Typography>
        <form
          style={{
            width: "100%",
            maxWidth: "400px",
          }}
          onSubmit={handleSubmit}
        >
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
