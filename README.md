# Crypto Tracker UI

A simple crypto price dashboard built with **Next.js 14**, **TypeScript**, and **Tailwind CSS**.  
It displays live BTC, ETH, and SOL prices by consuming a backend API.

## 🚀 Live Demo
🔗 https://crypto-tracker-ui.onrender.com/

## ✨ Features
- Live crypto prices (BTC, ETH, SOL)
- Card-based responsive UI
- Skeleton loading state
- Optimized images with `next/image`
- Frontend and backend are fully separated

## 🛠 Tech Stack
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS

## 🧠 Architecture
This project is a **frontend-only application**.

It fetches data from a separate backend API:
- Backend provides JSON data
- Frontend only handles UI and data display

## 🚀 Local Development

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```