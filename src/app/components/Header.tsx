import { useState } from 'react';
import { Moon, Sun, Menu, X } from 'lucide-react';

interface HeaderProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  logoUrl?: string;
  onAboutClick: () => void;
}

export function Header({ theme, toggleTheme, logoUrl, onAboutClick }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  const scrollToHome = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 ${theme === 'dark' ? 'bg-black/80 backdrop-blur-md border-b border-purple-900/50' : 'bg-white/80 backdrop-blur-md border-b border-purple-200/50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Company Name */}
          <button onClick={scrollToHome} className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center overflow-hidden ${theme === 'dark' ? 'bg-gradient-to-br from-purple-600 to-purple-900' : 'bg-gradient-to-br from-purple-400 to-purple-600'}`}>
              {logoUrl ? (
                <img src={logoUrl} alt="Logo" className="w-full h-full object-cover" />
              ) : (
                <span className="text-white font-bold text-xl">R</span>
              )}
            </div>
            <span className={`font-bold text-xl ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Edu Refiners
            </span>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <button
              onClick={() => scrollToSection('home')}
              className={`${theme === 'dark' ? 'text-gray-300 hover:text-purple-400' : 'text-gray-700 hover:text-purple-600'} transition-colors`}
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection('contacts')}
              className={`${theme === 'dark' ? 'text-gray-300 hover:text-purple-400' : 'text-gray-700 hover:text-purple-600'} transition-colors`}
            >
              Contacts
            </button>
            <button
              onClick={() => scrollToSection('notices')}
              className={`${theme === 'dark' ? 'text-gray-300 hover:text-purple-400' : 'text-gray-700 hover:text-purple-600'} transition-colors`}
            >
              Notices
            </button>
            <button
              onClick={() => scrollToSection('resources')}
              className={`${theme === 'dark' ? 'text-gray-300 hover:text-purple-400' : 'text-gray-700 hover:text-purple-600'} transition-colors`}
            >
              Resources
            </button>
            <button
              onClick={onAboutClick}
              className={`${theme === 'dark' ? 'text-gray-300 hover:text-purple-400' : 'text-gray-700 hover:text-purple-600'} transition-colors`}
            >
              About Us
            </button>
            
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg ${theme === 'dark' ? 'bg-purple-900/30 text-yellow-300 hover:bg-purple-800/50' : 'bg-purple-100 text-purple-700 hover:bg-purple-200'} transition-colors`}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg ${theme === 'dark' ? 'bg-purple-900/30 text-yellow-300' : 'bg-purple-100 text-purple-700'}`}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className={`md:hidden py-4 ${theme === 'dark' ? 'bg-black/95' : 'bg-white/95'}`}>
            <nav className="flex flex-col gap-4">
              <button
                onClick={() => scrollToSection('home')}
                className={`text-left px-4 py-2 ${theme === 'dark' ? 'text-gray-300 hover:text-purple-400 hover:bg-purple-900/20' : 'text-gray-700 hover:text-purple-600 hover:bg-purple-50'} transition-colors rounded`}
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection('contacts')}
                className={`text-left px-4 py-2 ${theme === 'dark' ? 'text-gray-300 hover:text-purple-400 hover:bg-purple-900/20' : 'text-gray-700 hover:text-purple-600 hover:bg-purple-50'} transition-colors rounded`}
              >
                Contacts
              </button>
              <button
                onClick={() => scrollToSection('notices')}
                className={`text-left px-4 py-2 ${theme === 'dark' ? 'text-gray-300 hover:text-purple-400 hover:bg-purple-900/20' : 'text-gray-700 hover:text-purple-600 hover:bg-purple-50'} transition-colors rounded`}
              >
                Notices
              </button>
              <button
                onClick={() => scrollToSection('resources')}
                className={`text-left px-4 py-2 ${theme === 'dark' ? 'text-gray-300 hover:text-purple-400 hover:bg-purple-900/20' : 'text-gray-700 hover:text-purple-600 hover:bg-purple-50'} transition-colors rounded`}
              >
                Resources
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onAboutClick();
                }}
                className={`text-left px-4 py-2 ${theme === 'dark' ? 'text-gray-300 hover:text-purple-400 hover:bg-purple-900/20' : 'text-gray-700 hover:text-purple-600 hover:bg-purple-50'} transition-colors rounded`}
              >
                About Us
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}