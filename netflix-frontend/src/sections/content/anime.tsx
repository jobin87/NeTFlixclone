import { Box, Card, CardMedia, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'src/store';
import { getmoviedata } from 'src/store/movie/movieThunk';

interface MovieProps {
  anime: Array<any>; // Define the proper type for movie objects if possible
}

export const Anime: React.FC<MovieProps> = () => {
  const { anime } = useAppSelector((state) => state.movie.data);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getmoviedata()); // Fetch the movie data when the component mounts
  }, [dispatch]);

  return (
    <Box>
      {/* First Box: Highlighted Movie */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          gap: 4,
          mb: 4,
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          borderRadius: '12px',
          height: {
            xs: '33vh',
            lg: '33vh',
          },
          mt: {
            xs: 3,
            lg: 0,
          },
        }}
      >
        {anime?.length > 0 && (
          <Card key={anime[0].imdbID} sx={{ minWidth: '120px' }}>
            <CardMedia
              component="img"
              sx={{
                height: {
                  xs: '34vh',
                  lg: '34vh',
                },
              }}
              image={anime[0].Poster}
              alt={anime[0].Title || 'Movie Poster'}
            />
          </Card>
        )}
      </Box>

      {/* Section Title */}
      <Box sx={{ mt: {
        xs:8,
        lg:3
      }, ml: 2 }}>
        <Typography variant="h5" gutterBottom>
          anime
        </Typography>
      </Box>

      {/* Second Box: Scrollable Movies */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'row', sm: 'row' },
          gap: 4,
          mb: 4,
          borderRadius: '12px',
          height: {
            xs: '33vh',
            lg: '33vh',
          },
          mt: {
            xs: 3,
            lg: 0,
          },
          overflowX:"auto",
          '::-webkit-scrollbar':{
            display:"none"
          }
        }}
      >
        {anime?.length > 0 &&
          anime.map((movie, index) => (
            <Card
              key={movie.imdbID || index}
              sx={{
                flex: ' auto', // Ensures each card is shown one at a time
                minWidth: {
                  xs:'370px',
                  lg:'300px'
                }, // Adjust card width for visibility
                bgcolor:"black",
                ml:{
                  xs:0
                },
              }}
            >
              <CardMedia
                component="img"
                image={movie.Poster}
                alt={movie.Title || 'Movie Poster'}
                sx={{
                  height: {
                    xs:'300px',
                    lg:'200px'
                  }, // Consistent height for movie posters
                  objectFit:'contain'
                }}
              />
            </Card>
          ))}
      </Box>
    </Box>
  );
};
