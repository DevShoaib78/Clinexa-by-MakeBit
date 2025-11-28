# Environment Variables Setup for Clinexa

## Required Environment Variables

Clinexa uses **Google's Gemini Pro AI** for advanced medical symptom analysis and **Tavily Search API** for finding nearby doctors and clinics. You need to set up your API keys to use the full functionality.

### 1. Create `.env` file

Create a file named `.env` in the root directory of the project:

```bash
# In the project root
touch .env
```

### 2. Add API Keys

Add the following lines to your `.env` file:

```env
# Google Gemini API Key (for symptom analysis)
VITE_GEMINI_API_KEY=your_gemini_api_key_here

# Tavily API Key (for doctor search)
VITE_TAVILY_API_KEY=your_tavily_api_key_here
```

### 3. Get Your API Keys

#### Get Gemini API Key (For Symptom Analysis)

1. Go to [https://makersuite.google.com/app/apikey](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the key (it starts with `AIza...`)
5. Paste it in your `.env` file

#### Get Tavily API Key (For Doctor Search)

1. Go to [https://tavily.com](https://tavily.com)
2. Sign up for a free account
3. Navigate to API Keys section
4. Copy your API key
5. Paste it in your `.env` file

**Example `.env` file:**
```env
VITE_GEMINI_API_KEY=AIzaSyBab6lN5hCDzFfVNpsdFcCNrg7Q64P3aIU
VITE_TAVILY_API_KEY=tvly-1234567890abcdefghijklmnop
```

### 4. Restart Development Server

After adding the `.env` file, restart your development server:

```bash
# Stop the current server (Ctrl+C)
# Then restart
npm run dev
```

## Mock Data Fallback

**Don't have API keys yet?** No problem!

### Symptom Analysis Fallback
If you don't set `VITE_GEMINI_API_KEY`, Clinexa will automatically use enhanced mock data for testing and demonstration purposes. This allows you to:

- Test the UI and user flow with doctor-like responses
- See comprehensive symptom analysis results
- Demonstrate the product without incurring API costs

The mock data generator intelligently creates detailed, professional medical-style responses based on keywords in the symptoms you enter.

### Doctor Search Fallback
If you don't set `VITE_TAVILY_API_KEY`:

- Symptom analysis will still work normally
- Doctor search will be skipped
- A friendly message will prompt users to add location information
- No errors or crashes - the app gracefully handles missing API keys

## API Costs

### Google Gemini Pro (Symptom Analysis)
**FREE** for standard usage:

- **Model**: Gemini Pro
- **Free Tier**: 60 requests per minute
- **Cost**: FREE for standard usage
- **Average request**: Comprehensive medical analysis
- **Estimated cost per analysis**: $0.00 (within free tier)

For pricing details: [https://ai.google.dev/pricing](https://ai.google.dev/pricing)

### Tavily Search API (Doctor Search)
**FREE tier available**:

- **Free Tier**: 1,000 searches per month
- **Cost**: FREE up to 1,000 searches, then pay-as-you-go
- **Average request**: 8 doctor results per search
- **Estimated cost per search**: $0.00 (within free tier)

For pricing details: [https://tavily.com/pricing](https://tavily.com/pricing)

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
VITE_GEMINI_API_KEY=your_gemini_key_here
VITE_TAVILY_API_KEY=your_tavily_key_here
```

### Production (Netlify/Vercel)
Add environment variables through the hosting platform's dashboard:

**For Netlify:**
1. Go to Site Settings → Environment Variables
2. Add both variables:
   - `VITE_GEMINI_API_KEY` = Your Gemini API key
   - `VITE_TAVILY_API_KEY` = Your Tavily API key
3. Redeploy your site

**For Vercel:**
1. Go to Project Settings → Environment Variables
2. Add both variables with their values
3. Redeploy

**Note:** Environment variables starting with `VITE_` are exposed to the client-side code. Both Gemini and Tavily API keys can be safely used client-side for this use case, but consider setting up domain restrictions for additional security in production.

## Questions?

If you have issues with API setup, contact:
- Email: team@makebit.tech
- Include error messages from the browser console

---

*Last Updated: Nov 28, 2025*

