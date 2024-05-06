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










// import React, { useState, useEffect } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faSpinner } from '@fortawesome/free-solid-svg-icons';
// import './imageupload.css';
// interface PredictionResult {
//   class: string;
//   confidence: number;
// }

// function ImageClassifier() {
//   const [selectedImage, setSelectedImage] = useState<File | null>(null);
//   const [prediction, setPrediction] = useState<PredictionResult | null>(null);
//   const [isLoading, setIsLoading] = useState(false); // State for loading indicator

//   const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     if (event.target.files) {
//       const selectedImage = event.target.files[0];
//       setSelectedImage(selectedImage);
//     }
//   };

//   const predictImage = async () => {
//     if (!selectedImage) return;

//     setIsLoading(true); // Set loading to true before prediction

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
//     } finally {
//       setIsLoading(false); // Set loading to true after prediction or error
//     }
//   };

//   return (
//     <div>
//       <input type="file" onChange={handleImageChange} />
//       {selectedImage && (
//         <div style={{ display: 'flex', alignItems: 'center', margin: '10px' }}>
//           <img src={URL.createObjectURL(selectedImage)} alt="Selected Image" style={{ width: '150px', height: '150px', objectFit: 'cover' }} />
//           {isLoading && (
//             <div style={{ marginLeft: '10px' }}>
//               <FontAwesomeIcon icon={faSpinner} className="loading-icon" /> {/* Font Awesome icon */}
//             </div>
//           )}
//         </div>
//       )}
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

interface UserCorrection {
  correctedClass: string;
  image?: File; // Optional image data if needed
}

function ImageClassifier() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [prediction, setPrediction] = useState<PredictionResult | null>(null);
  const [isLoading, setIsLoading] = useState(false); // State for loading indicator
  const [showCorrection, setShowCorrection] = useState(false); // State for user correction interface
  const [correctedClass, setCorrectedClass] = useState<string>(''); // User-chosen corrected class

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setSelectedImage(event.target.files[0]);
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

  const handleUserCorrection = async (correctedClass: string) => {
    setCorrectedClass(correctedClass);
    setShowCorrection(false); // Hide correction interface
  
    // Send user feedback to backend (replace with your actual API call)
    try {
      const formData = new FormData();
      formData.append('correctedClass', correctedClass);
      // Include image data only if it's selected (selectedImage is not null)
      if (selectedImage) {
        formData.append('image', selectedImage);
      }
  
      const response = await fetch('http://127.0.0.1:5000/api/report-incorrect', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      console.log('User feedback sent:', data);
      // Add logic to show success message or handle errors (optional)
    } catch (error) {
      console.error('Error sending feedback:', error);
      // Add logic to show error message (optional)
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
        <div>
          <p>Predicted class: {prediction.class} (confidence: {prediction.confidence})</p>
          <button onClick={() => setShowCorrection(true)}>Think it's wrong? Correct it here</button>
          {showCorrection && (
            <div>
              <select value={correctedClass} onChange={(e) => setCorrectedClass(e.target.value)}>
                {/* Replace with your logic to populate classNames */}
                { [
    "Alef",
    "Ayin",
    "Bet",
    "Chet",
    "Dalet",
    "Gimel",
    "He",
    "Kaf",
    "Lamed",
    "Mem",
    "Nun",
    "Pe",
    "Qof",
    "Resh",
    "Samech",
    "Shin",
    "Tav",
    "Tet",
    "Tsadik",
    "Waw",
    "Yod",
    "Zayin"
]
.map((className) => (
                  <option key={className} value={className}>{className}</option>
                ))}
              </select>
              <button onClick={() => handleUserCorrection(correctedClass)}>OK</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default ImageClassifier;
