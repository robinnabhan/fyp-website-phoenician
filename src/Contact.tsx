import React, { useEffect, useState } from 'react';
import { useForm ,ValidationError} from '@formspree/react';
import { Container, Typography, Box, Grid, TextField, Button } from '@mui/material';

interface FormData {
  name: string;
  email: string;
  message: string;
}

const ContactUs: React.FC = () => {
  const [showSuccess, setShowSuccess] = useState(false);

  const [state, handleSubmit] = useForm("mwkgzlwz");

 
  useEffect(() => {
    if (state.succeeded) {
      setShowSuccess(true);
    }
  }, [state.succeeded]);

  const handleCloseSuccess = () => {
    setShowSuccess(false);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Typography variant="h3" component="h1" align="center" gutterBottom>
        Contact Us
      </Typography>
      <Box sx={{ my: 4 }}>
        <Typography variant="body1" paragraph align="center">
          We would love to hear from you! Feel free to reach out using the form below.
        </Typography>
      </Box>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Typography variant="h5" component="h2" gutterBottom>
            Get in Touch
          </Typography>
          <form onSubmit={handleSubmit}>
            {state.succeeded && (
              <Typography variant="body1" color="success" gutterBottom>
                Your message has been sent successfully.
              </Typography>
            )}
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                
                  label="Name"
                  variant="outlined"
                  fullWidth
                  id="name"
                  type="text"
                  name="name"
                  
                />
                  <ValidationError
        prefix="Name"
        field="name"
        errors={state.errors}
      />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  id="email"
                  variant="outlined"
                  type="email"
                  fullWidth
                  name="email"
                />
                <ValidationError
        prefix="Email"
        field="email"
        errors={state.errors}
      />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  id="message"
                  label="Message"
                  variant="outlined"
                  multiline
                  rows={4}
                  fullWidth
                  name="message"
                  
                />
                           <ValidationError
        prefix="Message"
        field="message"
        errors={state.errors}
      />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  disabled={state.submitting}
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ContactUs;
