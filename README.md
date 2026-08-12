# Smart Resume Analyzer

> AI-powered resume analysis tool that evaluates how well a resume matches a target job description.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Try%20It-success)](https://smart-resume-analyzer-lemon.vercel.app/)

## 🎯 Overview

Smart Resume Analyzer helps job seekers understand how closely their resume aligns with a job description. It extracts resume text, analyzes keyword relevance, calculates an ATS-style similarity score, and highlights potential missing keywords.

## ✨ Features

- 📄 PDF resume upload
- 📝 Job-description input
- 📊 ATS-style matching score
- 🔎 Keyword and skill-gap identification
- ⚡ React-based web interface
- 🔌 Flask backend API

## 🛠️ Tech Stack

| Layer | Technologies |
|---|---|
| Frontend | React.js |
| Backend | Flask, Python |
| NLP | TF-IDF, cosine similarity |
| PDF Processing | PyMuPDF |
| Deployment | Vercel (frontend) |

## 📁 Structure

```text
smart-resume-analyzer/
├── backend/          # Flask API and resume processing
├── frontend/         # Frontend application
├── public/           # Public frontend assets
├── src/              # Frontend source code
└── Final output/     # Project output/reference files
```

## 🚀 Run Locally

### 1. Backend

```bash
cd backend
pip install -r requirements.txt
python app.py
```

### 2. Frontend

```bash
cd frontend
npm install
npm start
```

## 🧠 How It Works

```text
Resume PDF + Job Description
          ↓
     Text Extraction
          ↓
   TF-IDF Vectorization
          ↓
 Cosine Similarity Analysis
          ↓
 Matching Score + Missing Keywords
```

## 🔮 Future Improvements

- Semantic embeddings for deeper skill matching
- Section-level resume analysis
- Job-specific improvement suggestions
- Authentication and saved analysis history

## 📌 Status

Active portfolio project.
