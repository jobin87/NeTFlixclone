// src/components/Movie.tsx
import { Box, Button, Card, CardContent, CardMedia, Typography } from '@mui/material';

interface MovieProps {
  movies: Array<any>; // Define the proper type for movie objects if possible
}

export const Anime = ({ movies }: MovieProps) => {
  return (
    <Box>
      {/* Featured Section */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          gap: 4,
          mb: 4,
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          borderRadius: '12px',
          p: 3,
        }}
      >
        {movies.length > 0 && (
          <Box sx={{ flex: 0.5 }}>
            {/* Use the first movie's Poster or fallback if not available */}
            <img
              src={movies[0].Poster || 'https://via.placeholder.com/300x450'} // Fallback image if Poster is missing
              alt={movies[0].Title || 'Featured Movie'} // Use movie Title or a generic fallback
              style={{ width: '100%', borderRadius: '12px' }}
            />
          </Box>
        )}
        {movies.length > 0 && (
          <Box sx={{ flex: 3 }}>
            {/* Use the first movie's Title and Plot, or fallback if not available */}
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              {movies[0].Title || 'No title available'}
            </Typography>
            <Typography variant="body1" gutterBottom>
              {movies[0].Plot || 'No plot available'}
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
              <Button variant="contained" color="primary">
                Watch Now
              </Button>
              <Button variant="outlined" color="secondary">
                Follow
              </Button>
            </Box>
          </Box>
        )}
      </Box>

      {/* Popular Movies - Horizontal Scroll */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          Movies
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
          {movies.length > 0 ? (
            movies.map((movie, index) => (
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
                    image={movie.Poster || 'https://via.placeholder.com/200x300'}
                    alt={movie.Title}
                    sx={{ height: 180 }}
                  />
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {movie.Title || 'No title available'}
                    </Typography>
                    <Typography variant="body2">{movie.Genre || 'Genre'}</Typography>
                  </CardContent>
                </Card>
              </Box>
            ))
          ) : (
            <Typography>No movies available to display.</Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
};
