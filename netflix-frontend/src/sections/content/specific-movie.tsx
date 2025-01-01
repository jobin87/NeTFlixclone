import React from "react";
import { useLocation } from "react-router-dom";
import { Box, Typography, Card, CardMedia, CardContent } from "@mui/material";

export const MovieDetails: React.FC = () => {
  const location = useLocation();
  const movie = location.state?.movie;

  if (!movie) {
    return <Typography>No movie details available.</Typography>;
  }

  return (
    <Box sx={{ p: 4 }}>
      <Card>
        <CardMedia
          component="img"
          image={movie.Poster || "https://via.placeholder.com/300x450"}
          alt={movie.Title}
          sx={{ height: "500px", objectFit: "cover" }}
        />
        <CardContent>
          <Typography variant="h4" gutterBottom>
            {movie.Title}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Director:</strong> {movie.Director || "Unknown"}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Genre:</strong> {movie.Genre || "Unknown"}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Plot:</strong> {movie.Plot || "Plot not available"}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>IMDb Rating:</strong> {movie.imdbRating || "N/A"}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Release Year:</strong> {movie.Year || "N/A"}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};
