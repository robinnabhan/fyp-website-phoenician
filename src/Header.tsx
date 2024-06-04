import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Phoenician Letter Predictor
        </Typography>
        <Box>
          <Link to='/'  style={{ textDecoration: 'none', color: 'inherit',}}><Button color="inherit">Home</Button></Link>
          <Link to='/about'  style={{ textDecoration: 'none', color: 'inherit',}}>  <Button color="inherit">About</Button></Link> 
          <Link to='/Comtact'  style={{ textDecoration: 'none', color: 'inherit',}}><Button color="inherit">Contact</Button></Link> 
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;