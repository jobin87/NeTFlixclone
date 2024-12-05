import { Box, TextField, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import leftimage from "src/assets/hero.png"
import { paths } from 'src/routes/paths';

export const SignupPageView = () => {
    const navigate = useNavigate()
  return (
    <Box
      sx={{
        display: 'flex',
        height: '100vh',
      }}
    >
      {/* Left Side (Image) */}
      <Box
        sx={{
          flex: 1,
          backgroundImage: `url(${leftimage})`, // Replace with your image URL
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      ></Box>

      {/* Right Side (Signup Form) */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          px: 4,
        }}
      >
        <Typography variant="h4" gutterBottom>
          Create an Account
        </Typography>
        <form
          style={{
            width: '100%',
            maxWidth: '400px',
          }}
        >
          <TextField
            fullWidth
            label="Full Name"
            variant="outlined"
            margin="normal"
          />
          <TextField
            fullWidth
            label="Email"
            type="email"
            variant="outlined"
            margin="normal"
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            variant="outlined"
            margin="normal"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            onClick={()=>navigate(paths.dashboard.home)}
          >
            Sign In
          </Button>
        </form>
      </Box>
    </Box>
  );
};

