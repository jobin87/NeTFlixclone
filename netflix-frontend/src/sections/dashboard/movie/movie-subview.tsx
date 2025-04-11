import { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { MediaSubSection } from "src/layouts/dashboard/struct-sub";
import { useAppDispatch, useAppSelector } from "src/store";
import { getAllMovies } from "src/store/movie/movieThunk";

export const MovieSubView = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const { id } = useParams();
  const selectedMovie = location.state;

  const movieData = useAppSelector((state) => state.movies.movies.data);
  const movies = movieData?.movies || [];
  const trendingmovies = movieData?.trendingmovies || [];

  useEffect(() => {
    dispatch(getAllMovies());
  }, [dispatch]);

  const fullSelectedMovie = selectedMovie
    ? movies.find((m) => m.imdbID === (selectedMovie.imdbID || selectedMovie.id)) || selectedMovie
    : movies.find((m) => m.imdbID === id); // fallback if user refreshes

  const mediaItems = fullSelectedMovie
    ? [fullSelectedMovie, ...movies.filter((m) => m.imdbID !== fullSelectedMovie.imdbID)]
    : movies;

  const image =
    fullSelectedMovie?.Poster ||
    fullSelectedMovie?.posterUrl ||
    (Array.isArray(fullSelectedMovie?.imageUrl)
      ? fullSelectedMovie.imageUrl[0]
      : fullSelectedMovie?.imageUrl);

  return (
    <Box
      sx={{
        minHeight: "80vh",
        backgroundColor: "black",
        color: "#fff",
        px: { xs: 2, sm: 6 },
        py: 4,
      }}
    >
      {fullSelectedMovie && (
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            gap: 4,
            alignItems: "center",
            mb: 6,
          }}
        >
          <Box
            component="img"
            src={image}
            alt={fullSelectedMovie.Title || fullSelectedMovie.title}
            sx={{
              width: { xs: "100%", sm: 300 },
              borderRadius: 2,
              boxShadow: 6,
            }}
          />

          <Box>
            <Typography variant="h4" gutterBottom>
              {fullSelectedMovie.Title || fullSelectedMovie.title}
            </Typography>
            <Typography variant="subtitle1" sx={{ color: "grey.400" }} gutterBottom>
              IMDb: {fullSelectedMovie.imdbRating || fullSelectedMovie.imdb || "N/A"}
            </Typography>
            <Typography variant="body1" sx={{ maxWidth: 600, color: "grey.300" }}>
              {fullSelectedMovie.Plot || fullSelectedMovie.plot || "No description available."}
            </Typography>

            <Button
              variant="contained"
              startIcon={<PlayArrowIcon />}
              sx={{
                mt: 3,
                backgroundColor: "#fff",
                color: "#000",
                textTransform: "none",
                px: 4,
                py: 1.5,
              }}
            >
              Play Now
            </Button>
          </Box>
        </Box>
      )}

      {/* More like this section */}
  
    </Box>
  );
};
