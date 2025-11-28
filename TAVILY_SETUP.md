# Tavily API Setup Guide

This guide will help you set up the Tavily API integration for NextBid.

## 🔑 Step 1: Get Your Tavily API Key

1. Visit [Tavily's website](https://www.tavily.com/)
2. Sign up for an account or log in
3. Navigate to your dashboard
4. Copy your API key

## 📝 Step 2: Configure Environment Variables

1. Create a `.env` file in the root of your project (if it doesn't exist)
2. Add your Tavily API key:

```env
VITE_TAVILY_API_KEY=your_actual_api_key_here
```

**Important Notes:**
- The `.env` file is already in `.gitignore` to keep your API key secure
- Never commit your `.env` file to version control
- Replace `your_actual_api_key_here` with your actual API key from Tavily

## 🚀 Step 3: Restart Your Development Server

After adding the API key, restart your Vite development server:

```bash
npm run dev
```

## ✅ Step 4: Verify It's Working

1. Open the application in your browser
2. Perform a search for tenders
3. If the API key is configured correctly, you'll see real results from Tavily
4. If the API key is missing or invalid, the app will automatically fall back to mock data

## 🔍 How It Works

The integration is located in `src/api/searchTenders.ts`:

- **With API Key**: The app calls the Tavily API and maps real web search results to tender format
- **Without API Key**: The app automatically falls back to mock data for testing

## 🛠️ Troubleshooting

### API Key Not Working?

1. **Check your `.env` file:**
   - Make sure the variable name is exactly `VITE_TAVILY_API_KEY`
   - Make sure there are no spaces around the `=` sign
   - Make sure you've restarted the dev server after adding the key

2. **Check the browser console:**
   - Open Developer Tools (F12)
   - Look for any error messages
   - The app will log warnings if the API key is missing or invalid

3. **Verify your API key:**
   - Make sure you copied the entire API key
   - Check that your Tavily account is active
   - Verify you have API credits/quota available

### Still Using Mock Data?

If you see mock data even after adding your API key:
- Check that the `.env` file is in the project root (same level as `package.json`)
- Restart your development server completely
- Check the browser console for error messages

## 📚 API Configuration

The Tavily API is configured to:
- Search with "advanced" depth for better results
- Return up to 10 results per search
- Focus on Saudi Arabia government portals (etimad.sa, mof.gov.sa, etc.)
- Include raw content for better parsing

You can modify these settings in `src/api/searchTenders.ts` if needed.

## 🔒 Security Best Practices

- ✅ Never commit your `.env` file
- ✅ Never share your API key publicly
- ✅ Use environment variables for all API keys
- ✅ Rotate your API keys periodically
- ✅ Monitor your API usage in Tavily dashboard


