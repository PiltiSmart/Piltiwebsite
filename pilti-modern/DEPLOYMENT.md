# Production Deployment Guide - PiltiSmart Modern Website

## Branch Information
- **Branch Name**: `new-develop`
- **Purpose**: Production-ready version of pilti-modern for deployment
- **Created**: 2026-02-04

## What's Included

### Core Features
- ✅ Modern Smarty Nebula design theme
- ✅ Responsive layout across all devices
- ✅ Professional navigation with global search
- ✅ Store redirect confirmation modals
- ✅ Interactive service detail modals (24 features)
- ✅ Server-side email integration with Resend API
- ✅ Careers page with Coming Soon roles
- ✅ Help center with video tutorials
- ✅ Complete legal pages (Privacy, Terms, Trademarks)

### Pages
1. **Home** (`/`) - Landing page with service categories
2. **About** (`/about`) - Company information and values
3. **Services** (`/services`) - Interactive service offerings
4. **Contact** (`/contact`) - Contact form with email integration
5. **Careers** (`/careers`) - Job listings and company culture
6. **Help** (`/help`) - Documentation and video tutorials
7. **Download** (`/download`) - App download information
8. **Legal** - Privacy Policy, Terms of Service, Trademarks

## Pre-Deployment Checklist

### 1. Environment Variables
Create `.env.local` (or configure in your hosting platform):
```bash
RESEND_API_KEY=your_resend_api_key_here
```

### 2. Resend Email Configuration
**Current Status**: Using test mode (sends to `idealumesh@gmail.com`)

**For Production**:
1. Go to [resend.com/domains](https://resend.com/domains)
2. Add and verify `piltismart.com` domain
3. Update `/src/app/api/send-email/route.ts`:
   ```typescript
   from: 'PiltiSmart Contact <contact@piltismart.com>',
   to: ['enquiry@piltismart.com'],
   ```

### 3. Build and Test
```bash
cd pilti-modern
npm install
npm run build
npm run start
```

### 4. Deployment Options

#### Option A: Docker (Recommended for Production)
This project includes a multi-stage `Dockerfile` optimized for production.

**Build and Run (Locally):**
```bash
# Build the image
docker build -t pilti-modern .

# Run the container
docker run -p 3000:3000 -e RESEND_API_KEY=your_key pilti-modern
```

**GitHub Container Registry (Automated):**
The included workflow (`.github/workflows/docker-release.yml`) automatically builds and pushes the image to GitHub Container Registry (GHCR) when you:
1. Push to `main` branch
2. Create a GitHub Release

**Deploying from GHCR:**
```bash
docker pull ghcr.io/yourusername/pilti-modern:latest
docker run -d -p 3000:3000 -e RESEND_API_KEY=your_key ghcr.io/yourusername/pilti-modern:latest
```

#### Option B: Vercel (Next.js Native)
```bash
npm install -g vercel
vercel --prod
```
- Add `RESEND_API_KEY` in Vercel dashboard → Settings → Environment Variables

#### Option B: Netlify
```bash
npm run build
# Deploy the .next folder
```
- Add environment variables in Netlify dashboard

#### Option C: Traditional Hosting (Node.js)
```bash
npm run build
npm run start
```
- Ensure Node.js 18+ is installed on server
- Configure reverse proxy (nginx/Apache)
- Set up process manager (PM2)

### 5. Domain Configuration
- Point `piltismart.com` to your hosting provider
- Configure SSL certificate (Let's Encrypt recommended)
- Update DNS records as needed

### 6. Post-Deployment Verification
- [ ] Test all page navigation
- [ ] Verify contact form sends emails
- [ ] Check mobile responsiveness
- [ ] Test search functionality
- [ ] Verify all external links (PiltiStore)
- [ ] Check help videos load correctly
- [ ] Test service detail modals

## Important Notes

### Email Functionality
⚠️ **CRITICAL**: The contact form currently sends to `idealumesh@gmail.com` for testing. You MUST update the email configuration before production deployment (see step 2 above).

### API Routes
The following API routes are used:
- `/api/send-email` - Contact form email submission

### External Dependencies
- **Resend**: Email delivery service
- **Google Fonts**: Inter, Roboto fonts
- **Lucide React**: Icon library
- **Framer Motion**: Animations

### Performance Optimization
- Images are optimized and use Next.js Image component where applicable
- Static pages are pre-rendered at build time
- API routes run on serverless functions

## Rollback Plan
If issues arise, you can quickly revert:
```bash
git checkout feature/smarty-modern-redesign
```

## Support
For deployment assistance, contact the development team or refer to:
- [Next.js Deployment Docs](https://nextjs.org/docs/deployment)
- [Vercel Deployment Guide](https://vercel.com/docs)

---

**Last Updated**: 2026-02-04
**Branch**: new-develop
**Next.js Version**: 16.1.6
