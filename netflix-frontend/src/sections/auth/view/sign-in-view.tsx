import { Box, TextField, Button, Typography, FormControlLabel, Checkbox } from "@mui/material";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import leftimage from "src/assets/hero.png";
import { paths } from "src/routes/paths";
import { useAppDispatch} from "src/store";
import { setLogged } from "src/store/app/appReducer";
import { requestSignInWithPassword } from "src/store/app/appThunk";

export const SignInView = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
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
      alignItems: "center",
      backgroundImage: `url(${leftimage})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundBlendMode: "overlay",
      backgroundColor: "rgba(0, 0, 0, 0.6)",
      p: 2,
    }}
  >
    <Box
      sx={{
        width: "100%",
        maxWidth: 400,
        p: 4,
        borderRadius: 4,
        textAlign: "center",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        background: "rgba(56, 53, 53, 0.15)",
        border: "1px solid rgba(255, 255, 255, 0.18)",
        boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
        color: "white",
      }}
    >
      <Typography variant="h4" color="white" gutterBottom>
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
          InputLabelProps={{ style: { color: "#fff" } }}
          InputProps={{
            style: { color: "#fff" },
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "rgba(255, 255, 255, 0.4)" },
              "&:hover fieldset": { borderColor: "#fff" },
              "&.Mui-focused fieldset": { borderColor: "#90caf9" },
            },
          }}
        />
  
        <TextField
          fullWidth
          label="Email"
          type="email"
          variant="outlined"
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          InputLabelProps={{ style: { color: "#fff" } }}
          InputProps={{
            style: { color: "#fff" },
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "rgba(255, 255, 255, 0.4)" },
              "&:hover fieldset": { borderColor: "#fff" },
              "&.Mui-focused fieldset": { borderColor: "#90caf9" },
            },
          }}
        />
  
        <TextField
          fullWidth
          label="Password"
          type="password"
          variant="outlined"
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          InputLabelProps={{ style: { color: "#fff" } }}
          InputProps={{
            style: { color: "#fff" },
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "rgba(255, 255, 255, 0.4)" },
              "&:hover fieldset": { borderColor: "#fff" },
              "&.Mui-focused fieldset": { borderColor: "#90caf9" },
            },
          }}
        />
  
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mt: 1,
            color: "white",
          }}
        >
          <FormControlLabel
            control={<Checkbox color="primary" />}
            label="Remember me"
            sx={{
              "& .MuiTypography-root": { color: "white" },
            }}
          />
          <Typography variant="body2" sx={{ cursor: "pointer" }}>
            Need help?
          </Typography>
        </Box>
  
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="error"
          sx={{
            mt: 3,
            height: 50,
            borderRadius: 3,
          }}
          disabled={loading}
        >
          {loading ? "Signing In..." : "Sign In"}
        </Button>
      </form>
  
      <Box sx={{ mt: 3 }}>
        <Typography variant="body2" color="white">
          First time here?{" "}
          <Link to={paths.auth.signUp} style={{ color: "#90caf9", textDecoration: "underline" }}>
            Sign up
          </Link>
        </Typography>
      </Box>
    </Box>
  </Box>
  )}
  
