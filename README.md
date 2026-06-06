➜  Local:   http://localhost:5174/

# SmartATS - Resume Scanner & ATS Optimizer

SmartATS is a high-fidelity, interactive Resume ATS (Applicant Tracking System) Scanner & Analyzer dashboard. It helps candidates optimize their resumes against job descriptions by identifying keyword gaps, checking layout formatting, displaying recruiter warnings, and calculating detailed compatibility scores.

## ✨ Features

- **📊 Comprehensive Score Breakdown**: View dynamic match percentages alongside sub-category charts (Keywords Match, Formatting & Layout, Technical ATS Checks).
- **🟢 Matched vs 🔴 Missing Keywords**: Visual pill tags indicating exactly which hard and soft skills are present and which are missing from the resume.
- **✨ Formatting structural Audit**: Verifies font size, bold styling, margins, headers, and footers for ATS parser readability.
- **💡 Recruiter Tips & Recommendations**: Alerts for experience levels, paragraph densities, cliches, online web presence, and dynamic suggestions on how to improve your score.
- **🔒 persistent Authentication**: Session management powered by `localStorage` (mock login & registration).
- **🎨 Glassmorphic Responsive Layout**: Clean dashboard layout with integrated CSS variables supporting Light and Dark theme toggles.
- **💡 Sample Profiles**: Quick-start profiles (Senior Product Manager, Software Engineer) to test the scanner immediately with predefined data.

---

## 🛠️ Tech Stack

- **Framework**: React 19 (Single Page Application scaffolded via Vite)
- **Styling**: Pure CSS (Modern slate-blue theme with full dark-mode support)
- **Logic**: Custom client-side parsing utility for keyword matching

---

## 🚀 Getting Started

Follow these steps to run the application locally on your computer.

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) installed (version 18 or higher is recommended).

### Installation

1. Clone or download the project folder.
2. Open the project folder in your terminal:
   ```bash
   cd resume-analyzer
   ```
3. Install the required dependencies:
   ```bash
   npm install
   ```

### Running Locally

To start the local development server, run:
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser to view the application.

### 💡 Quick Test Credentials
On the login screen, you can use the pre-filled demo account details for instant access:
- **Email**: `demo@example.com`
- **Password**: `demo123`

---

## 🐙 Pushing to GitHub

To publish this project to your own GitHub repository, open your terminal in the project directory and run the following commands:

1. **Initialize a Git repository** (if not already done):
   ```bash
   git init
   ```
2. **Add all files** to the staging area:
   ```bash
   git add .
   ```
3. **Create the initial commit**:
   ```bash
   git commit -m "Initial commit: Complete ATS Resume Analyzer"
   ```
4. **Create a new repository on GitHub** (without adding README or gitignore).
5. **Link your local repository to GitHub** (replace `<USERNAME>` and `<REPO-NAME>` with your GitHub details):
   ```bash
   git branch -M main
   git remote add origin https://github.com/<USERNAME>/<REPO-NAME>.git
   ```
6. **Push the code**:
   ```bash
   git push -u origin main
   ```
