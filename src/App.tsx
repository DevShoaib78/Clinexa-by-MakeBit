import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SplashScreen } from "./components/SplashScreen";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { HomePage } from "./pages/HomePage";
import { AboutPage } from "./pages/AboutPage";
import { ContactPage } from "./pages/ContactPage";
import { TenderGuidePage } from "./pages/TenderGuidePage";

function App() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <>
      {showSplash ? (
        <SplashScreen onFinish={() => setShowSplash(false)} />
      ) : (
        <Router>
          <div className="flex flex-col min-h-screen animate-in fade-in duration-700">
            <Header />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/guide" element={<TenderGuidePage />} />
                <Route path="/contact" element={<ContactPage />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      )}
    </>
  );
}

export default App;
