
from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np
import pandas as pd

# Initialize Flask App
app = Flask(__name__)
CORS(app)

# Load Model and Scaler
model = joblib.load("model.pkl")
scaler = joblib.load("scaler.pkl")

# Health Check Route
@app.route("/", methods=["GET"])
def home():
    return jsonify({"message": "EduGuard ML API is running"})

feature_names = joblib.load("feature_names.pkl")

# Prediction Route (/predict)

@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json()

    # Start with all zeros
    input_data = {feature: 0 for feature in feature_names}

    # Fill numerical features
    input_data["Study Hours per Week"] = data["study_hours"]
    input_data["Attendance Rate"] = data["attendance_rate"]
    input_data["Previous Grades"] = data["previous_grades"]

    # Binary feature
    input_data["Participation in Extracurricular Activities_Yes"] = data["extracurricular"]

    # Parent education (MATCH EXACT COLUMN NAME)
    parent_map = {
        0: "Parent Education Level_High School",
        1: "Parent Education Level_Bachelor",
        2: "Parent Education Level_Master",
        3: "Parent Education Level_Doctorate"
    }

    input_data[parent_map[data["parent_education"]]] = 1

    input_df = pd.DataFrame([input_data])

    input_scaled = scaler.transform(input_df)
    prediction = model.predict(input_scaled)[0]

    return jsonify({
        "prediction": "Pass" if prediction == 1 else "Fail"
    })





if __name__ == "__main__":
    app.run(debug=True)
