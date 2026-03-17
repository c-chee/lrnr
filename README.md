# LRNR App - AI Quiz Generator

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [CI/CD Pipeline](#cicd-pipeline)
- [Installation](#installation)
- [Usage](#usage)
- [Accessibility & Responsiveness](#accessibility--responsiveness)

---

## Overview

**LRNR** is a web application that generates customized quizzes using the **OpenAI API**. The platform allows users to instantly create personalized quizzes by selecting their preferred learning parameters, including:

- **Topic** – the subject of the quiz
- **Expertise Level** – novice, intermediate, or expert
- **Number of Questions** – between 1 and 20
- **Question Style** – such as formal, multiple choice, true/false, or short answer

Users can generate quizzes **without creating an account**, enabling quick access to learning tools. However, users who choose to **sign up** unlock additional features designed to enhance engagement and track progress, including:

- **Saved Prompt History** – store previous quiz prompts
- **Quick Quiz Regeneration** – instantly recreate quizzes from past prompt history
- **Daily Streak Tracking** – encourage consistent learning habits
- **Point-Based Reward System** – encourage learning and motivate continued usage

The application is built using **Next.js**, with a **Railway-hosted database** for storing user data and quiz history. The user interface is styled with **Tailwind CSS**, ensuring a clean design and full responsiveness across mobile, tablet, and desktop devices.

---

## Features

- **AI Quiz Generation**
  - Generate quizzes using a custom prompt
  - Choose topic, difficulty level, number of questions (1–20), and question style
  - Quizzes are generated dynamically using the OpenAI API

- **User Accounts**
  - Save quiz prompt history
  - Regenerate quizzes from previous prompts
  - Preserves form typing history
  - Additional Features:
    - **Quiz History**
        - View previously generated quizzes
        - Click history items to automatically refill the quiz form
        - Quickly regenerate past quizzes
    - **Points System**
        - Earn points for completing quizzes
        - Points accumulate to gamify the learning experience
    - **Daily Streak Tracking**
        - Tracks consecutive days a user logs in
        - Encourages consistent practice and engagement

- **Adaptive Themes**
  - Automatically supports light and dark mode
  - Adjusts based on device or system settings

- **Reusable Components**
  - Shared UI components improve maintainability and consistency

---

## Tech Stack

### Frontend
- Next.js
- React
- HTML
- Tailwind

### Backend / APIs
- Hugging Face API – AI quiz generation

### Database
- Railway – hosted database for storing user accounts and history

### Deployment
- Vercel – hosting and deployment

---

## CI/CD Pipeline

The LRNR application follows **Continuous Integration and Continuous Deployment (CI/CD)** practices to ensure reliable builds and fast deployments.

### Continuous Integration

When changes are pushed to the GitHub repository:

- The project is automatically built
- Dependencies are installed
- The application is checked for build errors

This ensures new code integrates correctly with the existing codebase.

### Continuous Deployment

Once code is merged into the **main branch**, the application is automatically deployed through **Vercel**.

The deployment pipeline includes:

1. Push code to GitHub
2. Vercel detects the update
3. The Next.js project is built
4. The updated version is deployed automatically

This workflow enables:

- Faster development cycles
- Automatic deployments
- Reduced manual deployment errors

---

## Installation

To run this project locally:

```bash
# Clone the repository
git clone https://git@github.com:c-chee/lrnr.git

# Navigate into the project
cd lrnr

# Install dependencies
npm install
```

Create environment variables:

``` bash
# Example found in `.env.example` file.
.env.local
```

Run the development server:

```bash
npm run dev
```

Open in your browser:

``` bash
http://localhost:3000
```

---

##  Usage

1. Navigate to the **Quiz Generator Page**
2. Fill out the quiz form:
   - Topic
   - Difficulty level
   - Number of questions (1–20)
   - Question style
3. Submit the form
4. The AI generates a customized quiz
5. Complete the quiz

If logged in, the quiz prompt will also be saved to your history and points will be tracked.

---

## Accessibility & Responsiveness

The site follows best practices for accessibility and responsive design.

- HTML & CSS validated
- WCAG 2.0 AA accessibility standards
- Responsive layout
- Media queries for multiple screen sizes

