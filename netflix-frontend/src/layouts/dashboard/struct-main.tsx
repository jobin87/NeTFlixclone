import { Box, Button, Typography } from "@mui/material";

type MediaItem = {
  id: string;
  title: string;
  imageUrl: string;
};

type MediaSectionProps = {
  label: string;
  movieName: string;
  imdbRating: number;
  imageUrl: string;
  mediaItems: MediaItem[];
  trendingItems?: MediaItem[]; // ⬅️ Optional trending section
};

export const MediaSection = ({
  movieName,
  label,
  imdbRating,
  imageUrl,
  mediaItems,
  trendingItems = [],
}: MediaSectionProps) => {
  return (
    <>
      {/* Hero Section */}
      <Box
        sx={{
          bgcolor: "white",
          height: {
            xs: "65vh",
            lg: "55vh",
          },
          pb: 2,
          display: "flex",
          flexDirection: {
            xs: "column",
            lg: "row",
          },
        }}
      >
        {/* Mobile Label */}
        <Typography
          variant="h6"
          sx={{
            display: {
              xs: "block",
              lg: "none",
            },
            p: 2,
          }}
        >
          {label}
        </Typography>

        {/* Left Panel */}
        <Box
          sx={{
            bgcolor: "black",
            color: "white",
            height: "58vh",
            width: "40%",
            position: "relative",
            display: {
              xs: "none",
              lg: "flex",
            },
          }}
        >
          {/* Movie Title (centered) */}
          <Box
            sx={{
              position: "absolute",
              top: "40%",
              left: "45%",
              transform: "translate(-50%, -50%)",
              textAlign: "center",
            }}
          >
            <Typography variant="h3" sx={{ fontSize: 30, fontWeight: "bold" }}>
              {movieName}
            </Typography>
          </Box>

          {/* Rating + Buttons */}
          <Box
            sx={{
              position: "absolute",
              bottom: 70, // <- give space above label
              left: 30,
              display: "flex",
              flexDirection: "column",
              gap: 1,
            }}
          >
            <Typography variant="body2">
              IMDb Rating: ⭐ {imdbRating}
            </Typography>
            <Box sx={{ display: "flex", gap: 1 }}>
              <Button variant="contained" color="error" size="small">
                Watch Now
              </Button>
              <Button variant="contained" color="error" size="small">
                Watch Trailer
              </Button>
            </Box>
          </Box>

          {/* Label at the very bottom-right */}
          <Box
            sx={{
              position: "absolute",
              bottom: 1,
              mt:3,
              ml:1
            }}
          >
            <Typography variant="h6">{label}</Typography>
          </Box>
        </Box>

        {/* Right Image */}
        <Box
          sx={{
            display: {
              xs: "none",
              lg: "flex",
            },
            bgcolor: "black",
            backgroundImage: `url(${imageUrl})`,
            backgroundSize: "contain",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            height: "55vh",
            width: "65%",
            pt: 20,
          }}
        />
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
        {mediaItems?.map((item) => (
          <Box
            key={item.id}
            sx={{
              minWidth: 120,
              height: "100%",
              backgroundImage: `url(${item.imageUrl})`,
              backgroundSize: "contain",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              flex: "0 0 auto",
            }}
          />
        ))}
      </Box>
      {/* Scrollable Section: Trending (Optional) */}
      {trendingItems.length > 0 && (
        <>
          <Typography variant="h6" sx={{ ml: 1.1 }}>
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
              pt:1,
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
                sx={{
                  minWidth: 120,
                  height: "100%",
                  backgroundImage: `url(${movie.imageUrl})`,
                  backgroundSize: "contain",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  flex: "0 0 auto",
                }}
              />
            ))}
          </Box>
        </>
      )}
    </>
  );
};
