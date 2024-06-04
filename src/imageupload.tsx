import React, { useState, useRef } from 'react';
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Typography,
  Snackbar,
  Container,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';

interface PredictionResult {
  class: string;
  probability: number;
}

const ImageClassifier: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [prediction, setPrediction] = useState<PredictionResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showCorrection, setShowCorrection] = useState(false);
  const [correctedClass, setCorrectedClass] = useState<string>('');
  const [showSuccessNotification, setShowSuccessNotification] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const classNames = [
    'Alef',
    'Ayin',
    'Bet',
    'Chet',
    'Dalet',
    'Gimel',
    'He',
    'Kaf',
    'Lamed',
    'Mem',
    'Nun',
    'Pe',
    'Qof',
    'Resh',
    'Samech',
    'Shin',
    'Tav',
    'Tet',
    'Tsadik',
    'Waw',
    'Yod',
    'Zayin',
  ];

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setSelectedImage(event.target.files[0]);
    }
  };

  const predictImage = async () => {
    if (!selectedImage) return;

    setIsLoading(true);

    const formData = new FormData();
    formData.append('image', selectedImage);

    try {
      const response = await fetch('http://127.0.0.1:5000/api/predict', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      console.log(data)
      setPrediction(data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUserCorrection = async (correctedClass: string) => {
    setCorrectedClass(correctedClass);
    setShowCorrection(false);

    try {
      const formData = new FormData();
      formData.append('correctedClass', correctedClass);
      if (selectedImage) {
        formData.append('image', selectedImage);
      }

      const response = await fetch('http://127.0.0.1:5000/api/report-incorrect', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      console.log('User feedback sent:', data);
      setShowSuccessNotification(true); // Show success notification
    } catch (error) {
      console.error('Error sending feedback:', error);
    }
  };

  const handleCloseNotification = () => {
    setShowSuccessNotification(false);
  };

  return (
    <Container maxWidth="lg" sx={{ my: 8 }}>
      <Box sx={{ padding: 2 }}>
        <input
          type="file"
          onChange={handleImageChange}
          ref={fileInputRef}
          style={{ display: 'none' }}
        />
        <Button variant="contained" onClick={() => fileInputRef.current?.click()}>
          Upload Image
        </Button>
        {selectedImage && (
          <Box sx={{ display: 'flex', alignItems: 'center', margin: '10px' }}>
            <img
              src={URL.createObjectURL(selectedImage)}
              alt="Selected Image"
              style={{ width: '300px', height: '300px', objectFit: 'cover' }}
            />
            {isLoading && (
              <Box sx={{ marginLeft: '10px' }}>
                <CircularProgress />
              </Box>
            )}
          </Box>
        )}
        <Button
          variant="contained"
          onClick={predictImage}
          disabled={!selectedImage}
          sx={{ marginTop: 2 }}
        >
          Predict
        </Button>
        {prediction && (
          <Box sx={{ marginTop: 2 }}>
            <Typography variant="body1">
              Predicted class: {prediction.class} (confidence: {prediction.probability})
            </Typography>
            <Button
              variant="outlined"
              onClick={() => setShowCorrection(true)}
              sx={{ marginTop: 1 }}
            >
              Think it's wrong? Correct it here
            </Button>
            {showCorrection && (
              <Box sx={{ marginTop: 2 }}>
                <Typography variant="body1">Select the correct class:</Typography>
                <FormControl sx={{width:"20vw"}}>
                  <InputLabel id="corrected-class-label">Corrected Class</InputLabel>
                  <Select
                    labelId="corrected-class-label"
                    value={correctedClass}
                    onChange={(e) => setCorrectedClass(e.target.value)}
                    label="Corrected Class"
                  >
                    {classNames.map((className) => (
                      <MenuItem key={className} value={className}>
                        {className}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <Button
                  variant="contained"
                  onClick={() => handleUserCorrection(correctedClass)}
                  sx={{ marginTop: 1 }}
                >
                  OK
                </Button>
              </Box>
            )}
          </Box>
        )}
        <Snackbar
          open={showSuccessNotification}
          autoHideDuration={3000}
          onClose={handleCloseNotification}
          message="User feedback sent successfully!"
        />
      </Box>
    </Container>
  );
};

export default ImageClassifier;