import { Sparkles, Bell, Users, BookOpen } from 'lucide-react';

interface HeroSectionProps {
  theme: 'light' | 'dark';
  onLearnMore: () => void;
  landingData: {
    welcomeText: string;
    subtext1: string;
    subtext2: string;
  };
}

export function HeroSection({ theme, onLearnMore, landingData }: HeroSectionProps) {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center px-4 pt-16 relative overflow-hidden">
      {/* Dot Grid Background with Glow */}
      <div 
        className="absolute inset-0 opacity-50"
        style={{
          backgroundImage: `radial-gradient(circle, ${theme === 'dark' ? '#8b5cf6' : '#a855f7'} 1.5px, transparent 1.5px)`,
          backgroundSize: '30px 30px'
        }}
      />
      
      {/* Central Glow Effect */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at center, ${theme === 'dark' ? 'rgba(139, 92, 246, 0.3)' : 'rgba(168, 85, 247, 0.2)'} 0%, transparent 70%)`
        }}
      />
      
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <h1 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'} px-2`}>
          {landingData.welcomeText.split('Edu Refiners')[0]}
          <span 
            className="bg-gradient-to-r from-purple-600 via-purple-500 to-pink-500 bg-clip-text text-transparent inline-block"
            style={{
              filter: theme === 'dark' 
                ? 'drop-shadow(0 0 20px rgba(168, 85, 247, 0.4)) drop-shadow(0 0 40px rgba(168, 85, 247, 0.2))' 
                : 'drop-shadow(0 0 15px rgba(168, 85, 247, 0.3))'
            }}
          >
            Edu Refiners
          </span>
        </h1>
        
        <p className={`text-base sm:text-lg md:text-xl mb-3 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} px-4`}>
          {landingData.subtext1}
        </p>
        
        <p className={`text-sm sm:text-base md:text-lg mb-8 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} px-4`}>
          {landingData.subtext2}
        </p>
        
        {/* Primary Button */}
        <button
          onClick={onLearnMore}
          className={`inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg transition-all transform hover:scale-105 mb-6 ${
            theme === 'dark' 
              ? 'bg-gradient-to-r from-purple-600 to-purple-800 text-white hover:from-purple-700 hover:to-purple-900 shadow-lg shadow-purple-900/50' 
              : 'bg-gradient-to-r from-purple-500 to-purple-700 text-white hover:from-purple-600 hover:to-purple-800 shadow-lg shadow-purple-500/50'
          }`}
          style={{
            filter: theme === 'dark'
              ? 'drop-shadow(0 0 15px rgba(147, 51, 234, 0.4))'
              : 'drop-shadow(0 0 10px rgba(147, 51, 234, 0.3))'
          }}
        >
          <Sparkles className="w-5 h-5" />
          Learn More About Us
        </button>

        {/* Secondary Buttons */}
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4 px-4">
          <button
            onClick={() => scrollToSection('notices')}
            className={`inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-full font-medium text-xs sm:text-sm transition-all hover:scale-105 ${
              theme === 'dark'
                ? 'bg-purple-900/20 text-purple-300 border border-purple-700/30 hover:bg-purple-800/30 hover:border-purple-600/50'
                : 'bg-purple-100/50 text-purple-700 border border-purple-300/50 hover:bg-purple-200/70 hover:border-purple-400/70'
            }`}
            style={{
              filter: theme === 'dark'
                ? 'drop-shadow(0 0 8px rgba(147, 51, 234, 0.15))'
                : 'drop-shadow(0 0 5px rgba(147, 51, 234, 0.1))'
            }}
          >
            <Bell className="w-4 h-4" />
            Notices
          </button>

          <button
            onClick={() => scrollToSection('contacts')}
            className={`inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-full font-medium text-xs sm:text-sm transition-all hover:scale-105 ${
              theme === 'dark'
                ? 'bg-purple-900/20 text-purple-300 border border-purple-700/30 hover:bg-purple-800/30 hover:border-purple-600/50'
                : 'bg-purple-100/50 text-purple-700 border border-purple-300/50 hover:bg-purple-200/70 hover:border-purple-400/70'
            }`}
            style={{
              filter: theme === 'dark'
                ? 'drop-shadow(0 0 8px rgba(147, 51, 234, 0.15))'
                : 'drop-shadow(0 0 5px rgba(147, 51, 234, 0.1))'
            }}
          >
            <Users className="w-4 h-4" />
            Contacts
          </button>

          <button
            onClick={() => scrollToSection('resources')}
            className={`inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-full font-medium text-xs sm:text-sm transition-all hover:scale-105 ${
              theme === 'dark'
                ? 'bg-purple-900/20 text-purple-300 border border-purple-700/30 hover:bg-purple-800/30 hover:border-purple-600/50'
                : 'bg-purple-100/50 text-purple-700 border border-purple-300/50 hover:bg-purple-200/70 hover:border-purple-400/70'
            }`}
            style={{
              filter: theme === 'dark'
                ? 'drop-shadow(0 0 8px rgba(147, 51, 234, 0.15))'
                : 'drop-shadow(0 0 5px rgba(147, 51, 234, 0.1))'
            }}
          >
            <BookOpen className="w-4 h-4" />
            Resources
          </button>
        </div>
      </div>
    </section>
  );
}