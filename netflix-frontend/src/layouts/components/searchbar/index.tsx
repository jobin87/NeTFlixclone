import type { BoxProps } from '@mui/material/Box';

import { useState, useCallback } from 'react';
import Box from '@mui/material/Box';
import SvgIcon from '@mui/material/SvgIcon';
import InputBase from '@mui/material/InputBase';
import { useTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Dialog, { dialogClasses } from '@mui/material/Dialog';

import { useRouter } from 'src/routes/hooks';
import { isExternalLink } from 'src/routes/utils';

import { useBoolean } from 'src/hooks/use-boolean';
import { useEventListener } from 'src/hooks/use-event-listener';

import { Iconify } from 'src/components/iconify';
import { Label } from '@mui/icons-material';

export type SearchbarProps = BoxProps & {
  searchQuery?: string;
  setSearchQuery?: React.Dispatch<React.SetStateAction<string>>;
};

export function Searchbar({ searchQuery: propSearchQuery, setSearchQuery: propSetSearchQuery, sx, ...other }: SearchbarProps) {
  const theme = useTheme();
  const router = useRouter();
  const search = useBoolean();

  // Fallback to internal state if no external state is passed
  const [internalQuery, setInternalQuery] = useState('');
  const searchQuery = propSearchQuery ?? internalQuery;
  const setSearchQuery = propSetSearchQuery ?? setInternalQuery;

  const handleClose = useCallback(() => {
    search.onFalse();
    setSearchQuery('');
  }, [search, setSearchQuery]);

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'k' && event.metaKey) {
      search.onToggle();
      setSearchQuery('');
    }
  };

  useEventListener('keydown', handleKeyDown);

  const handleClick = useCallback(
    (path: string) => {
      if (isExternalLink(path)) {
        window.open(path);
      } else {
        router.push(path);
      }
      handleClose();
    },
    [handleClose, router]
  );

  const handleSearch = useCallback((event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  }, [setSearchQuery]);

  const renderButton = (
    <Box
      display="flex"
      alignItems="center"
      sx={{ border: "1px solid #ccc", borderRadius: "8px", px: 1, py: 0.5, mt: 2, ml: 20 }}
    >
      <IconButton disableRipple>
        <SvgIcon sx={{ width: 20, height: 20 }}>
          <path
            fill="currentColor"
            d="m20.71 19.29l-3.4-3.39A7.92 7.92 0 0 0 19 11a8 8 0 1 0-8 8a7.92 7.92 0 0 0 4.9-1.69l3.39 3.4a1 1 0 0 0 1.42 0a1 1 0 0 0 0-1.42M5 11a6 6 0 1 1 6 6a6 6 0 0 1-6-6"
          />
        </SvgIcon>
      </IconButton>
      <InputBase
        placeholder="Search..."
        value={searchQuery}
        onChange={handleSearch}
        sx={{ ml: 1, flex: 1 }}
      />
    </Box>
  );

  return (
    <>
      {renderButton}

      <Dialog
        fullWidth
        disableRestoreFocus
        maxWidth="sm"
        open={search.value}
        onClose={handleClose}
        transitionDuration={{ enter: theme.transitions.duration.shortest, exit: 0 }}
        PaperProps={{ sx: { mt: 15, overflow: 'unset' } }}
        sx={{ [`& .${dialogClasses.container}`]: { alignItems: 'flex-start' } }}
      >
        <Box sx={{ p: 3, borderBottom: `solid 1px ${theme.vars.palette.divider}` }}>
          <InputBase
            fullWidth
            autoFocus
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearch}
            startAdornment={
              <InputAdornment position="start">
                <Iconify icon="eva:search-fill" width={24} sx={{ color: 'text.disabled' }} />
              </InputAdornment>
            }
            endAdornment={<Label sx={{ letterSpacing: 1, color: 'text.secondary' }}>esc</Label>}
            inputProps={{ sx: { typography: 'h6' } }}
          />
        </Box>
        {/* You can conditionally render search results here */}
      </Dialog>
    </>
  );
}
