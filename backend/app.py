from flask import Flask, request, jsonify
from flask_cors import CORS
from utils.parser import extract_text_from_pdf
from utils.analyzer import calculate_ats_score

app = Flask(__name__)
CORS(app)

@app.route("/analyze", methods=["POST"])
def analyze_resume():
    if "resume" not in request.files:
        return jsonify({"error": "No resume uploaded"}), 400

    resume_file = request.files["resume"]
    job_description = request.form.get("job_description")

    resume_text = extract_text_from_pdf(resume_file)
    score = calculate_ats_score(resume_text, job_description)

    return jsonify({
        "ats_score": score
    })

if __name__ == "__main__":
    app.run(debug=True)