import React, { useState, useEffect, useContext, useRef, useCallback } from 'react';
import { Box, Grid, Typography, CircularProgress, TextField, InputAdornment, useMediaQuery } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import GameCard from '../components/GameCard';
import Filter from '../components/Filter';
import { fetchGenres, fetchPlatforms, fetchTags, fetchDevelopers, fetchGames } from '../api/rawg';
import { FavoritesContext } from '../context/FavoritesContext';
import { useSearchParams } from 'react-router-dom';

const Home = () => {
  const [games, setGames] = useState([]);
  const [loadingGames, setLoadingGames] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [filters, setFilters] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [genres, setGenres] = useState([]);
  const [platforms, setPlatforms] = useState([]);
  const [tags, setTags] = useState([]);
  const [developers, setDevelopers] = useState([]);
  const { favorites, toggleFavorite } = useContext(FavoritesContext);
  const [searchParams] = useSearchParams();
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  const observer = useRef();
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const query = searchParams.get('search') || '';
    setSearchText(query);
  }, [searchParams]);

  useEffect(() => {
    fetchGenres().then(data => setGenres(data.results || []));
    fetchPlatforms().then(data => setPlatforms(data.results || []));
    fetchTags().then(data => setTags(data.results || []));
    fetchDevelopers().then(data => setDevelopers(data.results || []));
  }, []);

  useEffect(() => {
    setLoadingGames(true);
    const params = {
      page: currentPage,
      search: searchText,
      year: filters.year,
      genre: filters.genre,
      platform: filters.platform,
      tag: filters.tag,
      developer: filters.developer,
      ordering: '-metacritic'
    };

    fetchGames(params)
      .then(data => {
        setGames(prevGames => currentPage === 1 ? (data.results || []) : [...prevGames, ...(data.results || [])]);
        setTotalPages(Math.ceil(data.count / 20));
        setErrorMessage('');
      })
      .catch(error => {
        console.error("Error fetching games:", error);
        setErrorMessage('Error fetching games. Please try again later.');
        if (currentPage === 1) setGames([]);
      })
      .finally(() => {
        setLoadingGames(false);
      });
  }, [searchText, filters, currentPage]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  // scroll infinito
  const lastGameElementRef = useCallback(node => {
    if (loadingGames) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && currentPage < totalPages) {
        setCurrentPage(prevPage => prevPage + 1);
      }
    });
    if (node) observer.current.observe(node);
  }, [loadingGames, currentPage, totalPages]);

  return (
    <Box sx={{ padding: '1rem', paddingTop: '80px' }}>
      {isMobile && (
        <Box sx={{ mb: 2 }}>
          <TextField
            variant="outlined"
            fullWidth
            placeholder="Search video game..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="action" />
                </InputAdornment>
              )
            }}
          />
        </Box>
      )}
      <Filter
        onFilterChange={handleFilterChange}
        genres={genres}
        platforms={platforms}
        tags={tags}
        developers={developers}
      />
      {games.length === 0 && !loadingGames ? (
        <Typography variant="h6" sx={{ mt: 4, textAlign: 'center' }}>
          No games found.
        </Typography>
      ) : (
        <Grid container spacing={2}>
          {games.map((game, index) => {
            if (games.length === index + 1) {
              return (
                <Grid item xs={12} sm={6} md={3} key={game.id} ref={lastGameElementRef}>
                  <GameCard
                    game={game}
                    onFavorite={toggleFavorite}
                    isFavorite={favorites.some(fav => fav.id === game.id)}
                  />
                </Grid>
              );
            } else {
              return (
                <Grid item xs={12} sm={6} md={3} key={game.id}>
                  <GameCard
                    game={game}
                    onFavorite={toggleFavorite}
                    isFavorite={favorites.some(fav => fav.id === game.id)}
                  />
                </Grid>
              );
            }
          })}
        </Grid>
      )}
      {loadingGames && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          <CircularProgress color="primary" />
        </Box>
      )}
      {errorMessage && (
        <Typography variant="h6" sx={{ mt: 4, textAlign: 'center', color: 'error.main' }}>
          {errorMessage}
        </Typography>
      )}
    </Box>
  );
};

export default Home;
