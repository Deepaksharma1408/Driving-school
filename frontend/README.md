# 🚗 CANGURUBER DRIVING SCHOOL — Official Web Application

A cinematic, modern, editorial web application built for **Canguruber Driving School (NSW, Australia)**. Designed with award-level automotive aesthetics, live driving video motion, interactive journey tracking, structured service presentation, and a multi-step booking engine.

---

## 🌟 Key Features

1. **🎬 Live Moving Car Hero & Fast Cinematic Intro**:
   - Continuous 1080p web-optimized driving video background.
   - Left-aligned text scrim protecting typography without obscuring the vehicle.
   - Fast, staggered title reveal sequence (`GET YOUR` ➔ `AUSTRALIAN` ➔ `DRIVER'S LICENCE` ➔ `WITH CONFIDENCE.`).
   - Floating 4-column trust strip with Google reviews and NSW Transport credentials.

2. **🛣️ Interactive Roadway Journey (`LEARN` ➔ `PASS`)**:
   - Highway track where a vehicle rig physically travels across licensing milestones.
   - Clickable interactive stages with scoring audit checklists and zero dark-contrast issues.

3. **🚘 Live Service NSW Mock Test Simulation**:
   - Real continuous driving video feed with Live HUD Telemetry (58 KM/H, Dual Control, Service NSW Route).

4. **🏎️ Luxury Automotive Design System**:
   - Palette: Deep Charcoal (`#07131D`), Deep Navy (`#0D1C27`), Warm Off-White (`#F3F0E8`), Pure White (`#FFFFFF`), and Muted Warm Gold (`#D2B04C`).
   - Crisp Google Fonts: *Archivo*, *Plus Jakarta Sans*, *Caveat*, *Kaushan Script*.

5. **📅 Multi-Step Booking Flow**:
   - Package selection (`Driving Lessons`, `Car Hire for Test`, `Lesson + Car Combo`, `Test Preparation`).
   - Service NSW test center selector, date/time scheduling, learner logbook hours tracker, and instant booking summary.

6. **🏁 Standalone Outro Footer Scene**:
   - Full-width dark end-credits scene with brand lockup, structured 4-column directory, and contact info.

---

## 🛠️ Technology Stack

- **Frontend Framework**: React 18 with TypeScript
- **Bundler & Dev Server**: Vite
- **Routing**: React Router DOM (v6)
- **Icons**: Lucide React
- **Styling**: Vanilla CSS (Custom tokens and utility design system)

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (version 18.0.0 or higher recommended)
- [npm](https://www.npmjs.com/)

### Installation

1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   cd "ds website"
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the local development server:
   ```bash
   npm run dev
   ```
   Open your browser at `http://localhost:3000`.

4. Build for production:
   ```bash
   npm run build
   ```

---

## 📁 Project Structure

```
├── public/
│   └── videos/                     # Local automotive MP4 video assets
├── src/
│   ├── components/
│   │   ├── cinematic/              # Hero video, Highway journey, Reviews, HUD telemetry
│   │   ├── layout/                 # Navbar, Footer outro, Modals
│   │   └── ui/                     # Reusable Buttons, Cards, Badges
│   ├── data/
│   │   └── content.ts              # Business info, services, test centers, FAQs, blogs
│   ├── pages/                      # Home, DrivingLessons, CarHire, LessonAndCar, TestPrep, Book, About, etc.
│   ├── types/                      # TypeScript definitions
│   ├── index.css                   # Automotive design system, theme tokens & layout scale
│   ├── main.tsx                    # React application entry point
│   └── App.tsx                     # Router configuration
├── .gitignore
├── package.json
└── README.md
```

---

## 📄 License & Ownership

Copyright © 2026 Canguruber Driving School. All rights reserved. Registered NSW Driving School.
