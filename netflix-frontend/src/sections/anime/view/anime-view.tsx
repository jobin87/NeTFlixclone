import { Box, Button, Card, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import aot from "src/assets/animeaot/aot.jpg"

export const AnimeView= () => {
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
        {/* Featured Anime Image */}
        <Box sx={{ flex: 2 }}>
          <img
            src={aot}// Replace with the featured anime's image URL
            alt="Featured Anime"
            style={{ width: "100%", borderRadius: "12px" }}
          />
        </Box>

        {/* Featured Anime Details */}
        <Box sx={{ flex: 3 }}>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Attack on Titan
          </Typography>
          <Typography variant="body1" gutterBottom>
            The latest season of this epic anime is now available!
          </Typography>
          <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
            <Button variant="contained" color="primary">
              Watch Now
            </Button>
            <Button variant="outlined" color="secondary">
              Follow
            </Button>
          </Box>
        </Box>

        {/* Recent Anime */}
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
            Recent Anime
          </Typography>
          {["Naruto Shippuden", "Demon Slayer", "One Piece"].map((anime, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mt: 2,
              }}
            >
              <Typography>{anime}</Typography>
              <Typography>PG-13</Typography>
            </Box>
          ))}
        </Box>
      </Box>
      <Box>
        <Typography variant="h5" gutterBottom>
          Popular Anime
        </Typography>
        <Grid container spacing={3}>
          {[
            { title: "Naruto", image: "https://via.placeholder.com/200x300" },
            { title: "Demon Slayer", image: "https://via.placeholder.com/200x300" },
            { title: "One Punch Man", image: "https://via.placeholder.com/200x300" },
            { title: "Dragon Ball Z", image: "https://via.placeholder.com/200x300" },
          ].map((anime, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <Card sx={{ backgroundColor: "rgba(0, 0, 0, 0.7)", color: "white" }}>
                <CardMedia
                  component="img"
                  image={anime.image}
                  alt={anime.title}
                  sx={{ height: 180 }}
                />
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {anime.title}
                  </Typography>
                  <Typography variant="body2">Action, Adventure</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" sx={{ mb: 3 }}>
          Featured Anime Shows
        </Typography>
        <Grid container spacing={3}>
          {[
            { title: "Attack on Titan", image: "https://w0.peakpx.com/wallpaper/466/434/HD-wallpaper-anime-attack-on-titan-attack-on-titan-eren-yeager-reiner-braun-shingeki-no-kyojin-titan.jpg" },
            { title: "My Hero Academia", image: "https://via.placeholder.com/200x300" },
            { title: "Fullmetal Alchemist: Brotherhood", image: "https://via.placeholder.com/200x300" },
            { title: "Tokyo Ghoul", image: "https://via.placeholder.com/200x300" },
          ].map((anime, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <Card sx={{ backgroundColor: "rgba(0, 0, 0, 0.7)", color: "white" }}>
                <CardMedia
                  component="img"
                  image={anime.image}
                  alt={anime.title}
                  sx={{ height: 180 }}
                />
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {anime.title}
                  </Typography>
                  <Typography variant="body2">Action, Fantasy</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
      </Box>
  );
};

