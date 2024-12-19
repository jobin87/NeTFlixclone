// src/components/Series.tsx
import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material';

interface SeriesProps {
  series: Array<any>; // Define the proper type for series objects if possible
}

export const Series = ({ series }: SeriesProps) => {
  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h5" gutterBottom>
        Series
      </Typography>
      <Box
        sx={{
          display: 'flex',
          overflowX: 'auto',
          whiteSpace: 'nowrap',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        }}
      >
        {series.length > 0 ? (
          series.map((seriesItem, index) => (
            <Box
              key={index}
              sx={{
                minWidth: '200px',
                marginRight: 2,
              }}
            >
              <Card sx={{ backgroundColor: 'rgba(0, 0, 0, 0.7)', color: 'white' }}>
                <CardMedia
                  component="img"
                  image={'https://via.placeholder.com/200x300'}
                  alt={seriesItem.Title}
                  sx={{ height: 180 }}
                />
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {seriesItem.Title || 'No title available'}
                  </Typography>
                  <Typography variant="body2">{seriesItem.Genre || 'Genre'}</Typography>
                </CardContent>
              </Card>
            </Box>
          ))
        ) : (
          <Typography>No series available to display.</Typography>
        )}
      </Box>
    </Box>
  );
};
