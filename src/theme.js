import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2'  
    },
    secondary: {
      main: '#2196f3'  
    },
    background: {
      default: '#e3f2fd'  
    }
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 600,
    }
  },
  spacing: 8
});

export default theme;
