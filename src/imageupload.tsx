import React, { useState, useEffect } from 'react';

interface PredictionResult {
  class: string;
  confidence: number;
}

function ImageClassifier() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [prediction, setPrediction] = useState<PredictionResult | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) { // Check if files exist before accessing
      const selectedImage = event.target.files[0];
      setSelectedImage(selectedImage);
    }
  };

  const predictImage = async () => {
    if (!selectedImage) return;

    const formData = new FormData();
    formData.append('image', selectedImage);

    try {
      const response = await fetch('http://127.0.0.1:5000/api/predict', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      setPrediction(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleImageChange} />
      <button onClick={predictImage}>Predict</button>
      {prediction && (
        <p>Predicted class: {prediction.class} (confidence: {prediction.confidence})</p>
      )}
    </div>
  );
}

export default ImageClassifier;
