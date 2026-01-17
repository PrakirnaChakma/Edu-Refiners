import { Heart, Mail, Phone, Instagram, Twitter } from 'lucide-react';

interface FooterProps {
  theme: 'light' | 'dark';
  footerData: any;
  onAdminClick: () => void;
}

export function Footer({ theme, footerData, onAdminClick }: FooterProps) {
  return (
    <footer className={`${theme === 'dark' ? 'bg-gray-950 border-t border-purple-900/50' : 'bg-gray-100 border-t border-purple-200/50'} mt-16`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <h3 className={`text-xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Edu Refiners
            </h3>
            <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              {footerData.about || "Empowering students through collaborative learning and dedicated mentorship. Together, we refine knowledge and build futures."}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className={`text-xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <a href="#home" className={`${theme === 'dark' ? 'text-gray-400 hover:text-purple-400' : 'text-gray-600 hover:text-purple-600'} transition-colors`}>
                  Home
                </a>
              </li>
              <li>
                <a href="#contacts" className={`${theme === 'dark' ? 'text-gray-400 hover:text-purple-400' : 'text-gray-600 hover:text-purple-600'} transition-colors`}>
                  Contacts
                </a>
              </li>
              <li>
                <a href="#notices" className={`${theme === 'dark' ? 'text-gray-400 hover:text-purple-400' : 'text-gray-600 hover:text-purple-600'} transition-colors`}>
                  Notices
                </a>
              </li>
              <li>
                <a href="#resources" className={`${theme === 'dark' ? 'text-gray-400 hover:text-purple-400' : 'text-gray-600 hover:text-purple-600'} transition-colors`}>
                  Resources
                </a>
              </li>
              <li>
                <button 
                  onClick={onAdminClick}
                  className={`text-xs opacity-30 hover:opacity-100 transition-opacity ${theme === 'dark' ? 'text-gray-600 hover:text-purple-500' : 'text-gray-400 hover:text-purple-600'}`}
                >
                  Admin
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className={`text-xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Get in Touch
            </h3>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Mail className={`w-5 h-5 ${theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}`} />
                <span className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  {footerData.email || "contact@refinersteam.com"}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className={`w-5 h-5 ${theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}`} />
                <span className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  {footerData.phone || "+1 (555) 123-4567"}
                </span>
              </div>
              <div className="flex gap-4 mt-4">
                <button className={`p-2 rounded-full ${
                  theme === 'dark' ? 'bg-purple-900/30 hover:bg-purple-800/50' : 'bg-purple-200 hover:bg-purple-300'
                } transition-colors`}>
                  <Instagram className={`w-5 h-5 ${theme === 'dark' ? 'text-purple-400' : 'text-purple-700'}`} />
                </button>
                <button className={`p-2 rounded-full ${
                  theme === 'dark' ? 'bg-purple-900/30 hover:bg-purple-800/50' : 'bg-purple-200 hover:bg-purple-300'
                } transition-colors`}>
                  <Twitter className={`w-5 h-5 ${theme === 'dark' ? 'text-purple-400' : 'text-purple-700'}`} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={`mt-8 pt-8 border-t ${theme === 'dark' ? 'border-gray-800' : 'border-gray-300'}`}>
          <div className={`text-center flex items-center justify-center gap-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            <span>Made with</span>
            <Heart className={`w-4 h-4 ${theme === 'dark' ? 'text-purple-500 fill-purple-500' : 'text-purple-600 fill-purple-600'}`} />
            <span>by Refiners Team- Prakirna Chakma © 2026</span>
          </div>
        </div>
      </div>
    </footer>
  );
}