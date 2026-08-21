"use client";
import { useEffect, useState } from 'react';
import './WelcomeScreen.css';

export default function WelcomeScreen({ onComplete, t }) {
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    // Lock body scroll while welcome screen is active
    document.body.style.overflow = 'hidden';

    const fadeOutTimer = setTimeout(() => {
      setIsFadingOut(true);
    }, 2000);

    const completeTimer = setTimeout(() => {
      document.body.style.overflow = '';
      onComplete();
    }, 2500);

    return () => {
      document.body.style.overflow = '';
      clearTimeout(fadeOutTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div className={`welcome-screen ${isFadingOut ? 'fade-out' : ''}`}>
      <div className="welcome-content">
        <div className="welcome-logo-container">
          <div className="welcome-glow" />
          <h1 className="welcome-title">
            <span className="welcome-title-main">{t.welcome?.titleMain || 'Welcome to'}</span>
            <span className="welcome-title-sub">{t.welcome?.titleSub || 'DOREK INTERNATIONAL'}</span>
          </h1>
          <p className="welcome-tagline">{t.welcome?.tagline || 'ENGINEERING SOLUTIONS'}</p>
        </div>
        <div className="welcome-loader">
          <div className="welcome-loader-bar"></div>
        </div>
      </div>
    </div>
  );
}
