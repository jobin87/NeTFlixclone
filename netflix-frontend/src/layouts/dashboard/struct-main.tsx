import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { paths } from "src/routes/paths";

// ========== Types ==========
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

type UpcomingItem = {
  id: string;
  title: string;
  posterUrl: string;
};

type MediaSectionProps = {
  label?: string;
  mediaItems?: MediaItem[];
  trendingItems?: TrendingItem[];
  upcomingItems?: UpcomingItem[];
  nowPlaying?: UpcomingItem[];
};

// ========== Main Component ==========
export const MediaSection = ({
  label,
  mediaItems = [],
  trendingItems = [],
  upcomingItems = [],
  nowPlaying = [],
}: MediaSectionProps) => {
  const featured = mediaItems?.[0] || trendingItems?.[0];
  const navigate = useNavigate();

  const renderScrollSection = (
    items: (MediaItem | TrendingItem | UpcomingItem)[],
    sectionTitle: string
  ) => (
    <>
      <Typography variant="h6" sx={{ ml: 1.1, color: "white", mt: 2 }}>
        {sectionTitle}
      </Typography>

      <Box sx={scrollBoxStyle}>
        {items.map((item) => (
          <Box
            key={item.id}
            onClick={() => {
              const selectedItem = [
                ...mediaItems,
                ...trendingItems,
                ...upcomingItems,
                ...nowPlaying,
              ].find((m) => m.id === item.id);
              if (selectedItem) {
                navigate(paths.dashboard.subView.replace(":id", item.id), {
                  state: selectedItem,
                });
              }
            }}
            sx={{
              height: "100%",
              aspectRatio: "2 / 3",
              borderRadius: 1,
              backgroundImage: `url(${item.posterUrl})`,
              backgroundSize: "cover",
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
  );

  return (
    <Box sx={{ height: "auto" }}>
      {/* Featured Hero Section */}
      {featured && (
        <Box sx={heroLayoutStyle}>
          {/* Left Panel */}
          <Box sx={leftPanelStyle}>
            {/* Title + Play Button */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap",
                justifyContent: {
                  xs: "center",
                  lg: "flex-start",
                },
                ml: {
                  xs: "none",
                  lg: 2,
                },
              }}
            >
              <Typography variant="h4" sx={heroTitleStyle}>
                {featured.title}
              </Typography>
            </Box>

            {/* Rating + Trailer Button */}
            {/* xs layout: Play + Trailer + Rating */}
            <Box
              sx={{
                display: {
                  xs: "flex",
                  lg: "none",
                },
                alignItems: "center",
                gap: 2,
                justifyContent: "center",
              }}
            >
              <Button
                variant="contained"
                color="warning"
                size="small"
                onClick={() =>
                  navigate(paths.dashboard.subView, {
                    state: {
                      imdbID: featured.id,
                      Title: featured.title,
                      Poster: featured.posterUrl,
                      imageURL: featured.imageUrl,
                      imdbRating: featured.imdbRating,
                    },
                  })
                }
              >
                Play
              </Button>

              <Button variant="contained" color="error" size="small">
                Watch Trailer
              </Button>

              <Typography variant="body2" sx={heroRatingStyle}>
                IMDb Rating: ⭐ {featured.imdbRating}
              </Typography>
            </Box>

            {/* lg layout: Rating + Play + Trailer */}
            <Box
              sx={{
                display: {
                  xs: "none",
                  lg: "flex",
                },
                alignItems: "center",
                gap: 2,
                justifyContent: "flex-start",
              }}
            >
              <Typography variant="body2" sx={heroRatingStyle}>
                IMDb Rating: ⭐ {featured.imdbRating}
              </Typography>

              <Button
                variant="contained"
                color="warning"
                size="small"
                onClick={() =>
                  navigate(paths.dashboard.subView, {
                    state: {
                      imdbID: featured.id,
                      Title: featured.title,
                      Poster: featured.posterUrl,
                      imageURL: featured.imageUrl,
                      imdbRating: featured.imdbRating,
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

          {/* Right-side Big Image */}
          {featured.imageUrl && (
            <Box
              sx={imageContainerStyle(featured.imageUrl)}
              onClick={() =>
                navigate(paths.dashboard.subView.replace(":id", featured.id), {
                  state: featured,
                })
              }
            >
              <Box sx={imageOverlayStyle} />
            </Box>
          )}
        </Box>
      )}

      {/* Section Label */}
      {label && (
        <Typography variant="h6" sx={{ color: "white", ml: 2, mt: 1 }}>
          {label}
        </Typography>
      )}

      {/* Scroll Sections */}
      {mediaItems.length > 1 &&
        renderScrollSection(mediaItems.slice(1), "More Like This")}
      {trendingItems.length > 0 &&
        renderScrollSection(trendingItems, "Trending Now")}
      {nowPlaying.length > 0 && renderScrollSection(nowPlaying, "Now Playing")}
      {upcomingItems.length > 0 &&
        renderScrollSection(upcomingItems, "Upcoming")}
    </Box>
  );
};

// ========== Styles ==========
const heroLayoutStyle = {
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
};

const leftPanelStyle = {
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
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: {
    xs: "flex-start",
    lg: "flex-start",
  },
  gap: 4,
};

const heroTitleStyle = {
  fontSize: {
    xs: 24,
    sm: 28,
    lg: 42,
  },
  fontWeight: "bold",
};

const heroRatingStyle = {
  fontSize: 16,
};

const imageContainerStyle = (url: string) => ({
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
  mt: {
    xs: 2,
    lg: 2,
  },
  backgroundImage: `url(${url})`,
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundColor: "black",
  backgroundSize: "cover",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  overflow: "hidden",
  cursor: "pointer",
  transition: "transform 0.4s ease",
  "&:hover": {
    transform: "scale(1.03)",
  },
});

const imageOverlayStyle = {
  position: "absolute",
  inset: 0,
  background: `
    linear-gradient(to right, black 0%, transparent 5%, transparent 93%, black 100%),
    linear-gradient(to bottom, black 0%, transparent 0%),
    linear-gradient(to top, black 0%, transparent 5%),
    linear-gradient(to top, black 0%, transparent 30%)`,
  pointerEvents: "none",
};

const scrollBoxStyle = {
  bgcolor: "black",
  height: {
    xs: "20vh",
    lg: "33vh",
  },
  display: "flex",
  flexDirection: "row",
  overflowX: "auto",
  whiteSpace: "nowrap",
  pt: 1,
  pb: 3,
  gap: 2,
  scrollbarWidth: "none",
  "&::-webkit-scrollbar": {
    display: "none",
  },
  ml: 2,
};
