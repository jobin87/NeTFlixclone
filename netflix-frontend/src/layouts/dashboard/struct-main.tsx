import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { paths } from "src/routes/paths";

type MediaItem = {
  id: string;
  title: string;
  posterUrl: string;
  imageUrl: string;
  imdbRating: number;
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

export const MediaSection = ({
  label,
  mediaItems,
  trendingItems = [],
}: MediaSectionProps) => {
  const featured = mediaItems[0];
  const navigate = useNavigate();

  return (
    <>
      {/* Hero Section */}
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
            lg: "55vh",
          },
        }}
      >
        {/* Left Panel */}
        <Box
          sx={{
            color: "white",
            width: {
              xs: "100%",
              lg: "40%",
            },
            py: {
              xs: 2,
              lg: 0,
            },
            px: 2,
            display: { xs: "none", lg: "flex" },
            flexDirection: "column",
            justifyContent: "center",
            gap: 2,
            position: "relative",
            minHeight: 200,
            left: 90,
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontSize: {
                xs: 24,
                sm: 28,
                lg: 32,
              },
              fontWeight: "bold",
              textAlign: {
                xs: "center",
                lg: "left",
              },
            }}
          >
            {featured?.title}
          </Typography>

          <Typography
            variant="body2"
            sx={{
              textAlign: {
                xs: "center",
                lg: "left",
              },
              display: { xs: "none", lg: "flex" },
            }}
          >
            IMDb Rating: ⭐ {featured?.imdbRating}
          </Typography>

          <Box
            sx={{
              display: { xs: "none", lg: "flex" },
              justifyContent: {
                xs: "center",
                lg: "flex-start",
              },
              gap: 2,
            }}
          >
            <Button
              variant="contained"
              color="warning"
              size="small"
              onClick={() =>
                navigate(paths.dashboard.subView, {
                  state: {
                    imdbID: featured?.id,
                    Title: featured?.title,
                    Poster: featured?.posterUrl,
                    imageURL: featured?.imageUrl,
                    imdbRating: featured?.imdbRating,
                  },
                })
              }
            >
              Play
            </Button>
            <Button variant="contained" color="error" size="small">
              Watch Trailer
            </Button>
          </Box>
        </Box>

        {/* Right Image (Always Visible) */}
        {featured?.imageUrl && (
          <Box
            sx={{
              position: "relative",
              height: {
                xs: "30vh",
                sm: "50vh",
                lg: "55vh",
              },
              width: {
                xs: "100%",
                lg: "60%",
              },
              mt: 2,
              backgroundImage: `url(${featured.imageUrl})`,
              backgroundPosition: "center center",
              backgroundRepeat: "no-repeat",
              backgroundColor: "black",
              backgroundSize: "100% 100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              overflow: "hidden",
            }}
          >
            <Box
              sx={{
                position: "absolute",
                inset: 0,
                background: `
                  linear-gradient(to right, black 0%, transparent 5%, transparent 93%, black 100%),
                  linear-gradient(to bottom, black 0%, transparent 0%),
                  linear-gradient(to top, black 0%, transparent 5%),
                  linear-gradient(to top, black 0%, transparent 30%)`,
                pointerEvents: "none",
              }}
            />
          </Box>
        )}
      </Box>

      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: 0,
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: -14,
            left: 1,
            px: 1.5,
            py: 0.5,
            borderRadius: 1,
          }}
        >
          <Typography variant="h6" sx={{ color: "white" }}>
            {label}
          </Typography>
        </Box>
      </Box>

      {/* Scrollable Section: Regular */}
      <Box
        sx={{
          bgcolor: "black",
          height: "33vh",
          display: "flex",
          flexDirection: "row",
          overflowX: "auto",
          whiteSpace: "nowrap",
          pt: 3,
          pb: 3,
          scrollbarWidth: "none",
          "&::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        {mediaItems.slice(1).map((item) => (
          <Box
            key={item.id}
            onClick={() =>
              navigate(paths.dashboard.subView, {
                state: {
                  imdbID: item.id,
                  Title: item.title,
                  Poster: item.posterUrl,
                  imageURL: item.imageUrl,
                  imdbRating: item.imdbRating,
                },
              })
            }
            sx={{
              minWidth: 120,
              height: "100%",
              backgroundImage: `url(${item.posterUrl})`,
              backgroundSize: "contain",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              flex: "0 0 auto",
              cursor: "pointer",
              transition: "transform 0.2s",
              "&:hover": {
                transform: "scale(1.05)",
              },
            }}
          />
        ))}
      </Box>

      {/* Scrollable Section: Trending */}
      {trendingItems.length > 0 && (
        <>
          <Typography variant="h6" sx={{ ml: 1.1, color: "white" }}>
            Trending now
          </Typography>

          <Box
            sx={{
              bgcolor: "black",
              height: "33vh",
              display: "flex",
              flexDirection: "row",
              overflowX: "auto",
              whiteSpace: "nowrap",
              pt: 1,
              pb: 4,
              scrollbarWidth: "none",
              "&::-webkit-scrollbar": {
                display: "none",
              },
            }}
          >
            {trendingItems.map((movie) => (
              <Box
                key={movie.id}
                onClick={() =>
                  navigate(paths.dashboard.subView, {
                    state: {
                      imdbID: movie.id,
                      Title: movie.title,
                      Poster: movie.posterUrl,
                      imageURL: movie.posterUrl, // fallback
                      imdbRating: 0,
                    },
                  })
                }
                sx={{
                  minWidth: 120,
                  height: "100%",
                  backgroundImage: `url(${movie.posterUrl})`,
                  backgroundSize: "contain",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  flex: "0 0 auto",
                  cursor: "pointer",
                  transition: "transform 0.2s",
                  "&:hover": {
                    transform: "scale(1.05)",
                  },
                }}
              />
            ))}
          </Box>
        </>
      )}
    </>
  );
};
