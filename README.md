# Personal Website

A modern, Palantir-inspired personal website showcasing projects, skills, and achievements as a CMU CS student-athlete.

## Features

- **Hero Section**: Cinematic hero with subtle swim video background
- **Projects**: Showcase of technical projects with problem/system/impact breakdown
- **Athlete/Systems**: Integration of athletic training with systems thinking
- **Skills & Metrics**: Technical skills and key metrics
- **Experience**: Timeline of academic and athletic achievements
- **Contact**: Footer with contact information

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion
- Lucide React (Icons)

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Adding Your Photos

See `IMAGE_SETUP.md` for detailed instructions. Quick guide:

**Upload all media to: `public/media/` folder**

1. **Headshot**: Save as `public/media/headshot.png` (circular profile image in hero)
2. **Swim Team Photo**: Save as `public/media/swim-team-podium.jpg` (main image in Athlete/Systems section)
3. **Additional Photos**: Save as `public/media/swim-1.jpg`, `swim-2.jpg`, etc. (gallery)
4. **Hero Video** (optional): Save as `public/media/swim-video.mp4` (background video)

All images are automatically integrated - just add them to the `public/media/` folder with the correct filenames!

## Deployment

Deploy to Vercel:

1. Push your code to GitHub
2. Import your repository in Vercel
3. Vercel will automatically detect Next.js and deploy

Or use the Vercel CLI:
```bash
npm i -g vercel
vercel
```

## Customization

- Update project data in `components/Projects.tsx`
- Modify skills in `components/SkillsMetrics.tsx`
- Update experience timeline in `components/Experience.tsx`
- Customize colors in `app/globals.css`

