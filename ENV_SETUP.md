# Environment Variables Setup for Clinexa

## Required Environment Variables

Clinexa uses Google's Gemini Pro AI for advanced medical symptom analysis. You need to set up your API key to use the full functionality.

### 1. Create `.env` file

Create a file named `.env` in the root directory of the project:

```bash
# In the project root
touch .env
```

### 2. Add Gemini API Key

Add the following line to your `.env` file:

```env
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

### 3. Get Your Gemini API Key

1. Go to [https://makersuite.google.com/app/apikey](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the key (it starts with `AIza...`)
5. Paste it in your `.env` file

**Example:**
```env
VITE_GEMINI_API_KEY=AIzaSyBab6lN5hCDzFfVNpsdFcCNrg7Q64P3aIU
```

### 4. Restart Development Server

After adding the `.env` file, restart your development server:

```bash
# Stop the current server (Ctrl+C)
# Then restart
npm run dev
```

## Mock Data Fallback

**Don't have an API key yet?** No problem!

If you don't set `VITE_GEMINI_API_KEY`, Clinexa will automatically use enhanced mock data for testing and demonstration purposes. This allows you to:

- Test the UI and user flow with doctor-like responses
- See comprehensive symptom analysis results
- Demonstrate the product without incurring API costs

The mock data generator intelligently creates detailed, professional medical-style responses based on keywords in the symptoms you enter.

## API Costs

Google Gemini Pro API is **FREE** for standard usage:

- **Model**: Gemini Pro
- **Free Tier**: 60 requests per minute
- **Cost**: FREE for standard usage
- **Average request**: Comprehensive medical analysis
- **Estimated cost per analysis**: $0.00 (within free tier)

For pricing details: [https://ai.google.dev/pricing](https://ai.google.dev/pricing)

## Security Notes

⚠️ **Important Security Practices:**

1. **Never commit `.env` to git**
   - The `.env` file is already in `.gitignore`
   - Never share your API keys publicly

2. **Use environment variables in production**
   - For Netlify: Add variables in Site Settings → Environment Variables
   - For Vercel: Add variables in Project Settings → Environment Variables

3. **Regenerate keys if exposed**
   - If you accidentally expose your key, regenerate it immediately on OpenAI's platform

## Troubleshooting

### API Key Not Working

If you're getting errors even with a valid key:

1. Check that the key starts with `sk-`
2. Ensure there are no extra spaces or quotes
3. Verify the key is active on OpenAI's platform
4. Restart the development server
5. Check browser console for specific error messages

### Still Using Mock Data

If the app uses mock data even with a key set:

1. Check the console for warnings
2. Verify the `.env` file is in the root directory (not in `src/` or `public/`)
3. Make sure the variable name is exactly `VITE_OPENAI_API_KEY`
4. Restart the dev server after adding the key

## Development vs Production

### Development (Local)
```env
# .env file
VITE_OPENAI_API_KEY=sk-proj-your-key-here
```

### Production (Netlify/Vercel)
Add environment variables through the hosting platform's dashboard:
- Variable name: `VITE_GEMINI_API_KEY`
- Value: Your Gemini API key

**Note:** Environment variables starting with `VITE_` are exposed to the client-side code. Gemini API keys can be safely used client-side, but you can optionally set up domain restrictions in the Google Cloud Console for added security.

## Questions?

If you have issues with API setup, contact:
- Email: team@makebit.tech
- Include error messages from the browser console

---

*Last Updated: Nov 28, 2025*

