import { useState, useEffect, useMemo } from "react";
import {
  Box,
  Typography,
  TextField,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  InputAdornment,
  Paper,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { DashboardLayout } from "src/layouts/dashboard";
import { useAppDispatch, useAppSelector } from "src/store";
import { useNavigate } from "react-router-dom";
import { getAllMovies, getAnimes, getSeries } from "src/store/movie/movieThunk";

const SearchPage = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [isFocused, setIsFocused] = useState(false);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const movieData = useAppSelector((state) => state.movies.movies?.data);
  const animeData = useAppSelector((state) => state.movies.animes?.data);
  const seriesData = useAppSelector((state) => state.movies.series.data);

  // ✅ Merge movies and trendingmovies with deduplication
  const allMovies = useMemo(() => {
    const combined = [
      ...(movieData?.movies || []),
      ...(movieData?.trendingmovies || []),
    ];
    const unique = new Map<string, any>();
    for (const movie of combined) {
      const id = movie.imdbID || movie.imdbID;
      if (!unique.has(id)) unique.set(id, movie);
    }
    return Array.from(unique.values());
  }, [movieData]);

  const allAnime = animeData?.anime || [];
  const allSeries = seriesData?.series || [];

  // ✅ Combine movies + anime + series for search
  const searchableList = useMemo(() => {
    return [...allMovies, ...allAnime, ...allSeries];
  }, [allMovies, allAnime, allSeries]);

  // Fetch all content data
  useEffect(() => {
    dispatch(getAnimes());
    dispatch(getAllMovies());
    dispatch(getSeries());
  }, [dispatch]);

  // Filter based on query
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (query.length > 0) {
        const filtered = searchableList.filter((item: any) =>
          (item.Title || item.title || "")
            .toLowerCase()
            .includes(query.toLowerCase())
        );
        setResults(filtered);
      } else {
        setResults([]);
      }
    }, 300);

    return () => clearTimeout(timeout);
  }, [query, searchableList]);

  // Handle result selection
  const handleSelect = (item: any) => {
    setQuery("");
    setResults([]);
    navigate(`/dashboard/subview/${item.imdbID || item.id}`, { state: item });
  };

  // Show loading if data isn't available
  if (!movieData || !animeData || !seriesData) {
    return (
      <DashboardLayout>
        <Box sx={{ color: "white", p: 5 }}>
          Loading movies, anime or series data...
        </Box>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <Box
        sx={{
          minHeight: "100vh",
          backgroundColor: "black",
          color: "#fff",
          px: 3,
          py: 5,
        }}
      >
        <Typography variant="h4" gutterBottom>
          Movie, Anime & Series Search
        </Typography>

        <Box sx={{ position: "relative", width: "100%", maxWidth: 500 }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search for a movie, anime or series..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setTimeout(() => setIsFocused(false), 200)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: "grey.500" }} />
                </InputAdornment>
              ),
            }}
            sx={{
              backgroundColor: "background.paper",
              borderRadius: 2,
              input: { color: "#fff" },
            }}
          />

          {isFocused && results.length > 0 && (
            <Paper
              elevation={3}
              sx={{
                position: "absolute",
                width: "100%",
                maxHeight: 400,
                overflow: "auto",
                mt: 1,
                zIndex: 1,
                backgroundColor: "#1e1e1e",
              }}
            >
              <List dense>
                {results.map((item) => (
                  <ListItem
                    key={item.imdbID || item.id}
                    button
                    onMouseDown={() => handleSelect(item)}
                    sx={{ "&:hover": { backgroundColor: "action.hover" } }}
                  >
                    <ListItemAvatar>
                      <Avatar
                        variant="rounded"
                        src={
                          item.Poster ||
                          item.posterUrl ||
                          (Array.isArray(item.imageUrl)
                            ? item.imageUrl[0]
                            : item.imageURL)
                        }
                        alt={item.Title || item.title}
                        sx={{ width: 50, height: 75, mr: 2 }}
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary={`${item.Title || item.title} (${
                        item.Year || item.year || ""
                      })`}
                      primaryTypographyProps={{ color: "white" }}
                    />
                  </ListItem>
                ))}
              </List>
            </Paper>
          )}
        </Box>
      </Box>
    </DashboardLayout>
  );
};

export default SearchPage;
