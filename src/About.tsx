import React from 'react';
import { Container, Typography, Box, Grid } from '@mui/material';

const About: React.FC = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Typography variant="h3" component="h1" align="center" gutterBottom>
        About Our Project
      </Typography>
      <Box sx={{ my: 4 }}>
        <Typography variant="body1" paragraph align="justify">
          Welcome to our Phoenician Letter Prediction project! We are a team of passionate researchers dedicated to exploring the rich history and cultural heritage of ancient civilizations. Our goal is to leverage the power of modern artificial intelligence technologies to uncover and preserve the knowledge hidden within ancient texts and inscriptions.
        </Typography>
        <Typography variant="body1" paragraph align="justify">
          The Phoenician alphabet is one of the earliest known writing systems, dating back to around 1050 BC. It served as the foundation for many modern alphabets, including the Greek and Latin scripts. However, deciphering and interpreting Phoenician texts has been a challenging task due to the scarcity of surviving records and the complexity of the language.
        </Typography>
      </Box>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Typography variant="h5" component="h2" gutterBottom>
            Our Mission
          </Typography>
          <Typography variant="body1" paragraph>
            Our mission is to develop an advanced AI model capable of accurately predicting and interpreting Phoenician letters from ancient inscriptions and artifacts. By leveraging cutting-edge deep learning techniques and a vast dataset of Phoenician texts, we aim to create a powerful tool that can aid researchers, historians, and archaeologists in their quest to unravel the mysteries of this remarkable civilization.
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h5" component="h2" gutterBottom>
            Our Approach
          </Typography>
          <Typography variant="body1" paragraph>
            We employ a multidisciplinary approach, combining expertise in computer science, linguistics, and archaeology. Our team consists of researchers from various fields who collaborate closely to ensure the accuracy and relevance of our work. By integrating domain knowledge and state-of-the-art AI techniques, we strive to create a comprehensive solution that can contribute to the preservation and dissemination of Phoenician cultural heritage.
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
};

export default About;