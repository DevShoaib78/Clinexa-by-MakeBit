# 🩺 Clinexa by MakeBit

> **AI-Powered Symptom Analysis with Professional Medical Consultation Experience**

Clinexa is an advanced health technology application that uses Google's Gemini Pro AI to provide comprehensive symptom analysis, simulating a consultation with an experienced, empathetic physician.

[![Live Demo](https://img.shields.io/badge/Live-Demo-red?style=for-the-badge)](https://clinexa.netlify.app)
[![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)](LICENSE)
[![Google Gemini](https://img.shields.io/badge/Powered_by-Google_Gemini-4285F4?style=for-the-badge&logo=google)](https://ai.google.dev/)

![Clinexa Banner](public/assets/clinexalogo.webp)

---

## ✨ Features

### 🤖 **Dr. Clinexa AI Persona**
- Simulates a caring, experienced doctor with 15+ years of clinical practice
- Empathetic, warm, and professional communication
- Detailed medical reasoning and explanations
- Patient-friendly language with clinical accuracy

### 🔍 **Comprehensive Symptom Analysis**
- **Free text input** - Describe symptoms naturally
- **Voice input** - Hands-free symptom description using Web Speech API
- **Severity assessment** - Mild, Moderate, or Urgent classification
- **Red flag detection** - Identifies warning signs requiring immediate attention
- **Differential diagnosis** - Multiple possible conditions with reasoning
- **Action plans** - 5-6 detailed, actionable steps based on severity

### 👨‍⚕️ **Professional Medical Insights**
- **Doctor's Notes** - Additional clinical context and reasoning
- **Specialist recommendations** - Specific specialist types with explanations
- **Educational content** - Learn about symptoms, conditions, and when to seek care
- **Health guide** - Comprehensive medical information and warning signs

### 🎨 **Beautiful, Modern Interface**
- Medical red theme with elegant design
- Glassmorphism and gradient effects
- Animated aurora backgrounds
- Fully responsive (mobile, tablet, desktop)
- Dark mode optimized

---

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ and npm
- Google Gemini API key (get free at [Google AI Studio](https://makersuite.google.com/app/apikey))

### Installation

```bash
# Clone the repository
git clone https://github.com/DevShoaib78/Clinexa-by-MakeBit.git

# Navigate to project directory
cd Clinexa-by-MakeBit

# Install dependencies
npm install

# Create .env file (optional - API key is hardcoded as fallback)
echo "VITE_GEMINI_API_KEY=your_gemini_api_key_here" > .env

# Start development server
npm run dev
```

Visit `http://localhost:5173` to see the app running!

### Build for Production

```bash
npm run build
```

The production build will be in the `dist/` folder, ready to deploy.

---

## 🌐 Deployment

### Netlify (Recommended)
1. Run `npm run build`
2. Drag the `dist` folder to [Netlify Drop](https://app.netlify.com/drop)
3. (Optional) Add `VITE_GEMINI_API_KEY` in Site Settings → Environment Variables

### Vercel
```bash
vercel --prod
```

### Other Platforms
Upload the `dist` folder to any static hosting service (GitHub Pages, Cloudflare Pages, etc.)

---

## 🏗️ Tech Stack

- **Frontend Framework**: React 18.3 + TypeScript
- **Build Tool**: Vite 5.4
- **Styling**: Tailwind CSS 3.4
- **Routing**: React Router DOM 7.9
- **AI Model**: Google Gemini Pro
- **Voice Input**: Web Speech API
- **Fonts**: Plus Jakarta Sans, IBM Plex Sans
- **Icons**: Lucide React

---

## 📋 Project Structure

```
Clinexa-by-MakeBit/
├── src/
│   ├── api/
│   │   └── analyzeSymptoms.ts      # Gemini API integration
│   ├── components/
│   │   ├── AgentStatus.tsx         # Loading animation
│   │   ├── Header.tsx              # Navigation bar
│   │   ├── Footer.tsx              # Footer section
│   │   ├── SplashScreen.tsx        # Animated splash screen
│   │   ├── SymptomsForm.tsx        # Symptom input form
│   │   ├── SymptomAnalysisResult.tsx # Results display
│   │   └── Aurora.tsx              # Animated background
│   ├── pages/
│   │   ├── HomePage.tsx            # Main symptom analyzer
│   │   ├── AboutPage.tsx           # How it works
│   │   ├── TenderGuidePage.tsx     # Health guide
│   │   └── ContactPage.tsx         # Contact form
│   ├── hooks/
│   │   └── useSpeechInput.ts       # Voice input hook
│   ├── types/
│   │   └── index.ts                # TypeScript types
│   ├── App.tsx                     # Main app component
│   ├── index.css                   # Global styles
│   └── main.tsx                    # Entry point
├── public/
│   └── assets/                     # Images and logos
├── dist/                           # Production build
├── CLINEXA_TRANSFORMATION.md       # Full transformation docs
├── GEMINI_INTEGRATION.md           # Gemini API details
└── ENV_SETUP.md                    # Environment setup guide

```

---

## 🔐 Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `VITE_GEMINI_API_KEY` | No* | Google Gemini Pro API key |

\* API key is hardcoded as fallback for immediate functionality

---

## 💡 Key Features Explained

### Dr. Clinexa Consultation Flow

1. **Patient describes symptoms** (text or voice)
2. **Dr. Clinexa reviews** (animated agent status)
3. **Comprehensive analysis** provided:
   - Warm greeting and summary
   - 3 possible conditions with reasoning
   - Severity classification
   - 4-5 specific red flags
   - 5-6 detailed action steps
   - Specialist recommendation
   - Doctor's professional notes

### Why Google Gemini Pro?

- ✅ **FREE** for standard usage (60 requests/min)
- ✅ More empathetic and conversational
- ✅ Better at maintaining doctor-patient tone
- ✅ Advanced medical reasoning
- ✅ Longer, more detailed responses (2048 tokens)

---

## 📱 Screenshots

### Home - Symptom Analyzer
Beautiful, intuitive interface for entering symptoms

### Analysis Results
Comprehensive, doctor-like consultation results

### Health Guide
Educational content about symptoms and when to seek care

---

## ⚠️ Important Disclaimers

- **NOT a medical diagnosis tool**
- **NOT a substitute for professional medical care**
- **NOT for medical emergencies** - Call emergency services
- Always consult qualified healthcare professionals
- AI-powered preliminary assessment only

---

## 🎯 Roadmap

- [ ] Multi-turn conversations (follow-up questions)
- [ ] Symptom history tracking
- [ ] Multi-language support
- [ ] Audio output (Dr. Clinexa voice)
- [ ] PDF report generation
- [ ] Integration with telemedicine platforms

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 About MakeBit

Built by [MakeBit](https://makebit.tech) - A product and technology studio dedicated to creating tools that make healthcare information more accessible and easier to understand.

### Contact

- **Email**: team@makebit.tech
- **Website**: [makebit.tech](https://makebit.tech)
- **GitHub**: [@DevShoaib78](https://github.com/DevShoaib78)

---

## 🙏 Acknowledgments

- [Google Gemini](https://ai.google.dev/) for the powerful AI capabilities
- [React](https://react.dev/) team for the amazing framework
- [Vite](https://vitejs.dev/) for lightning-fast development
- [Tailwind CSS](https://tailwindcss.com/) for beautiful styling
- [Lucide](https://lucide.dev/) for clean icons

---

## ⭐ Star History

If you find this project useful, please consider giving it a star ⭐

---

<div align="center">

**Made with ❤️ by MakeBit**

[Website](https://makebit.tech) • [GitHub](https://github.com/DevShoaib78) • [Email](mailto:team@makebit.tech)

</div>
