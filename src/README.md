# Pelican Club OS

A nostalgic Mac OS Classic-inspired web interface for Pelican Club, featuring a retro System 7 aesthetic with modern Poolsuite vibes.

## 🚀 Quick Start

### Local Development
```bash
npm install
npm run dev
```

### Build for Production
```bash
npm install
npm run build
```

The built site will be in the `dist` folder.

## 📦 Deployment

### Option 1: Netlify Drop
1. Run `npm run build`
2. Drag the `dist` folder to https://app.netlify.com/drop

### Option 2: Vercel
1. Push to GitHub
2. Import repository in Vercel
3. Deploy (auto-configured)

### Option 3: Netlify via Git
1. Push to GitHub
2. Import repository in Netlify
3. Build command: `npm run build`
4. Publish directory: `dist`

## 🎨 Features

- Draggable windows with classic Mac OS styling
- HTML5 audio player with Pelican Club playlist
- Embedded YouTube videos
- Streaming service links
- Mobile-optimized responsive layout
- Retro pixel art icons
- Marble cream background with pink diagonal tiles

## 🛠 Tech Stack

- React
- TypeScript
- Vite
- Tailwind CSS v4
- React DnD (drag and drop)
- Lucide React (icons)

## 📱 Mobile Support

Automatically detects screen size and switches to a mobile-optimized fullscreen layout on smaller devices.
