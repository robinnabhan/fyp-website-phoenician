import React from 'react';
import { Container, Grid, Typography, Link, Box } from '@mui/material';

const Footer: React.FC = () => {
  return (
    <Box component="footer" sx={{ py: 4, bgcolor: 'primary.main', color: 'primary.contrastText' }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" component="h2" gutterBottom>
              Phoenician Letter Predictor
            </Typography>
            <Typography variant="body2">
              Unlocking the secrets of ancient civilizations through AI.
            </Typography>
            <Typography variant="body2" sx={{ mt: 2 }}>
              Please note that our AI model is still in development and may sometimes predict incorrectly. We are continuously working on improving its accuracy.
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" component="h2" gutterBottom>
              Links
            </Typography>
            <Grid container spacing={2}>
              <Grid item>
                <Link href="#" variant="body2" color="inherit">
                  Home
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2" color="inherit">
                  About
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2" color="inherit">
                  Contact
                </Link>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;