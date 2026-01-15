import { X, Mail, Phone, MessageCircle, Instagram, Twitter, Facebook, MessageSquare } from 'lucide-react';
import { motion } from 'motion/react';

interface ContactProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  contact: any;
  theme: 'light' | 'dark';
}

const getSocialIcon = (platform: string) => {
  const iconClass = "w-5 h-5";
  switch (platform.toLowerCase()) {
    case 'email':
      return <Mail className={iconClass} />;
    case 'phone':
      return <Phone className={iconClass} />;
    case 'whatsapp':
      return <MessageCircle className={iconClass} />;
    case 'instagram':
      return <Instagram className={iconClass} />;
    case 'twitter':
    case 'x':
      return <Twitter className={iconClass} />;
    case 'facebook':
      return <Facebook className={iconClass} />;
    case 'discord':
      return <MessageSquare className={iconClass} />;
    default:
      return <Mail className={iconClass} />;
  }
};

export function ContactProfileModal({ isOpen, onClose, contact, theme }: ContactProfileModalProps) {
  if (!isOpen || !contact) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className={`max-w-3xl w-full max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl ${
          theme === 'dark' ? 'bg-gray-900' : 'bg-white'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className={`sticky top-0 flex items-center justify-between p-6 border-b ${
          theme === 'dark' ? 'bg-gray-900 border-purple-900/50' : 'bg-white border-purple-200/50'
        }`}>
          <h2 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Profile Details
          </h2>
          <button
            onClick={onClose}
            className={`p-2 rounded-full ${
              theme === 'dark' ? 'hover:bg-gray-800 text-gray-400' : 'hover:bg-gray-100 text-gray-600'
            } transition-colors`}
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Profile Picture and Basic Info */}
          <div className="flex flex-col items-center text-center mb-8">
            <div className={`w-32 h-32 rounded-2xl flex items-center justify-center mb-4 ${
              theme === 'dark' ? 'bg-gradient-to-br from-purple-600 to-purple-900' : 'bg-gradient-to-br from-purple-400 to-purple-600'
            }`}>
              <span className="text-white font-bold text-5xl">{contact.name[0]}</span>
            </div>
            <h3 className={`text-3xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              {contact.name}
            </h3>
            <p className={`text-sm mb-3 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              {contact.education}
            </p>
          </div>

          {/* Most Available On */}
          {contact.mostAvailableOn && (
            <div className={`mb-6 p-4 rounded-lg ${
              theme === 'dark' ? 'bg-purple-900/30 border border-purple-800/50' : 'bg-purple-100 border border-purple-300'
            }`}>
              <div className={`text-sm font-semibold mb-2 ${theme === 'dark' ? 'text-purple-300' : 'text-purple-700'}`}>
                Most Available On:
              </div>
              <div className="flex items-center gap-2">
                {getSocialIcon(contact.mostAvailableOn)}
                <span className={`${theme === 'dark' ? 'text-white' : 'text-gray-900'} capitalize`}>
                  {contact.mostAvailableOn}
                </span>
              </div>
            </div>
          )}

          {/* Bio/Quote */}
          <div className={`mb-6 p-4 rounded-lg ${
            theme === 'dark' ? 'bg-gray-800 border border-gray-700' : 'bg-gray-50 border border-gray-200'
          }`}>
            <div className={`text-sm font-semibold mb-2 ${theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}`}>
              Bio:
            </div>
            <p className={`italic ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
              "{contact.bio}"
            </p>
          </div>

          {/* Subjects */}
          <div className="mb-6">
            <div className={`text-sm font-semibold mb-2 ${theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}`}>
              Subjects:
            </div>
            <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
              {contact.subjects}
            </p>
          </div>

          {/* Best At */}
          {contact.bestAt && (
            <div className="mb-6">
              <div className={`text-sm font-semibold mb-2 ${theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}`}>
                Best At:
              </div>
              <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                {contact.bestAt}
              </p>
            </div>
          )}

          {/* Contact Links */}
          <div>
            <div className={`text-sm font-semibold mb-3 ${theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}`}>
              Contact:
            </div>
            <div className="space-y-3">
              {contact.socials.map((social: any, idx: number) => (
                <a
                  key={idx}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-3 p-3 rounded-lg transition-all hover:scale-102 ${
                    theme === 'dark' ? 'bg-purple-900/20 hover:bg-purple-800/30 border border-purple-800/30' : 'bg-purple-50 hover:bg-purple-100 border border-purple-200'
                  }`}
                >
                  <div className={`p-2 rounded-full ${
                    theme === 'dark' ? 'bg-purple-800/50' : 'bg-purple-200'
                  }`}>
                    {getSocialIcon(social.platform)}
                  </div>
                  <div className="flex-1">
                    <div className={`text-sm capitalize ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                      {social.platform}
                    </div>
                    <div className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      {social.username}
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
