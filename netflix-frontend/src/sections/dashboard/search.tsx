// pages/SearchPage.tsx

import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  List,
  ListItem,
  ListItemText,
  InputAdornment,
  Paper,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { DashboardLayout } from 'src/layouts/dashboard';

// Dummy data
const demoMovies = [
  { id: '1', Title: 'Inception', Year: '2010' },
  { id: '2', Title: 'The Dark Knight', Year: '2008' },
  { id: '3', Title: 'Interstellar', Year: '2014' },
  { id: '4', Title: 'Parasite', Year: '2019' },
  { id: '5', Title: 'The Matrix', Year: '1999' },
];

const SearchPage = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<{ id: string; Title: string; Year: string }[]>([]);
    const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (query.length > 0) {
        const filtered = demoMovies.filter((movie) =>
          movie.Title.toLowerCase().includes(query.toLowerCase())
        );
        setResults(filtered);
      } else {
        setResults([]);
      }
    }, 300); // debounce

    return () => clearTimeout(timeout);
  }, [query]);

  const handleSelect = (movie: any) => {
    alert(`Selected: ${movie.Title}`);
    setQuery('');
    setResults([]);
  };

  return (
    <DashboardLayout>

    <Box
      sx={{
          minHeight: '100vh',
          backgroundColor: 'black',
          color: '#fff',
          px: 3,
          py: 5,
        }}
        >
      <Typography variant="h4" gutterBottom>
        Demo Movie Search
      </Typography>

      <Box sx={{ position: 'relative', width: '100%', maxWidth: 500 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search for a movie..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
          InputProps={{
              startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: 'grey.500' }} />
              </InputAdornment>
            ),
        }}
        sx={{
            backgroundColor: 'background.paper',
            borderRadius: 2,
            input: { color: '#fff' },
        }}
        />

        {isFocused && results.length > 0 && (
            <Paper
            elevation={3}
            sx={{
                position: 'absolute',
                width: '100%',
                maxHeight: 300,
                overflow: 'auto',
                mt: 1,
                zIndex: 1,
                backgroundColor: '#1e1e1e',
            }}
            >
            <List dense>
              {results.map((movie) => (
                  <ListItem
                  key={movie.id}
                  button
                  onMouseDown={() => handleSelect(movie)}
                  sx={{
                      '&:hover': {
                          backgroundColor: 'action.hover',
                        },
                    }}
                    >
                  <ListItemText
                    primary={`${movie.Title} (${movie.Year})`}
                    primaryTypographyProps={{ color: 'white' }}
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
