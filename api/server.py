import io
import os
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
from PIL import Image
import datetime
# from flask_mail import Mail, Message


# Import from tensorflow_addons for normalization (if necessary)
try:
  from tensorflow_addons.image import preprocess_input
except ImportError:
  print("tensorflow_addons not installed. Using standard normalization (if applicable).")
  def preprocess_input(x):
    return x / 255.0  # Standard normalization (divide by 255)


# Define model path and class names
MODEL_PATH = r'model\best-model-16-0.23.h5'
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

        # Convert bytes to a PIL Image object
        pil_image = Image.open(io.BytesIO(image_data))

        # Convert the image to RGB mode to remove alpha channel
        pil_image = pil_image.convert("RGB")

        # Resize the image to the target size
        pil_image = pil_image.resize(TARGET_SIZE)

        # Convert the PIL Image to a NumPy array
        image_array = np.array(pil_image)

        # Normalize the image (adjust if needed)
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

# # Configure the Flask-Mail extension
# app.config['MAIL_SERVER'] = 'smtp.gmail.com'
# app.config['MAIL_PORT'] = 465
# app.config['MAIL_USERNAME'] = 'phoenicianimagerecognition@gmail.com'  # Replace with your Gmail email address
# app.config['MAIL_PASSWORD'] = 'adsy ocgm zxoz xoyn'  # Replace with your Gmail app password
# app.config['MAIL_USE_TLS'] = False
# app.config['MAIL_USE_SSL'] = True

# mail = Mail(app)


# @app.route('/api/contact', methods=['POST'])
# def send_contact_email():
#     name = request.form.get('name')
#     email = request.form.get('email')
#     message = request.form.get('message')

#     if not name or not email or not message:
#         return jsonify({'error': 'Please provide all required fields'}), 400

#     try:
#         msg = Message(f'New Contact Form Submission from {name}', sender=email, recipients=['robinnabhan@gmail.com'])
#         msg.body = f'Name: {name}\nEmail: {email}\nMessage: {message}'
#         mail.send(msg)
#         return jsonify({'message': 'Your message has been sent successfully'}), 200
#     except Exception as e:
#         return jsonify({'error': str(e)}), 500

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


@app.route('/api/report-incorrect', methods=['POST'])
def report_incorrect():
  """Handles user feedback for incorrect predictions."""
  if not request.form:  # Check for data in form (can be multipart or urlencoded)
    return jsonify({'error': 'No data provided'}), 400
  print(request.form)
  corrected_class = request.form.get('correctedClass')
  image_data = request.files.get('image')  # Optional, depending on your needs

  # Implement logic to store image in user_feedback folder based on corrected_class
  if image_data:
    feedback_dir = os.path.join('user_feedback', corrected_class)
  # Check if subfolder doesn't exist before creating with exist_ok=True
    if not os.path.exists(feedback_dir):
      os.makedirs(feedback_dir, exist_ok=True)  # Create folder if it doesn't exist
    timestamp = datetime.datetime.now().strftime('%Y-%m-%d_%H-%M-%S')
    filename = f'{request.remote_addr}_{corrected_class}_{timestamp}.jpg'  # Unique filename with user IP
    filepath = os.path.join(feedback_dir, filename)
    with open(filepath, 'wb') as f:
      f.write(image_data.read())

  # You can optionally store additional user feedback information in a database here

  return jsonify({'message': 'Feedback received'}), 200

if __name__ == "__main__":
    app.run(debug=True)
