import { Box, Button, Card, CardContent, CardMedia, Typography } from '@mui/material';

interface MovieProps {
  anime: Array<any>; // Define the proper type for movie objects if possible
}

export const Anime = ({ anime }: MovieProps) => {
  return (
    <Box>
      {/* Featured Section */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          mb: 4,
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          borderRadius: '12px',
          p: 3,
        }}
      >
        {anime.length > 0 && (
          <Box sx={{ flex: { xs: 1, sm: 0.5 ,mt:8} }}>
            <img
              src={anime[0].Poster || 'https://via.placeholder.com/300x450'} // Fallback image if Poster is missing
              alt={anime[0].Title || 'Featured Movie'} // Use movie Title or a generic fallback
              style={{ width: '100%', borderRadius: '12px' }}
            />
          </Box>
        )}
        {anime.length > 0 && (
          <Box
            sx={{
              flex: { xs: 1, sm: 3 },
              height: {
                xs: '6rem', // Adjust height for xs devices
                sm: '10rem', // Adjust for small devices if needed
              },
              padding: { xs: '1rem', sm: '2rem' },
            }}
          >
            <Typography
              variant="h5" // Use a smaller variant for xs devices
              fontWeight="bold"
              gutterBottom
              sx={{
                fontSize: {
                  xs: '1.2rem', // Adjust font size for title
                  sm: '1.5rem',
                  md: '2rem',
                },
              }}
            >
              {anime[0].Title || 'No title available'}
            </Typography>
            <Typography
              variant="body2" // Use smaller text for body
              gutterBottom
              sx={{
                fontSize: {
                  xs: '0.875rem', // Smaller font size for xs devices
                  sm: '1rem',
                },
              }}
            >
              {anime[0].Plot || 'No plot available'}
            </Typography>
            <Box
              sx={{
                display: 'flex',
                gap: 1, // Reduce gap for smaller screens
                flexDirection: { xs: 'row', sm: 'row' },
                alignItems: 'center', // Center align for vertical layout
              }}
            >
              <Button
                variant="contained"
                color="primary"
                sx={{
                  fontSize: {
                    xs: '0.75rem', // Adjust button font size
                    sm: '0.875rem',
                  },
                  padding: {
                    xs: '0.5rem 1rem', // Adjust padding for smaller buttons
                  },
                }}
              >
                Watch Now
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                sx={{
                  fontSize: {
                    xs: '0.75rem', // Adjust button font size
                    sm: '0.875rem',
                  },
                  padding: {
                    xs: '0.5rem 1rem', // Adjust padding for smaller buttons
                  },
                }}
              >
                Follow
              </Button>
            </Box>
          </Box>
        )}
      </Box>

      {/* Popular Movies - Horizontal Scroll */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          Top 10 Anime
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
          {anime.length > 0 ? (
            anime.map((animeitem, index) => (
              <Box
                key={index}
                sx={{
                  minWidth: '200px',
                  marginRight: 2,
                  flexShrink: 0, // Prevent shrinking of cards
                }}
              >
                <Card sx={{ backgroundColor: 'rgba(0, 0, 0, 0.7)', color: 'white' }}>
                  <CardMedia
                    component="img"
                    image={animeitem.Poster || 'https://via.placeholder.com/200x300'}
                    alt={animeitem.Title}
                    sx={{
                      height: 180,
                      objectFit: 'cover', // Make sure image covers the space
                    }}
                  />
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {animeitem.Title || 'No title available'}
                    </Typography>
                    <Typography variant="body2">{animeitem.Genre || 'Genre'}</Typography>
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
