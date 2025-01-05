import { Box, Card, CardMedia, Typography} from '@mui/material';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'src/store';
import { getmoviedata } from 'src/store/movie/movieThunk';

interface MovieProps {
  series: Array<any>; // Define the proper type for movie objects if possible
}

export const Series: React.FC<MovieProps> =() => {
  const {series} = useAppSelector((state) => state.movie.data);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getmoviedata()); // Fetch the movie data when the component mounts
  }, [dispatch]);
  return (
    <Box >
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          gap: 4,
          mb: 4,
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          borderRadius: '12px',
          height:{
            xs:"33vh",
            lg:"33vh"
          },
          mt:{
             xs:3,
             lg:0
          }
        }}
      > 
      {series?.length> 0 &&(
      <Card key={series[0].imdbID} sx={{minWidth:"120px"}}>
        <CardMedia 
        component="img"
        sx={{
          height:{
            xs:"34vh",
            lg:"34vh"
          }
        }}
        image={series[0].Poster}
        />

      </Card>)}
       
      </Box>

      <Box sx={{ mt: 8,ml:2}}>
        <Typography variant="h5" gutterBottom>
          series
        </Typography>
       
      </Box>
      {/* Second Box: Scrollable Movies */}
      <Box
        sx={{
          display: 'flex',
          overflowX: 'auto',
          whiteSpace: 'nowrap',
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          borderRadius: '8px',
          gap: {
            xs:4,
            lg:2
          },
          height: {
            xs: '33vh',
            lg: '35vh',
          },
          '&::-webkit-scrollbar': {
            display: 'none', // Hide scrollbar for cleaner UI
          },
        }}
      >
        {series?.length > 0 &&
          series.map((movie, index) => (
            <Card
              key={movie.imdbID || index}
              sx={{
                flex: '0 0 auto', // Ensures each card is shown one at a time
                minWidth: {
                  xs:'380px',
                  lg:'40px'
                }, // Adjust card width for visibility
                bgcolor:"black",
                ml:{
                  xs:0
                },
                objectFit:'contain'
              }}
            >
              <CardMedia
                component="img"
                image={movie.Poster}
                alt={movie.Title || 'Movie Poster'}
                sx={{
                  height: '300px', // Consistent height for movie posters
                  width:"380px",
                  objectFit:'contain'
                }}
              />
            </Card>
          ))}
      </Box>
    </Box>
  );
};