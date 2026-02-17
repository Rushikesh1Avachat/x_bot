import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: { main: '#9747FF', light: '#D7C7F4' },
    background: { default: '#F9F9FB', paper: '#FFFFFF' },
  },
  typography: {
    fontFamily: '"Ubuntu", sans-serif',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: { borderRadius: 8, textTransform: 'none', fontWeight: 'bold' },
      },
    },
  },
});