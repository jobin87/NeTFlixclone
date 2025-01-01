import { Box, Card, CardMedia, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'src/store';
import { getmoviedata } from 'src/store/movie/movieThunk';

interface MovieProps {
  movies: Array<any>; // Define the proper type for movie objects if possible
}

export const Movie: React.FC<MovieProps> = () => {
  const { movies } = useAppSelector((state) => state.movie.data);
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
          width:{
            xs:"380px"
          }
        }}
      >
        {movies?.length > 0 && (
          <Card key={movies[0].imdbID} sx={{ minWidth: '120px' }}>
            <CardMedia
              component="img"
              sx={{
                height: {
                  xs: '34vh',
                  lg: '34vh',
                },
              }}
              image={movies[0].Poster}
              alt={movies[0].Title || 'Movie Poster'}
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
          Movies
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
            xs: 2,
            lg: 0,
          },
          left:0,
          overflowX:"auto",
          '::-webkit-scrollbar':{
            display:"none"
          },
          width:{
            xs:"380px"
          }
        }}
      >
        {movies?.length > 0 &&
          movies.map((movie, index) => (
            <Card
              key={movie.imdbID || index}
              sx={{
                flex: ' auto', // Ensures each card is shown one at a time
                minWidth: {
                  xs:'360px',
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
