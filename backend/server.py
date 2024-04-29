from flask import Flask, request, jsonify
from flask_cors import CORS
import tensorflow as tf
from keras.models import load_model
from keras.layers import GlobalAveragePooling2D
from keras.preprocessing.image import img_to_array
from keras.preprocessing.image import ImageDataGenerator
import numpy as np
import cv2
from keras import backend as K

# Import from tensorflow_addons for normalization (if necessary)
try:
  from tensorflow_addons.image import preprocess_input
except ImportError:
  print("tensorflow_addons not installed. Using standard normalization (if applicable).")
  def preprocess_input(x):
    return x / 255.0  # Standard normalization (divide by 255)

# Define model path and class names
MODEL_PATH = r'C:\Users\sim-robinnab\Desktop\fyp-robin-website\model\best-model-16-0.23.h5'
TARGET_SIZE = (256, 256)
classNames = [
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

def F1_Score(y_true, y_pred):
    true_positives      = K.sum(K.round(K.clip(y_true * y_pred, 0, 1)))
    possible_positives  = K.sum(K.round(K.clip(y_true, 0, 1)))
    predicted_positives = K.sum(K.round(K.clip(y_pred, 0, 1)))
    precision           = true_positives / (predicted_positives + K.epsilon())
    recall              = true_positives / (possible_positives + K.epsilon())
    f1_val              = 2 * (precision*recall)/(precision+recall+K.epsilon())
    return f1_val


# Define a function to preprocess the image
def preprocess_image(image):
    """Preprocesses an uploaded image for prediction."""
    try:
        # Get image data from FileStorage object
        image_data = image.read()

        # Convert bytes to a NumPy array
        image_array = np.frombuffer(image_data, np.uint8)
        image_array = cv2.imdecode(image_array, cv2.IMREAD_COLOR)

        # Resize and normalize (adjust if needed)
        # image_array = tf.keras.preprocessing.image.resize(image_array, TARGET_SIZE)
        image_array = preprocess_input(image_array)  # Use appropriate normalization

        # Add batch dimension
        image_array = np.expand_dims(image_array, axis=0)

        return image_array
    except Exception as e:
        print(f"Error processing image: {str(e)}")
        return None  # Indicate error during processing

# Initialize the Flask app
app = Flask(__name__)
CORS(app, origins=['http://localhost:3000']) 

@app.route("/api/predict", methods=["POST"])
def predict():
    """Handles image prediction requests."""
    image = request.files.get("image")
    if not image:
        return jsonify({"error": "No image file uploaded"}), 400

    # Preprocess the image
    processed_image = preprocess_image(image)

    # Check if processing failed (processed_image will be None in that case)
    if processed_image is None:
        return jsonify({"error": "Error processing image"}), 400

    # Load the prediction model (assuming it's saved as 'model.h5')
    model = tf.keras.models.load_model(MODEL_PATH, custom_objects={
        'GlobalAveragePooling2D': GlobalAveragePooling2D,
        'F1_Score': F1_Score  # Pass the F1_Score function as a custom object
        })
    # Make predictions using the model
    predictions = model.predict(processed_image)

    # Process and format predictions (adjust based on your model's output)
    predicted_index = np.argmax(predictions[0])
    predicted_class = classNames[predicted_index]
    predicted_proba = predictions[0][predicted_index] * 100  # Probability as percentage

    # Return the prediction results
    return jsonify({
        "class": str(predicted_class),  # Ensure class is a string
        "probability": float(predicted_proba)  # Cast probability to float
    })
 
    # """Handles image prediction requests."""
    image = request.files.get("image")
    if not image:
        return jsonify({"error": "No image file uploaded"}), 400

    # Preprocess the image
    processed_image = preprocess_image(image)

    # Check if processing failed (processed_image will be None in that case)
    if processed_image is None:
        return jsonify({"error": "Error processing image"}), 400

    if not processed_image:
        return jsonify({"error": "Error processing image"}), 400

    # Load the model (consider using a cache mechanism for efficiency)
    try:
        model = load_model(MODEL_PATH, custom_objects={
            'GlobalAveragePooling2D': GlobalAveragePooling2D
        })
    except Exception as e:
        print(f"Error loading model: {str(e)}")
        return jsonify({"error": "Error loading prediction model"}), 500

    # Make prediction
    predictions = model.predict(processed_image)
    predicted_index = np.argmax(predictions[0])
    predicted_class = classNames[predicted_index]
    prediction_confidence = predictions[0][predicted_index]

    # Return the prediction result
    return jsonify({"class": predicted_class, "confidence": float(prediction_confidence)})

if __name__ == "__main__":
    app.run(debug=True)
