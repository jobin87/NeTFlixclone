import { Box, Button, Card, CardContent, CardMedia, Grid, Typography } from '@mui/material';
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
              src="https://via.placeholder.com/600x300" // Replace with the featured movie's image URL
              alt="Featured Movie"
              style={{ width: "100%", borderRadius: "12px" }}
            />
          </Box>

          {/* Featured Movie Details */}
          <Box sx={{ flex: 3 }}>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              Murder Mystery
            </Typography>
            <Typography variant="body1" gutterBottom>
              Watch the latest comedy thriller by Netflix!
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
        <Box sx={{
          
        }}>

        <Typography variant="h5" gutterBottom>
          Popular Movies
        </Typography>
        <Grid container spacing={3}>
          {[
            { title: "Smite Movie", image: "https://via.placeholder.com/200x300" },
            { title: "Evil Dead Rise", image: "https://via.placeholder.com/200x300" },
            { title: "Invitation To a Murder", image: "https://via.placeholder.com/200x300" },
            { title: "Shailene Woodley", image: "https://via.placeholder.com/200x300" },
          ].map((movie, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <Card sx={{ backgroundColor: "rgba(0, 0, 0, 0.7)", color: "white"  }}>
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
            </Grid>
          ))}
        </Grid>
        </Box>
      <Box sx={{ mt: 4}}>
        <Typography variant="h4" sx={{
          mb:3
        }}>Featured Show</Typography>
        <Grid container spacing={3}>
          {[
            { title: "Smite Movie", image: "https://via.placeholder.com/200x300" },
            { title: "Evil Dead Rise", image: "https://via.placeholder.com/200x300" },
            { title: "Invitation To a Murder", image: "https://via.placeholder.com/200x300" },
            { title: "Shailene Woodley", image: "https://via.placeholder.com/200x300" },
          ].map((movie, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <Card sx={{ backgroundColor: "rgba(0, 0, 0, 0.7)", color: "white"  }}>
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
            </Grid>
          ))}
        </Grid>
      </Box>
      </Box>
  );
};

