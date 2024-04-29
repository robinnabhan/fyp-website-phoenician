// import React, { useState, useEffect } from 'react';

// interface PredictionResult {
//   class: string;
//   confidence: number;
// }

// function ImageClassifier() {
//   const [selectedImage, setSelectedImage] = useState<File | null>(null);
//   const [prediction, setPrediction] = useState<PredictionResult | null>(null);

//   const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     if (event.target.files) { // Check if files exist before accessing
//       const selectedImage = event.target.files[0];
//       setSelectedImage(selectedImage);
//     }
//   };

//   const predictImage = async () => {
//     if (!selectedImage) return;

//     const formData = new FormData();
//     formData.append('image', selectedImage);

//     try {
//       const response = await fetch('http://127.0.0.1:5000/api/predict', {
//         method: 'POST',
//         body: formData,
//       });
//       const data = await response.json();
//       setPrediction(data);
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   };

//   return (
//     <div>
//       <input type="file" onChange={handleImageChange} />
//       <button onClick={predictImage}>Predict</button>
//       {prediction && (
//         <p>Predicted class: {prediction.class} (confidence: {prediction.confidence})</p>
//       )}
//     </div>
//   );
// }

// export default ImageClassifier;
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import './imageupload.css';
interface PredictionResult {
  class: string;
  confidence: number;
}

function ImageClassifier() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [prediction, setPrediction] = useState<PredictionResult | null>(null);
  const [isLoading, setIsLoading] = useState(false); // State for loading indicator

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const selectedImage = event.target.files[0];
      setSelectedImage(selectedImage);
    }
  };

  const predictImage = async () => {
    if (!selectedImage) return;

    setIsLoading(true); // Set loading to true before prediction

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
    } finally {
      setIsLoading(false); // Set loading to true after prediction or error
    }
  };

  return (
    <div>
      <input type="file" onChange={handleImageChange} />
      {selectedImage && (
        <div style={{ display: 'flex', alignItems: 'center', margin: '10px' }}>
          <img src={URL.createObjectURL(selectedImage)} alt="Selected Image" style={{ width: '150px', height: '150px', objectFit: 'cover' }} />
          {isLoading && (
            <div style={{ marginLeft: '10px' }}>
              <FontAwesomeIcon icon={faSpinner} className="loading-icon" /> {/* Font Awesome icon */}
            </div>
          )}
        </div>
      )}
      <button onClick={predictImage}>Predict</button>
      {prediction && (
        <p>Predicted class: {prediction.class} (confidence: {prediction.confidence})</p>
      )}
    </div>
  );
}

export default ImageClassifier;

