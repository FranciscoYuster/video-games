import React, { createContext, useState, useEffect } from 'react';

export const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavs = localStorage.getItem('favorites');
    if (storedFavs) {
      setFavorites(JSON.parse(storedFavs));
    }
  }, []);

  const addFavorite = (game) => {
    setFavorites((prev) => {
      const updated = [...prev, game];
      localStorage.setItem('favorites', JSON.stringify(updated));
      return updated;
    });
  };

  const removeFavorite = (gameId) => {
    setFavorites((prev) => {
      const updated = prev.filter((fav) => fav.id !== gameId);
      localStorage.setItem('favorites', JSON.stringify(updated));
      return updated;
    });
  };

  const toggleFavorite = (game) => {
    if (favorites.find((fav) => fav.id === game.id)) {
      removeFavorite(game.id);
    } else {
      addFavorite(game);
    }
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};
