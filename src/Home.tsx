import React from 'react';
import { Container, Grid, Typography, Button, Box } from '@mui/material';
import HeroSection from './HeroSection';
import HowItWorks from './HowItWorks';
import ImageClassifier from './imageupload';

const Home: React.FC = () => {
  return (
  <>
<HeroSection/>
  <HowItWorks/>
 <ImageClassifier/>
  </>
  );
};

export default Home;