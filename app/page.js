'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Dumbbell, Sparkles, ArrowRight, Utensils, Target, Heart, Zap } from 'lucide-react';

export default function HomePage() {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleGetStarted = () => {
    router.push('/MealMaker');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-yellow-900/20 to-black overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-yellow-500/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-40 h-40 bg-amber-500/30 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-32 left-1/4 w-48 h-48 bg-orange-500/20 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 px-6 py-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Dumbbell className="w-10 h-10 text-yellow-400" />
              <Sparkles className="w-4 h-4 text-amber-400 absolute -top-1 -right-1 animate-pulse" />
            </div>
            <span className="text-2xl font-bold text-white">Roti & Reps</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 px-6 py-12">
        <div className="max-w-4xl mx-auto text-center">
          {/* Hero Section */}
          <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="inline-flex items-center space-x-2 bg-yellow-500/20 text-yellow-300 px-4 py-2 rounded-full text-sm font-medium mb-8 border border-yellow-400/30 backdrop-blur-sm">
              <Zap className="w-4 h-4" />
              <span>AI-Powered Desi Fitness Nutrition</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-amber-400 to-orange-400">Desi Flavors</span>
              <br />
              Meet Gym Goals
            </h1>

            <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
              Transform your everyday desi ingredients into high-protein, macro-friendly meals. 
              Achieve your goals while enjoying the flavors of home - no bland chicken and rice here!
            </p>
          </div>

          {/* Feature Cards */}
          <div className={`grid md:grid-cols-3 gap-6 mb-16 transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105 hover:shadow-lg">
              <Target className="w-8 h-8 text-yellow-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Macro Optimized</h3>
              <p className="text-gray-300 text-sm">Every recipe shows protein, carbs, and calories to hit your fitness goals</p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105 hover:shadow-lg">
              <Utensils className="w-8 h-8 text-amber-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Authentic Desi</h3>
              <p className="text-gray-300 text-sm">Traditional spices and cooking methods, just healthier and stronger</p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105 hover:shadow-lg">
              <Dumbbell className="w-8 h-8 text-orange-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Pre/Post Workout</h3>
              <p className="text-gray-300 text-sm">Perfect meals for bulking, cutting, or maintaining - desi style</p>
            </div>
          </div>

          {/* CTA Button */}
          <div className={`transform transition-all duration-1000 delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <button
              onClick={handleGetStarted}
              className="group relative inline-flex items-center space-x-3 bg-gradient-to-r from-yellow-500 to-amber-500 text-black px-8 py-4 rounded-full text-lg font-semibold hover:from-yellow-600 hover:to-amber-600 transition-all duration-300 transform hover:scale-105 hover:shadow-xl active:scale-95"
            >
              <span>Start Your Gains Journey</span>
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              
              {/* Button glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-amber-400 rounded-full opacity-0 group-hover:opacity-30 transition-opacity duration-300 blur-xl"></div>
            </button>

            <p className="text-gray-400 text-sm mt-4">
              No sign-up required • Free to use • Macro calculations included
            </p>
          </div>

          {/* Demo Preview */}
          <div className={`mt-20 transform transition-all duration-1000 delay-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20 max-w-2xl mx-auto">
              <h3 className="text-xl font-semibold text-white mb-6">From Ingredients to Gains</h3>
              
              <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-6">
                <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/20">
                  <span className="text-gray-200">🧄 Paneer</span>
                </div>
                <div className="text-yellow-400">+</div>
                <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/20">
                  <span className="text-gray-200">🌶️ Masala</span>
                </div>
                <div className="text-yellow-400">+</div>
                <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/20">
                  <span className="text-gray-200">🥬 Spinach</span>
                </div>
                <div className="text-yellow-400">=</div>
                <div className="flex items-center space-x-2 bg-gradient-to-r from-yellow-500/20 to-amber-500/20 text-yellow-300 px-4 py-2 rounded-lg border border-yellow-400/30">
                  <Dumbbell className="w-4 h-4" />
                  <span className="font-medium">35g Protein!</span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-4 text-center">
                <div className="bg-white/5 rounded-lg p-3">
                  <div className="text-yellow-400 font-bold text-lg">25g</div>
                  <div className="text-gray-400 text-xs">Protein</div>
                </div>
                <div className="bg-white/5 rounded-lg p-3">
                  <div className="text-amber-400 font-bold text-lg">15g</div>
                  <div className="text-gray-400 text-xs">Carbs</div>
                </div>
                <div className="bg-white/5 rounded-lg p-3">
                  <div className="text-orange-400 font-bold text-lg">320</div>
                  <div className="text-gray-400 text-xs">Calories</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 px-6 py-8 mt-20">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-400 text-sm">
            Made with 🔥 for desi fitness enthusiasts
          </p>
        </div>
      </footer>
    </div>
  );
}