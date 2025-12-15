# Image Setup Guide

## Required Images

Place all images in the `public/media/` folder with these exact filenames:

### 1. Headshot (Required)
- **Full Path**: `public/media/headshot.png`
- **Location**: Hero section (circular profile image)
- **Description**: Your professional headshot photo
- **Recommended size**: 800x800px or larger (square aspect ratio works best)

### 2. Swim Team Podium Photo (Required)
- **Full Path**: `public/media/swim-team-podium.jpg`
- **Location**: Athlete/Systems section (main split-screen image)
- **Description**: Your swim team podium photo
- **Recommended size**: 1200x800px or larger (landscape)

### 3. Additional Swim Gallery Images (Optional)
- **Full Path**: `public/media/swim-1.jpg`, `swim-2.jpg`, `swim-3.jpg`, `swim-4.jpg`
- **Location**: Gallery section below Athlete/Systems
- **Description**: Additional swim photos
- **Recommended size**: 800x600px or larger

### 4. Hero Background Video (Optional)
- **Full Path**: `public/media/swim-video.mp4`
- **Location**: Hero section background
- **Description**: Slow-motion swim video for cinematic background
- **Recommended**: Short loop (5-10 seconds), muted, low file size

## Quick Setup Steps

1. **Navigate to**: `public/media/` folder
2. **Save your headshot** as `headshot.jpg`
3. **Save your swim team podium photo** as `swim-team-podium.jpg`
4. **Add any additional swim photos** as `swim-1.jpg`, `swim-2.jpg`, etc.
5. **Optional**: Add `swim-video.mp4` for the hero background

**All files go in the `public/media/` folder!**

## Image Optimization Tips

- Use JPEG format for photos (smaller file sizes)
- Compress images before uploading (use tools like TinyPNG or ImageOptim)
- Keep file sizes under 500KB each for faster loading
- The website will automatically optimize images using Next.js Image component

## Current Status

✅ Components are ready to use your images
✅ Fallback placeholders will show if images aren't found
✅ Images will have smooth animations and effects applied automatically

