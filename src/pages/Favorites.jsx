import React, { useState, useEffect } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import GameCard from '../components/GameCard';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const favs = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(favs);
  }, []);

  const handleFavorite = (game) => {
    const updatedFavs = favorites.filter(fav => fav.id !== game.id);
    setFavorites(updatedFavs);
    localStorage.setItem('favorites', JSON.stringify(updatedFavs));
  };

  return (
    <Box sx={{ padding: '1rem' }}>
      <Typography variant="h4" gutterBottom>
        Favoritos
      </Typography>
      {favorites.length === 0 ? (
        <Typography>No tienes juegos favoritos.</Typography>
      ) : (
        <Grid container spacing={2}>
          {favorites.map(game => (
            <Grid item xs={12} sm={6} md={4} key={game.id}>
              <GameCard 
                game={game} 
                onFavorite={handleFavorite} 
                isFavorite={true}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default Favorites;
