import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import dayjs from 'dayjs';
import 'dayjs/locale/en'; 
import {
  Box,
  Typography,
  Button,
  CardMedia,
  Grid,
  Paper,
  Link as MuiLink,
  Skeleton
} from '@mui/material';
import {
  fetchGameDetails,
  fetchGameTrailer,
  fetchGameScreenshots,
  fetchGameAchievements
} from '../api/rawg';
import {
  FaDesktop,
  FaPlaystation,
  FaXbox,
  FaApple,
  FaAndroid,
  FaGlobe,
  FaLinux,
  FaGamepad
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

const GameDetail = () => {
  const { id } = useParams();
  const [game, setGame] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [screenshots, setScreenshots] = useState([]);
  const [achievements, setAchievements] = useState([]);

  useEffect(() => {
    fetchGameDetails(id).then(data => setGame(data));
    fetchGameTrailer(id).then(data => {
      if (data && data.results && data.results.length > 0) {
        setTrailer(data.results[0]);
      } else {
        setTrailer(null);
      }
    });
  }, [id]);

  useEffect(() => {
    fetchGameScreenshots(id)
      .then(data => {
        if (data && data.results) {
          setScreenshots(data.results);
        }
      })
      .catch(error => console.error("Error fetching screenshots:", error));
  }, [id]);

  useEffect(() => {
    fetchGameAchievements(id)
      .then(data => {
        if (data && data.results) {
          setAchievements(data.results);
        }
      })
      .catch(error => console.error("Error fetching achievements:", error));
  }, [id]);

  if (!game)
    return (
      <Box sx={{ padding: 2, paddingTop: '100px' }}>
        <Skeleton variant="rectangular" height={500} animation="wave" />
        <Box sx={{ mt: 2 }}>
          <Skeleton variant="text" height={40} width="60%" animation="wave" />
          <Skeleton variant="text" height={20} animation="wave" />
          <Skeleton variant="text" height={20} width="80%" animation="wave" />
          <Skeleton variant="text" height={20} width="40%" animation="wave" />
        </Box>
      </Box>
    );

  return (
    <Box sx={{ padding: 2, paddingTop: '100px' }}>
      {/* Banner with main image or "NO IMAGE" placeholder */}
      {game.background_image ? (
        <CardMedia
          component="img"
          image={game.background_image}
          alt={game.name}
          sx={{
            width: '100%',
            maxHeight: 500,
            objectFit: 'cover',
            borderRadius: 2,
          }}
        />
      ) : (
        <Box
          sx={{
            height: 500,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: 'grey.300',
            borderRadius: 2,
          }}
        >
          <Typography variant="subtitle1">NO IMAGE</Typography>
        </Box>
      )}

      {/* Game information */}
      <Paper sx={{ padding: 3, mt: 3 }}>
        <Typography variant="h4" gutterBottom>
          {game.name}
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            <Typography variant="body1" sx={{ whiteSpace: 'pre-line' }}>
              {(game.description_raw && game.description_raw.replace(/#/g, '')) || 'No description available.'}
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="subtitle1">
              <strong>Genres:</strong> {game.genres.map(g => g.name).join(', ')}
            </Typography>
            <Typography variant="subtitle1" sx={{ mt: 1 }}>
              <strong>Platforms:</strong>
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 0.5 }}>
              {game.platforms.map(p => (
                <Box key={p.platform.id} sx={{ display: 'flex', alignItems: 'center' }}>
                  {getPlatformIcon(p.platform.name)}
                  <Typography variant="caption">{p.platform.name}</Typography>
                </Box>
              ))}
            </Box>
            {/* Formato de fecha consistente con GameCard */}
            {game.released ? (
              <Typography variant="subtitle1" sx={{ mt: 1 }}>
                <strong>Release:</strong> {dayjs(game.released).format("dddd D MMMM")} of {dayjs(game.released).format("YYYY")}
              </Typography>
            ) : (
              <Typography variant="subtitle1" sx={{ mt: 1 }}>
                <strong>Release:</strong> N/A
              </Typography>
            )}
            <Typography variant="subtitle1" sx={{ mt: 1 }}>
              <strong>Score:</strong> {game.metacritic || 'N/A'}
            </Typography>
            {game.website && (
              <MuiLink
                href={game.website}
                target="_blank"
                rel="noopener"
                sx={{ mt: 1, display: 'block' }}
              >
                Official Website
              </MuiLink>
            )}
          </Grid>
        </Grid>
      </Paper>

      {/* Trailer section */}
      <Paper sx={{ padding: 2, mt: 3 }}>
        <Typography variant="h5" gutterBottom>
          Trailer
        </Typography>
        {trailer ? (
          <Box component="video" controls sx={{ width: '100%', maxHeight: 500 }}>
            <source src={trailer.data.max} type="video/mp4" />
            Your browser does not support video.
          </Box>
        ) : (
          <Typography variant="body1">No trailer available.</Typography>
        )}
      </Paper>

      {/* Screenshots section */}
      <Paper sx={{ padding: 2, mt: 3 }}>
        <Typography variant="h5" gutterBottom>
          Screenshots
        </Typography>
        {screenshots && screenshots.length > 0 ? (
          <Grid container spacing={2}>
            {screenshots.map(screenshot => (
              <Grid item xs={12} sm={6} md={4} key={screenshot.id}>
                <CardMedia
                  component="img"
                  image={screenshot.image}
                  alt="Screenshot"
                  sx={{ width: '100%', borderRadius: 1 }}
                />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography variant="body1">No screenshots available.</Typography>
        )}
      </Paper>

      {/* Achievements section */}
      <Paper sx={{ padding: 2, mt: 3 }}>
        <Typography variant="h5" gutterBottom>
          Achievements
        </Typography>
        {achievements && achievements.length > 0 ? (
          <Grid container spacing={2}>
            {achievements.map(ach => (
              <Grid item xs={12} sm={6} md={4} key={ach.id}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <CardMedia
                    component="img"
                    image={ach.image}
                    alt={ach.name}
                    sx={{ width: 64, height: 64, borderRadius: 1 }}
                  />
                  <Box>
                    <Typography variant="subtitle1">{ach.name}</Typography>
                    <Typography variant="body2">{ach.description}</Typography>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography variant="body1">No achievements available.</Typography>
        )}
      </Paper>

      <Button variant="contained" sx={{ mt: 3 }} component={Link} to="/">
        Back to list
      </Button>
    </Box>
  );
};

export default GameDetail;
