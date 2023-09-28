from flask import Flask, render_template, url_for, Response,request,jsonify
import time
import cv2,os,uuid
import numpy as np


app = Flask(__name__)

# Define the folder to store captured images
image_folder = 'static/images'

@app.route("/")
def hello_world():
    return render_template("index.html")

@app.route('/upload', methods=['POST'])
def upload_image():
    if 'image' not in request.files:
        return jsonify({'error': 'No image file provided'})

    image = request.files['image']

    # # Generate a unique identifier for the session
    # session_id = str(uuid.uuid4())

    # # Create a directory to store images for this session
    # session_image_folder = os.path.join(image_folder, session_id)
    # os.makedirs(session_image_folder, exist_ok=True)

    # Save the uploaded image
    image_path = os.path.join(image_folder, image.filename)
    image.save(image_path)

    return jsonify({'success': 'Image captured and saved'})

if __name__ == "__main__":
    app.run(debug=True)
