

import { createTheme } from '@mui/material/styles';

const palette= {
    primary: {
      main: '#1A237E', // Deep blue
    },
    secondary: {
      main: '#C5CAE9', // Light blue
    },
    accent: {
      main: '#FFA000', // Vibrant orange
    },
    background: {
      default: '#F5F5F5', // Light gray background
    },
  }

const typography = {
    fontFamily: 'monospace', // Change the font family
    h1: {
      fontFamily: 'inherit', // Use a different font for headings
      fontSize: '3rem',
      fontWeight: 700,
      color: '#1A237E',
    },
    h2: {
      fontFamily: 'inherit',
      fontSize: '2.5rem',
      fontWeight: 600,
      color: '#FFA000',
    },
    h3: {
      fontFamily: 'inherit',
      fontSize: '2rem',
      fontWeight: 500,
      color: '#1A237E',
    },
    body1: {
      fontSize: '1rem',
      fontWeight: 400,
      lineHeight: 1.6,
    },
  }

const theme = createTheme({
  palette,
  typography,
  components: {
    MuiContainer: {
      styleOverrides: {
        root: ({ theme }) => ({
          paddingLeft: theme.spacing(3),
          paddingRight: theme.spacing(3),
          paddingTop: theme.spacing(4),
          paddingBottom: theme.spacing(4),
          [theme.breakpoints.up('sm')]: {
            paddingLeft: theme.spacing(4),
            paddingRight: theme.spacing(4),
            paddingTop: theme.spacing(6),
            paddingBottom: theme.spacing(6),
          },
          [theme.breakpoints.up('md')]: {
            paddingLeft: theme.spacing(6),
            paddingRight: theme.spacing(6),
            paddingTop: theme.spacing(8),
            paddingBottom: theme.spacing(8),
          },
          [theme.breakpoints.up('lg')]: {
            paddingLeft: theme.spacing(8),
            paddingRight: theme.spacing(8),
            paddingTop: theme.spacing(10),
            paddingBottom: theme.spacing(10),
          },
          [theme.breakpoints.up('xl')]: {
            paddingLeft: theme.spacing(10),
            paddingRight: theme.spacing(10),
            paddingTop: theme.spacing(12),
            paddingBottom: theme.spacing(12),
          },
          '&.noTopPadding': {
            paddingTop: 0,
          },
        }),
      },
    },
  },
});

export default theme;