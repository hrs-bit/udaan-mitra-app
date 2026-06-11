'use client';

import { Plane, Shield, Users, Clock } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="w-full min-h-screen bg-gradient-to-b from-primary via-blue-50 to-white flex items-center justify-center px-4 py-20" aria-label="Hero Section">
      <div className="max-w-3xl mx-auto text-center">
        {/* Main Heading */}
        <div className="mb-6">
          <div className="text-6xl mb-6">✈️</div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 text-balance">
            आपकी पहली उड़ान
            <br />
            <span className="text-blue-100">Your First Flight</span>
          </h1>
          <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto mb-8 text-balance">
            घबराहट की बातें छोड़ें। Udaan-Mitra आपके साथ हर कदम पर है।
            <br />
            <span className="text-blue-200">Don't worry. We&apos;re here to help you every step of the way.</span>
          </p>
        </div>

        {/* CTA Button */}
        <div className="mb-16">
          <button
            onClick={() => {
              alert("Please click the floating AI Chat widget in the bottom right corner of your screen to get instant help!");
            }}
            className="inline-flex items-center gap-2 bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-3 rounded-lg font-semibold transition-colors text-lg"
          >
            अपने सवाल पूछें / Ask Now
            <Plane className="w-5 h-5" />
          </button>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-12">
          <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="text-2xl mb-3">🎯</div>
            <h3 className="font-semibold text-foreground mb-2">Free Guidance</h3>
            <p className="text-sm text-muted-foreground">
              निःशुल्क मार्गदर्शन
            </p>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="text-2xl mb-3">🗣️</div>
            <h3 className="font-semibold text-foreground mb-2">Multilingual</h3>
            <p className="text-sm text-muted-foreground">
              हिंदी, English, Dogri
            </p>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="text-2xl mb-3">⚡</div>
            <h3 className="font-semibold text-foreground mb-2">Quick Answers</h3>
            <p className="text-sm text-muted-foreground">
              तुरंत जवाब
            </p>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="text-2xl mb-3">🤝</div>
            <h3 className="font-semibold text-foreground mb-2">Support 24/7</h3>
            <p className="text-sm text-muted-foreground">
              हमेशा उपलब्ध
            </p>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 text-center">
          <p className="text-sm text-muted-foreground mb-8">Trusted by thousands of first-time flyers across India</p>
          <div className="flex items-center justify-center gap-8 flex-wrap">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">50K+</div>
              <div className="text-xs text-muted-foreground">Happy Travelers</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">15+</div>
              <div className="text-xs text-muted-foreground">Major Airports</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">3</div>
              <div className="text-xs text-muted-foreground">Languages</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
