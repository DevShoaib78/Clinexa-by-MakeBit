import React, { useEffect, useState } from 'react';
import Aurora from './Aurora';

interface SplashScreenProps {
    onFinish?: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
    const [showLogo, setShowLogo] = useState(false);
    const [showSplash, setShowSplash] = useState(true);

    useEffect(() => {
        // Phase 1: Logo zoom-in with rotation (800-1000ms)
        const timer1 = setTimeout(() => {
            setShowLogo(true);
        }, 100);

        // Phase 2: Hold logo visible for 2000-2500ms
        const timer2 = setTimeout(() => {
            setShowSplash(false);
        }, 3000); // 100ms + 900ms (logo animation) + 2000ms (hold)

        // Phase 3: Call onFinish after fade-out completes (800-1000ms)
        const timer3 = setTimeout(() => {
            if (onFinish) onFinish();
        }, 3900); // 3000ms + 900ms (fade-out)

        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
            clearTimeout(timer3);
        };
    }, [onFinish]);

    return (
        <div
            className={`fixed inset-0 z-50 flex items-center justify-center overflow-hidden transition-opacity duration-[900ms] ease-in-out ${
                showSplash ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
        >
            {/* Background - Dark Slate Base */}
            <div className="absolute inset-0 bg-slate-950">
                {/* Animated Aurora Gradient - Live Background Effect */}
                <div className="absolute inset-0 opacity-60">
                    <Aurora
                        colorStops={['#10b981', '#34d399', '#059669']}
                        blend={0.7}
                        amplitude={1.5}
                        speed={0.4}
                    />
                </div>

                {/* Animated Gradient Orbs - Multiple Layers */}
                <div className="absolute top-0 left-1/4 w-[300px] sm:w-[400px] md:w-[600px] h-[300px] sm:h-[400px] md:h-[600px] bg-emerald-500/15 rounded-full blur-3xl animate-blob z-0" />
                <div className="absolute top-1/4 right-1/4 w-[250px] sm:w-[350px] md:w-[500px] h-[250px] sm:h-[350px] md:h-[500px] bg-emerald-600/12 rounded-full blur-3xl animate-blob z-0" style={{ animationDelay: '2s' }} />
                <div className="absolute bottom-0 left-1/3 w-[350px] sm:w-[500px] md:w-[700px] h-[350px] sm:h-[500px] md:h-[700px] bg-emerald-400/10 rounded-full blur-3xl animate-blob z-0" style={{ animationDelay: '4s' }} />
                <div className="absolute top-1/2 right-0 w-[200px] sm:w-[300px] md:w-[400px] h-[200px] sm:h-[300px] md:h-[400px] bg-emerald-500/8 rounded-full blur-3xl animate-blob z-0" style={{ animationDelay: '1s' }} />
                
                {/* Animated Radial Glow - Pulsing Center */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] sm:w-[600px] md:w-[800px] h-[400px] sm:h-[600px] md:h-[800px] bg-emerald-500/10 rounded-full blur-3xl animate-pulse-glow" />
                
                {/* Enhanced Animated Particles - More Dynamic */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    {[...Array(15)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute w-2 h-2 bg-emerald-400/40 rounded-full blur-sm particle"
                            style={{
                                left: `${(i * 6.67) % 100}%`,
                                top: `${20 + (i % 4) * 25}%`,
                                animationDelay: `${i * 0.3}s`,
                            }}
                        />
                    ))}
                </div>

                {/* Additional Floating Particles - Smaller */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    {[...Array(20)].map((_, i) => (
                        <div
                            key={`small-${i}`}
                            className="absolute w-1 h-1 bg-emerald-300/30 rounded-full blur-[1px] animate-float"
                            style={{
                                left: `${(i * 5) % 100}%`,
                                top: `${10 + (i % 5) * 20}%`,
                                animationDuration: `${6 + (i % 4) * 2}s`,
                                animationDelay: `${i * 0.2}s`,
                            }}
                        />
                    ))}
                </div>
            </div>

            {/* Main Content Container - Centered */}
            <div className="relative z-10 flex items-center justify-center px-6">
                {/* NextBid Logo - Hero Focal Point with Zoom + Rotation Animation */}
                <div
                    className={`relative transition-all duration-[900ms] ease-out ${
                        showLogo
                            ? 'opacity-100 translate-y-0 scale-100 rotate-0'
                            : 'opacity-0 translate-y-8 scale-50 rotate-12'
                    }`}
                    style={{
                        transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
                    }}
                >
                    {/* Soft Emerald Glow Behind Logo */}
                    <div
                        className={`absolute inset-0 -z-10 rounded-full blur-3xl transition-opacity duration-[900ms] ${
                            showLogo ? 'opacity-70' : 'opacity-0'
                        }`}
                        style={{
                            background: 'radial-gradient(circle, rgba(16, 185, 129, 0.4) 0%, transparent 70%)',
                            transform: 'scale(1.4)',
                        }}
                    />
                    
                    {/* Additional Glow Layer for Depth */}
                    <div
                        className={`absolute inset-0 -z-10 rounded-full blur-2xl transition-opacity duration-[900ms] ${
                            showLogo ? 'opacity-50' : 'opacity-0'
                        }`}
                        style={{
                            boxShadow: '0 0 80px rgba(16, 185, 129, 0.4)',
                            transform: 'scale(1.2)',
                        }}
                    />

                    <img
                        src="/assets/nexbidwithoutbg.png"
                        alt="NextBid Logo"
                        className="relative z-10 w-48 sm:w-56 md:w-72 lg:w-80 h-auto drop-shadow-2xl"
                        style={{
                            filter: 'drop-shadow(0 0 50px rgba(16, 185, 129, 0.4))',
                        }}
                        loading="eager"
                    />
                </div>
            </div>
        </div>
    );
};
