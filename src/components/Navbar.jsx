import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  TextField,
  Box,
  InputAdornment,
  useMediaQuery
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import FavoritesDropdown from './FavoritesDropdown';

const Navbar = () => {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState('');
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));

  const handleSearch = () => {
    navigate(`/?search=${encodeURIComponent(searchText)}`);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <AppBar
      position="fixed"
      sx={{ backgroundColor: '#333', zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Video Games Challenge - By Francisco Yuster
        </Typography>
        {!isMobile && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <TextField
              variant="outlined"
              size="small"
              placeholder="Search video game..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onKeyDown={handleKeyDown}
              sx={{ backgroundColor: 'white', borderRadius: 1 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="action" />
                  </InputAdornment>
                )
              }}
            />
            <Button
              variant="contained"
              color="primary" 
              onClick={handleSearch}
              sx={{
                borderRadius: 2,
                textTransform: 'none',
                fontWeight: 'bold'
              }}
            >
              Search
            </Button>
          </Box>
        )}
        <Button color="inherit" component={Link} to="/">
          Home
        </Button>
        <FavoritesDropdown />
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
