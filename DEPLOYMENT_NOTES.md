# Deployment Notes for NexBid

## 🚀 Deploying to Netlify

### Quick Deploy (Drag & Drop)
1. Run `npm run build` to create the `dist` folder
2. Drag and drop the `dist` folder onto Netlify
3. **IMPORTANT**: After deployment, update the Open Graph URLs (see below)

### Updating Social Media Previews

After you get your Netlify domain (e.g., `https://your-site-name.netlify.app`):

**Method 1: Using the Helper Script (Recommended)**
```bash
node update-og-urls.js https://your-site-name.netlify.app
npm run build
```
Then redeploy the `dist` folder.

**Method 2: Manual Update**
1. Open `index.html` in the root folder
2. Find and replace `YOUR_DEPLOY_URL` with your actual domain (e.g., `https://your-site-name.netlify.app`)
3. Run `npm run build`
4. Redeploy the `dist` folder

**Method 3: Environment Variable (For Continuous Deployment)**
1. Go to Netlify: Site settings > Build & deploy > Environment variables
2. Add: `VITE_BASE_URL` = `https://your-site-name.netlify.app`
3. The URLs will automatically update during the next build

### What Gets Updated

The following meta tags will be updated with your domain:
- `og:url` - Open Graph URL (Facebook, LinkedIn, etc.)
- `og:image` - Open Graph preview image
- `twitter:url` - Twitter Card URL
- `twitter:image` - Twitter preview image
- `canonical` - Canonical URL for SEO

## 📋 Meta Tags Included

✅ **Site Title**: "NexBid - Discover Construction Tenders in Saudi Arabia"
✅ **Description**: Proper description for search engines and social media
✅ **Favicon**: Using `/assets/favicon.png`
✅ **Open Graph tags**: For Facebook, LinkedIn, WhatsApp previews
✅ **Twitter Card tags**: For Twitter previews
✅ **Theme color**: Dark slate (#0f172a)
✅ **Keywords**: Construction tenders, Saudi Arabia, Riyadh, Jeddah
✅ **Author**: MakeBit

## 🖼️ Preview Image

The OG image is set to `/assets/nexbidlogomain.png`. This will show when you share links on:
- Facebook
- Twitter/X
- LinkedIn
- WhatsApp
- Slack
- Other social platforms

Make sure this file exists in your `public/assets/` folder (it should already be there).

## ✅ Testing Your Meta Tags

After deployment, test your meta tags using:
- **Facebook Debugger**: https://developers.facebook.com/tools/debug/
- **Twitter Card Validator**: https://cards-dev.twitter.com/validator
- **LinkedIn Post Inspector**: https://www.linkedin.com/post-inspector/

Enter your deployed URL to see how it will appear when shared!

