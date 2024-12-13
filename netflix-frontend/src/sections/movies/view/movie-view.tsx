import { Box, Button, Card, CardContent, CardMedia, Typography } from "@mui/material";
import { useMovie } from "src/hooks/use-movies";

const {imdbId,moviedata} = useMovie()
export const MovieView = () => {
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: 4,
          mb: 4,
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          borderRadius: "12px",
          p: 3,
        }}
      >
        {/* Featured Movie Image */}
        <Box sx={{ flex: 2 }}>
          <img
            src= {moviedata?.images[0]  || "https://via.placeholder.com/600x300"} // Replace with the featured movie's image URL
            alt="Featured Movie"
            style={{ width: "100%", borderRadius: "12px" }}
          />
        </Box>

        {/* Featured Movie Details */}
        <Box sx={{ flex: 3 }}>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            
          </Typography>
          <Typography variant="body1" gutterBottom>
            Watch the latest comedy thriller, top-rated last week on Netflix!
          </Typography>
          <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
            <Button variant="contained" color="primary">
              Watch Now
            </Button>
            <Button variant="outlined" color="secondary">
              Following
            </Button>
          </Box>
        </Box>

        {/* Recent Movies */}
        <Box
          sx={{
            flex: 2,
            display: "flex",
            flexDirection: "column",
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            borderRadius: "12px",
            p: 2,
          }}
        >
          <Typography variant="h6" gutterBottom>
            Recent Movies
          </Typography>
          {["Blood Hounds", "My Name", "Invitation To a Murder"].map(
            (movie, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mt: 2,
                }}
              >
                <Typography>{movie}</Typography>
                <Typography>PG-12</Typography>
              </Box>
            )
          )}
        </Box>
      </Box>

      {/* Movies Section */}
      <Box>
        <Typography variant="h5" gutterBottom>
          Movies
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            overflowX: "auto",
            gap: 3,
            pb: 2,
            '&::-webkit-scrollbar': { display: 'none' }, // Hide scrollbar for better UI
          }}
        >
          {[
            { title: "Smite Movie", image: "https://via.placeholder.com/200x300" },
            { title: "Evil Dead Rise", image: "https://via.placeholder.com/200x300" },
            { title: "Invitation To a Murder", image: "https://via.placeholder.com/200x300" },
            { title: "Shailene Woodley", image: "https://via.placeholder.com/200x300" },
            { title: "Smite Movie", image: "https://via.placeholder.com/200x300" },
            { title: "Evil Dead Rise", image: "https://via.placeholder.com/200x300" },
          ].map((movie, index) => (
            <Card
              key={index}
              sx={{
                minWidth: "230px",
                backgroundColor: "rgba(0, 0, 0, 0.7)",
                color: "white",
              }}
            >
              <CardMedia
                component="img"
                image={movie.image}
                alt={movie.title}
                sx={{ height: 180 }}
              />
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {movie.title}
                </Typography>
                <Typography variant="body2">The Action Movie</Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>

      {/* Sci-fi / Thriller Section */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          Sci-fi / Thriller
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            overflowX: "auto",
            gap: 3,
            pb: 2,
            '&::-webkit-scrollbar': { display: 'none' },
          }}
        >
          {[
            { title: "Smite Movie", image: "https://via.placeholder.com/200x300" },
            { title: "Evil Dead Rise", image: "https://via.placeholder.com/200x300" },
            { title: "Invitation To a Murder", image: "https://via.placeholder.com/200x300" },
            { title: "Shailene Woodley", image: "https://via.placeholder.com/200x300" },
          ].map((movie, index) => (
            <Card
              key={index}
              sx={{
                minWidth: "230px",
                backgroundColor: "rgba(0, 0, 0, 0.7)",
                color: "white",
              }}
            >
              <CardMedia
                component="img"
                image={movie.image}
                alt={movie.title}
                sx={{ height: 180 }}
              />
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {movie.title}
                </Typography>
                <Typography variant="body2">The Action Movie</Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>

      {/* Watchlist Section */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          Watchlist
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            overflowX: "auto",
            gap: 3,
            pb: 2,
            '&::-webkit-scrollbar': { display: 'none' },
          }}
        >
          {[
            { title: "Smite Movie", image: "https://via.placeholder.com/200x300" },
            { title: "Evil Dead Rise", image: "https://via.placeholder.com/200x300" },
            { title: "Invitation To a Murder", image: "https://via.placeholder.com/200x300" },
            { title: "Shailene Woodley", image: "https://via.placeholder.com/200x300" },
          ].map((movie, index) => (
            <Card
              key={index}
              sx={{
                minWidth: "230px",
                backgroundColor: "rgba(0, 0, 0, 0.7)",
                color: "white",
              }}
            >
              <CardMedia
                component="img"
                image={movie.image}
                alt={movie.title}
                sx={{ height: 180 }}
              />
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {movie.title}
                </Typography>
                <Typography variant="body2">The Action Movie</Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>
    </Box>
  );
};
