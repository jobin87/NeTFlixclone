import { Box, TextField, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import leftimage from "src/assets/hero.png";
import { paths } from "src/routes/paths";
import { useAppDispatch } from "src/store";
import { requestSignUp } from "src/store/app/appThunk";

export const SignUpView = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password || !username || !confirmPassword) {
      toast.error("Please fill in all fields");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
   
    
      const location = useLocation();
    
      useEffect(() => {
        if (location.state && location.state.email) {
          setEmail(location.state.email);
        }
      }, [location.state]);

    console.log("Location State:", location.state);


    setLoading(true);
    try {
      await dispatch(
        requestSignUp({
          username,
          email,
          password,
          confirmPassword,
        })
      ).unwrap();

      toast.success("Signup successful!");
      navigate(paths.auth.signIn);
    } catch (error: any) {
      toast.error(error?.message || "Signup failed!");
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
        backgroundColor: "rgba(0, 0, 0, 0.6)",
        backgroundBlendMode: "overlay",
        mb: 4,
        px: 2,
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: { xs: 320, sm: 400 },
          p: 4,
          borderRadius: 4,
          textAlign: "center",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          background: "rgba(56, 53, 53, 0.15)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
        }}
      >
        <Typography variant="h4" color="white" gutterBottom>
          Sign Up
        </Typography>

        <Typography variant="body2" color="white" sx={{ mb: 2 }}>
          Already have an account?{" "}
          <Box
            component="span"
            sx={{
              color: "#90caf9",
              cursor: "pointer",
              textDecoration: "underline",
            }}
            onClick={() => navigate(paths.auth.signIn)}
          >
            Sign In
          </Box>
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Full Name"
            variant="outlined"
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            InputProps={{ sx: { color: "white" } }}
            InputLabelProps={{ sx: { color: "white" } }}
          />
          <TextField
            fullWidth
            label="Email"
            type="email"
            variant="outlined"
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            InputProps={{ sx: { color: "white" } }}
            InputLabelProps={{ sx: { color: "white" } }}
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            variant="outlined"
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{ sx: { color: "white" } }}
            InputLabelProps={{ sx: { color: "white" } }}
          />
          <TextField
            fullWidth
            label="Confirm Password"
            type="password"
            variant="outlined"
            margin="normal"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            InputProps={{ sx: { color: "white" } }}
            InputLabelProps={{ sx: { color: "white" } }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            disabled={loading}
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </Button>
        </form>
      </Box>
    </Box>
  );
};
