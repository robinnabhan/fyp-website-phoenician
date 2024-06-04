import React from 'react';
import { Container, Grid, Typography, Card, CardContent, Box } from '@mui/material';

const HowItWorks: React.FC = () => {
  return (
    <Container maxWidth="lg" >
      <Typography variant="h4" component="h2" align="center" gutterBottom>
        How It Works
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="h3" gutterBottom>
                Upload Image
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Start by uploading an image of a Phoenician letter.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="h3" gutterBottom>
                AI Prediction
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Our AI model will analyze the image and predict the Phoenician letter.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="h3" gutterBottom>
                Get Results
              </Typography>
              <Typography variant="body1" color="text.secondary">
                View the predicted Phoenician letter and its meaning.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default HowItWorks;