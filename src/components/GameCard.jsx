import React from 'react';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import 'dayjs/locale/en'; 
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  Box,
  IconButton,
  Skeleton,
  Chip
} from '@mui/material';
import {
  FaDesktop,
  FaPlaystation,
  FaXbox,
  FaApple,
  FaAndroid,
  FaGlobe,
  FaLinux,
  FaGamepad,
  FaRegStar,
  FaStar
} from 'react-icons/fa';
import { SiNintendo } from 'react-icons/si';

const getPlatformIcon = (name) => {
  const lower = name.toLowerCase();
  if (lower.includes("pc")) return <FaDesktop size={16} style={{ marginRight: '4px' }} />;
  if (lower.includes("playstation")) return <FaPlaystation size={16} style={{ marginRight: '4px' }} />;
  if (lower.includes("xbox")) return <FaXbox size={16} style={{ marginRight: '4px' }} />;
  if (
    lower.includes("nintendo") ||
    lower.includes("gamecube") ||
    lower.includes("3ds") ||
    lower.includes("ds") ||
    lower.includes("dsi") ||
    lower.includes("64") ||
    lower.includes("advance") ||
    lower.includes("color") ||
    lower.includes("switch")
  ) {
    return <SiNintendo size={16} style={{ marginRight: '4px' }} />;
  }
  if (lower.includes("ios") || lower.includes("macos") || lower.includes("apple"))
    return <FaApple size={16} style={{ marginRight: '4px' }} />;
  if (lower.includes("android")) return <FaAndroid size={16} style={{ marginRight: '4px' }} />;
  if (lower.includes("linux")) return <FaLinux size={16} style={{ marginRight: '4px' }} />;
  if (lower.includes("web")) return <FaGlobe size={16} style={{ marginRight: '4px' }} />;
  return <FaGamepad size={16} style={{ marginRight: '4px' }} />;
};

const GameCard = ({ game, onFavorite, isFavorite }) => {
  const navigate = useNavigate();

  if (!game) {
    return (
      <Card sx={{ maxWidth: 345, margin: '1rem' }}>
        <Skeleton variant="rectangular" height={194} />
        <CardContent>
          <Skeleton variant="text" height={30} />
          <Skeleton variant="text" height={20} width="60%" />
          <Skeleton variant="text" height={20} width="40%" />
          <Skeleton variant="text" height={20} width="80%" />
        </CardContent>
        <CardActions>
          <Skeleton variant="rectangular" height={36} width={80} />
          <Skeleton variant="circular" width={40} height={40} />
        </CardActions>
      </Card>
    );
  }

  return (
    <Card
      onClick={() => navigate(`/game/${game.id}`)}
      sx={{
        maxWidth: 345,
        margin: '1rem',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        cursor: 'pointer',
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': { transform: 'scale(1.02)', boxShadow: 6 }
      }}
    >
      {game.background_image ? (
        <CardMedia
          component="img"
          height="194"
          image={game.background_image}
          alt={game.name}
        />
      ) : (
        <Box
          sx={{
            height: 194,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: 'grey.300'
          }}
        >
          <Typography variant="subtitle1">NO IMAGE</Typography>
        </Box>
      )}
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6" noWrap>
          {game.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Metacritic: {game.metacritic || 'N/A'}
        </Typography>
        {game.released && (
          <Typography variant="body2" color="text.secondary">
            Release: {dayjs(game.released).format("dddd D MMMM ")} of {dayjs(game.released).format("YYYY")} 
          </Typography>
        )}
        {/* Géneros del juego */}
        {game.genres && game.genres.length > 0 && (
          <Box sx={{ mt: 1, display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            {game.genres.map(g => (
              <Chip key={g.id} label={g.name} size="small" />
            ))}
          </Box>
        )}
        {/* Plataformas con sus respectivos íconos */}
        {game.platforms && (
          <Box sx={{ mt: 1 }}>
            <Typography variant="body2" color="text.secondary">
              Platforms:
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {game.platforms.map(p => (
                <Box key={p.platform.id} sx={{ display: 'flex', alignItems: 'center' }}>
                  {getPlatformIcon(p.platform.name)}
                  <Typography variant="caption">{p.platform.name}</Typography>
                </Box>
              ))}
            </Box>
          </Box>
        )}
        {/* Descripción del juego */}
        {game.description_raw && (
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }} noWrap>
            {game.description_raw.length > 100
              ? game.description_raw.substring(0, 100) + '…'
              : game.description_raw}
          </Typography>
        )}
      </CardContent>
      <CardActions onClick={(e) => e.stopPropagation()}>
        <Button
          size="small"
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/game/${game.id}`);
          }}
        >
          Detail
        </Button>
        <IconButton
          onClick={(e) => {
            e.stopPropagation();
            onFavorite(game);
          }}
          aria-label="favorite"
        >
          {isFavorite ? <FaStar color="gold" /> : <FaRegStar />}
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default GameCard;
