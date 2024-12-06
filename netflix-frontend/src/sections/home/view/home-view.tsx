import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { DashboardLayout } from 'src/layouts/dashboardlayout';

const HomePage = () => {
  return (
    <DashboardLayout>
      {/* Featured Content */}
      <Box sx={{ marginBottom: 4 }}>
        <Typography variant="h4">Featured Show</Typography>
        <Button variant="contained" color="primary" sx={{ marginTop: 2 }}>
          Play
        </Button>
      </Box>

      {/* Rows of Movies */}
      {[...Array(5)].map((_, rowIdx) => (
        <Box key={rowIdx} sx={{ marginBottom: 4 }}>
          <Typography variant="h6" sx={{ marginBottom: 2 }}>Category {rowIdx + 1}</Typography>
          <Box sx={{ display: 'flex', gap: 2, overflowX: 'scroll' }}>
            {[...Array(10)].map((_, movieIdx) => (
              <Box
                key={movieIdx}
                sx={{
                  width: 150,
                  height: 200,
                  backgroundColor: '#333',
                  borderRadius: 1,
                }}
              />
            ))}
          </Box>
        </Box>
      ))}
    </DashboardLayout>
  );
};

export default HomePage;
