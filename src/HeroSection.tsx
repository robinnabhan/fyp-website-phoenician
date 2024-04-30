import React from 'react';
import { Container, Grid, Typography, Button, Box } from '@mui/material';

const HeroSection: React.FC = () => {
  return (
    <Container maxWidth="lg" sx={{ my: 8 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Typography variant="h3" component="h1" gutterBottom>
            Unlock the Secrets of Phoenician Letters
          </Typography>
          <Typography variant="body1" paragraph>
            Our AI model can accurately predict Phoenician letters from images, helping you decipher ancient texts and uncover hidden knowledge.
          </Typography>
          <Box mt={2}>
            <Button variant="contained" color="primary" size="large">
              Try It Now
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          {/* Place your image or illustration here */}
          <img src="https://cdn.pixabay.com/photo/2018/06/28/17/49/archaeology-3504441_1280.jpg" alt="Phoenician Letters" style={{ maxWidth: '100%' }} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default HeroSection;