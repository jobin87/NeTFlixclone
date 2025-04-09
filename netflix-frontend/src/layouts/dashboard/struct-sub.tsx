import { Box, Typography, Button, Stack } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import AddIcon from "@mui/icons-material/Add";

type MediaItem = {
  id: string;
  title?: string;
  posterUrl: string;
  imageUrl: string;
  imdbRating: number;
  plot?: string;
};

type TrendingItem = {
  id: string;
  title: string;
  posterUrl: string;
};

type MediaSectionProps = {
  label: string;
  mediaItems: MediaItem[];
  trendingItems?: TrendingItem[];
};

export const MediaSubSection = ({ mediaItems }: MediaSectionProps) => {
  if (!mediaItems || mediaItems.length === 0) {
    return (
      <Box sx={{ color: "#fff", p: 4 }}>
        <Typography variant="h5">No media to display.</Typography>
      </Box>
    );
  }

  const featured = mediaItems[0];

  return (
    <>
      {/* Featured Movie Banner */}
      <Box
        sx={{
          bgcolor: "black",
          display: "flex",
          flexDirection: {
            xs: "column-reverse",
            lg: "row",
          },
          height: {
            xs: "auto",
            lg: "75vh",
          },
        }}
      >
        {featured?.imageUrl && (
          <Box
            sx={{
              position: "relative",
              height: {
                xs: "50vh",
                sm: "60vh",
                lg: "80vh",
              },
              width: "100%",
              mt: 2,
              backgroundImage: `url(${featured.imageUrl})`,
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              backgroundColor: "black",
              backgroundSize: "cover",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
            }}
          >
            {/* Gradient Overlay */}
            <Box
              sx={{
                position: "absolute",
                inset: 0,
                background: `
                  linear-gradient(to right, black 0%, transparent 5%, transparent 93%, black 100%),
                  linear-gradient(to bottom, black 0%, transparent 10%),
                  linear-gradient(to top, black 0%, transparent 25%)
                `,
                pointerEvents: "none",
                zIndex: 1,
              }}
            />

            {/* Center Play Button */}
            <Button
              variant="contained"
              startIcon={<PlayArrowIcon />}
              sx={{
                position: "relative",
                zIndex: 2,
                backgroundColor: "rgba(255,255,255,0.85)",
                color: "#000",
                px: 4,
                py: 1.5,
                fontWeight: "bold",
                borderRadius: 2,
                fontSize: "1rem",
                textTransform: "none",
                "&:hover": {
                  backgroundColor: "rgba(255,255,255,1)",
                },
              }}
            >
              Play
            </Button>
          </Box>
        )}
      </Box>

      {/* Glass Panel */}
      <Box
        sx={{
          position: "relative",
          bottom: { xs: 16, md: 40 },
          background: "rgba(18, 18, 18, 0.6)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.8)",
          width: { xs: "100%", sm: "80%", md: "100%" },
          p: { xs: 3, sm: 4 },
          color: "white",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          height: "auto",
          minHeight: "60vh",
        }}
      >
        <Typography
          variant="h2"
          fontWeight="bold"
          gutterBottom
          sx={{
            fontSize: {
              xs: "1.8rem",
              sm: "2.2rem",
              md: "3.2rem",
              lg: "3.5rem",
            },
            color: "#fff",
            textShadow: "0 0 8px rgba(255,255,255,0.2)",
          }}
        >
          {featured.title || "Untitled"}
        </Typography>

        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          mb={1}
          mt={3}
          alignItems="flex-start"
        >
          <Button
            startIcon={<PlayArrowIcon />}
            sx={{
              background: "linear-gradient(to right, #ffffff, #dddddd)",
              color: "#000",
              fontWeight: 600,
              px: 4,
              py: 1.5,
              borderRadius: 2,
              fontSize: { xs: "0.9rem", sm: "1rem" },
              transition: "0.3s",
              "&:hover": {
                background: "linear-gradient(to right, #eeeeee, #cccccc)",
              },
            }}
          >
            Play
          </Button>

          <Button
            variant="outlined"
            startIcon={<AddIcon />}
            sx={{
              borderColor: "#fff",
              color: "#fff",
              fontWeight: 600,
              px: 4,
              py: 1.5,
              borderRadius: 2,
              fontSize: { xs: "0.9rem", sm: "1rem" },
              transition: "0.3s",
              "&:hover": {
                backgroundColor: "rgba(255,255,255,0.1)",
              },
            }}
          >
            My List
          </Button>
        </Stack>

        <Typography variant="subtitle2" color="grey.300">
          ⭐ IMDb: {featured.imdbRating || "N/A"}
        </Typography>

        {featured.plot && (
          <Typography
            variant="body2"
            color="grey.200"
            sx={{
              fontSize: { xs: "0.85rem", sm: "1rem" },
              lineHeight: 1.6,
              mt: 1,
            }}
          >
            {featured.plot}
          </Typography>
        )}
      </Box>
    </>
  );
};
