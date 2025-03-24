import React, { useContext, useState } from 'react';
import { IconButton, Menu, MenuItem, ListItemText, Avatar, Badge, Box } from '@mui/material';
import { FaStar } from 'react-icons/fa';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import { FavoritesContext } from '../context/FavoritesContext';

const FavoritesDropdown = () => {
  const { favorites, removeFavorite } = useContext(FavoritesContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleItemClick = (id) => {
    navigate(`/game/${id}`);
    handleClose();
  };

  const handleRemove = (e, id) => {
    e.stopPropagation();
    removeFavorite(id);
  };

  return (
    <>
      <IconButton onClick={handleClick} color="inherit">
        <Badge color="error" badgeContent={favorites.length}>
          <FaStar color="gold" size={24} />
        </Badge>
      </IconButton>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        {favorites.length === 0 ? (
          <MenuItem disabled>
            <ListItemText primary="You have no favorites" />
          </MenuItem>
        ) : (
          favorites.map((game) => (
            <MenuItem key={game.id} onClick={() => handleItemClick(game.id)} sx={{ gap: 1 }}>
              {game.background_image ? (
                <Avatar alt={game.name} src={game.background_image} sx={{ width: 32, height: 32 }} />
              ) : (
                <Avatar sx={{ width: 32, height: 32 }}>
                  {game.name.charAt(0)}
                </Avatar>
              )}
              <ListItemText primary={game.name} />
              <Box sx={{ ml: 'auto' }}>
                <IconButton
                  size="small"
                  onClick={(e) => handleRemove(e, game.id)}
                  edge="end"
                  aria-label="remove favorite"
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Box>
            </MenuItem>
          ))
        )}
      </Menu>
    </>
  );
};

export default FavoritesDropdown;
