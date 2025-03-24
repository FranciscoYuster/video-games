const API_KEY = import.meta.env.VITE_RAWG_API_KEY;
const BASE_URL = 'https://api.rawg.io/api';

const handleResponse = (res) => {
  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }
  return res.json();
};

export const fetchGenres = () => {
  return fetch(`${BASE_URL}/genres?key=${API_KEY}`)
    .then(handleResponse)
    .catch(error => {
      console.error("Error in fetchGenres:", error);
      throw error;
    });
};

export const fetchPlatforms = () => {
  return fetch(`${BASE_URL}/platforms?key=${API_KEY}`)
    .then(handleResponse)
    .catch(error => {
      console.error("Error in fetchPlatforms:", error);
      throw error;
    });
};

export const fetchTags = () => {
  return fetch(`${BASE_URL}/tags?key=${API_KEY}`)
    .then(handleResponse)
    .catch(error => {
      console.error("Error in fetchTags:", error);
      throw error;
    });
};

export const fetchDevelopers = () => {
  return fetch(`${BASE_URL}/developers?key=${API_KEY}`)
    .then(handleResponse)
    .catch(error => {
      console.error("Error in fetchDevelopers:", error);
      throw error;
    });
};

export const fetchGames = (params = {}) => {
  let url = `${BASE_URL}/games?key=${API_KEY}&ordering=${params.ordering || '-metacritic'}&page=${params.page || 1}`;

  if (params.search) {
    url += `&search=${params.search}`;
  }

  if (params.year) {
    if (params.year.includes(',')) {
      url += `&dates=${params.year}`;
    } else {
      url += `&dates=${params.year}-01-01,${params.year}-12-31`;
    }
  }

  if (params.genre) {
    url += `&genres=${params.genre}`;
  }
  if (params.platform) {
    url += `&platforms=${params.platform}`;
  }
  if (params.tag && Array.isArray(params.tag) && params.tag.length > 0) {
    url += `&tags=${params.tag.join(',')}`;
  }
  if (params.developer) {
    url += `&developers=${params.developer}`;
  }

  console.log("FetchGames URL:", url);

  return fetch(url)
    .then(handleResponse)
    .catch(error => {
      console.error("Error in fetchGames:", error);
      throw error;
    });
};

export const fetchGameDetails = (id) => {
  return fetch(`${BASE_URL}/games/${id}?key=${API_KEY}`)
    .then(handleResponse)
    .catch(error => {
      console.error("Error in fetchGameDetails:", error);
      throw error;
    });
};

export const fetchGameTrailer = (id) => {
  return fetch(`${BASE_URL}/games/${id}/movies?key=${API_KEY}`)
    .then(handleResponse)
    .then(data => (data.results && data.results.length > 0 ? data.results[0] : null))
    .catch(error => {
      console.error("Error in fetchGameTrailer:", error);
      throw error;
    });
};

export const fetchGameScreenshots = (id) => {
  return fetch(`${BASE_URL}/games/${id}/screenshots?key=${API_KEY}`)
    .then(handleResponse)
    .catch(error => {
      console.error("Error in fetchGameScreenshots:", error);
      throw error;
    });
};

export const fetchGameAchievements = (id) => {
  return fetch(`${BASE_URL}/games/${id}/achievements?key=${API_KEY}`)
    .then(handleResponse)
    .catch(error => {
      console.error("Error in fetchGameAchievements:", error);
      throw error;
    });
};
