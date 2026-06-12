# ✈️ Udaan-Mitra (उड़ान-मित्र)    https://udaan-mitra-92ki2d617-hrs-bits-projects.vercel.app/

**Your First Flight Companion**  
Udaan-Mitra is a modern, responsive, and highly interactive web application specifically designed to assist first-time flyers in India. By providing multilingual support (Hindi, English, Dogri), live price checking, geolocated cab booking, and airport assistance features, Udaan-Mitra removes the anxiety from air travel.

## ✨ Features

- **🎓 First-Time Flyer Guide:** Step-by-step walkthroughs of airport procedures (Check-in, Security, Boarding, Baggage rules) designed for absolute beginners.
- **💬 Multilingual AI Assistant:** An integrated global AI Chatbot (Noupe) that floats on every page to answer traveler questions instantly.
- **💸 Live Flight Pricing:** Search for flights between any two global airports. Features live base price conversions to INR using the Frankfurter API.
- **🚕 Smart Cab Booking:** One-click cab booking that utilizes the HTML5 Geolocation API and BigDataCloud reverse-geocoding to automatically detect and display the user's current city/neighborhood.
- **🤝 Special Assistance:** Quick-access booking UI for wheelchairs, luggage helpers, and lounge access at major Indian airports with direct official helpline numbers.
- **📱 Premium Mobile UX:** Built with a "mobile-first" mindset. Features TikTok/Reels style vertical CSS scroll-snapping and gorgeous scroll-reveal animations powered by Framer Motion.

## 🛠️ Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router) v16+
- **UI Library:** [React](https://react.dev/) v19
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) v4
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Geocoding:** BigDataCloud Free Client API

## 🚀 Getting Started

To run this project locally, follow these steps:

### 1. Clone the repository
```bash
git clone https://github.com/hrs-bit/udaan-mitra-app.git
cd udaan-mitra-app
```

### 2. Install Dependencies
This project uses standard `npm`. (Note: Do not use `pnpm` as the lockfile has been intentionally removed to prevent Vercel build conflicts).
```bash
npm install
```

### 3. Run the Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🌍 Deployment

This project is optimized for deployment on [Vercel](https://vercel.com). The repository is configured to automatically ignore TypeScript strictness build errors during deployment to ensure rapid continuous integration.

## 👨‍💻 Author

Designed and developed by **Harshit Sharma**.
