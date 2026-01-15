import { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Maximize2, Minimize2, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ContactNoticesProps {
  theme: 'light' | 'dark';
  contacts: any[];
  notices: any[];
  instructions: string;
  onViewAllNotices: () => void;
  onViewContact: (contact: any) => void;
}

const getSocialIcon = (platform: string) => {
  const iconClass = "w-5 h-5";
  switch (platform.toLowerCase()) {
    case 'email':
      return <Mail className={iconClass} />;
    default:
      return <Mail className={iconClass} />;
  }
};

export function ContactNotices({ theme, contacts, notices, instructions, onViewAllNotices, onViewContact }: ContactNoticesProps) {
  const [expandedContactsDesktop, setExpandedContactsDesktop] = useState(false);
  const [expandedNoticesDesktop, setExpandedNoticesDesktop] = useState(false);
  const [expandedContactsMobile, setExpandedContactsMobile] = useState(false);
  const [expandedNoticesMobile, setExpandedNoticesMobile] = useState(false);
  const [expandedNotice, setExpandedNotice] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  const contactScrollRef = useRef<HTMLDivElement>(null);
  const noticeScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const scrollContacts = (direction: 'left' | 'right') => {
    if (contactScrollRef.current) {
      const scrollAmount = 300;
      contactScrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const scrollNotices = (direction: 'up' | 'down') => {
    if (noticeScrollRef.current) {
      const scrollAmount = 200;
      noticeScrollRef.current.scrollBy({
        top: direction === 'up' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  // Mobile View - Stacked
  if (isMobile) {
    return (
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-6">
        {/* Contact Directory - Mobile */}
        <div id="contacts" className={`rounded-2xl overflow-hidden ${
          theme === 'dark' ? 'bg-gray-900 border border-purple-900/50' : 'bg-white border border-purple-200/50'
        } shadow-lg`}>
          <div className={`p-6 border-b ${theme === 'dark' ? 'border-gray-800' : 'border-gray-100'}`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Mail className={`w-6 h-6 ${theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}`} />
                <h3 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Contact Directory
                </h3>
              </div>
            </div>
          </div>
          
          <AnimatePresence mode="wait">
            {!expandedContactsMobile ? (
              <motion.div key="contacts-collapsed" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                {/* Horizontal Scroll Carousel */}
                <div className="relative p-6">
                  <div className="overflow-x-auto scrollbar-hide" ref={contactScrollRef}>
                    <div className="flex gap-4 pb-2">
                      {contacts.map((contact) => (
                        <div
                          key={contact.id}
                          onClick={() => onViewContact(contact)}
                          className={`flex-shrink-0 w-48 p-4 rounded-lg cursor-pointer transition-all hover:scale-105 ${
                            theme === 'dark' ? 'bg-purple-900/20 border border-purple-800/30 hover:bg-purple-800/30' : 'bg-purple-50 border border-purple-200 hover:bg-purple-100'
                          }`}
                        >
                          <div className="flex flex-col items-center text-center">
                            <div className={`w-16 h-16 rounded-lg flex items-center justify-center mb-3 overflow-hidden ${
                              theme === 'dark' ? 'bg-purple-700' : 'bg-purple-300'
                            }`}>
                              {contact.photo ? (
                                <img src={contact.photo} alt={contact.name} className="w-full h-full object-cover" />
                              ) : (
                                <span className="text-white font-bold text-xl">{contact.name[0]}</span>
                              )}
                            </div>
                            <h4 className={`font-semibold text-sm ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                              {contact.name}
                            </h4>
                            <p className={`text-xs mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                              {contact.subjects?.substring(0, 30)}...
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="p-4 border-t ${theme === 'dark' ? 'border-gray-800' : 'border-gray-100'}">
                  <button
                    onClick={() => setExpandedContactsMobile(true)}
                    className={`w-full py-3 rounded-lg font-medium transition-colors ${
                      theme === 'dark' ? 'bg-purple-700 hover:bg-purple-600 text-white' : 'bg-purple-600 hover:bg-purple-700 text-white'
                    }`}
                  >
                    View All
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="contacts-expanded"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="p-6"
              >
                {instructions && (
                  <p className={`mb-6 p-4 rounded-lg text-sm ${
                    theme === 'dark' ? 'bg-purple-900/20 text-gray-300' : 'bg-purple-50 text-gray-700'
                  }`}>
                    {instructions}
                  </p>
                )}
                
                <div className="max-h-[600px] overflow-y-auto space-y-4">
                  {contacts.map((contact) => (
                    <div
                      key={contact.id}
                      className={`p-4 rounded-lg transition-all hover:scale-102 cursor-pointer ${
                        theme === 'dark' ? 'bg-purple-900/20 border border-purple-800/30 hover:bg-purple-800/30' : 'bg-purple-50 border border-purple-200 hover:bg-purple-100'
                      }`}
                      onClick={() => onViewContact(contact)}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden ${
                          theme === 'dark' ? 'bg-purple-700' : 'bg-purple-300'
                        }`}>
                          {contact.photo ? (
                            <img src={contact.photo} alt={contact.name} className="w-full h-full object-cover" />
                          ) : (
                            <span className="text-white font-bold text-lg">{contact.name[0]}</span>
                          )}
                        </div>
                        <div className="flex-1">
                          <h4 className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                            {contact.name}
                          </h4>
                          <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                            {contact.subjects}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <button
                  onClick={() => setExpandedContactsMobile(false)}
                  className={`w-full mt-4 py-3 rounded-lg font-medium transition-colors ${
                    theme === 'dark' ? 'bg-gray-800 hover:bg-gray-700 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-900'
                  }`}
                >
                  Show Less
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Latest Notices - Mobile */}
        <div id="notices" className={`rounded-2xl overflow-hidden ${
          theme === 'dark' ? 'bg-gray-900 border border-purple-900/50' : 'bg-white border border-purple-200/50'
        } shadow-lg`}>
          <div className={`p-6 border-b ${theme === 'dark' ? 'border-gray-800' : 'border-gray-100'}`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Mail className={`w-6 h-6 ${theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}`} />
                <h3 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Latest Notices
                </h3>
              </div>
            </div>
          </div>
          
          <AnimatePresence mode="wait">
            {!expandedNoticesMobile ? (
              <motion.div key="notices-collapsed" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <div className="p-6 space-y-4">
                  {notices.slice(0, 2).map((notice) => (
                    <div
                      key={notice.id}
                      className={`p-4 rounded-lg ${
                        theme === 'dark' ? 'bg-purple-900/20 border border-purple-800/30' : 'bg-purple-50 border border-purple-200'
                      }`}
                    >
                      <div className={`text-sm ${theme === 'dark' ? 'text-purple-400' : 'text-purple-600'} mb-1`}>
                        {notice.date}
                      </div>
                      <h4 className={`font-semibold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                        {notice.title}
                      </h4>
                      <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                        {notice.preview}
                      </p>
                    </div>
                  ))}
                </div>
                <div className={`p-4 border-t ${theme === 'dark' ? 'border-gray-800' : 'border-gray-100'}`}>
                  <button
                    onClick={() => setExpandedNoticesMobile(true)}
                    className={`w-full py-3 rounded-lg font-medium transition-colors ${
                      theme === 'dark' ? 'bg-purple-700 hover:bg-purple-600 text-white' : 'bg-purple-600 hover:bg-purple-700 text-white'
                    }`}
                  >
                    View All
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="notices-expanded"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="p-6"
              >
                <div className="max-h-[600px] overflow-y-auto space-y-4">
                  {notices.map((notice) => (
                    <div
                      key={notice.id}
                      className={`p-4 rounded-lg ${
                        theme === 'dark' ? 'bg-purple-900/20 border border-purple-800/30' : 'bg-purple-50 border border-purple-200'
                      }`}
                    >
                      <div className={`text-sm ${theme === 'dark' ? 'text-purple-400' : 'text-purple-600'} mb-1`}>
                        {notice.date}
                      </div>
                      <h4 className={`font-semibold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                        {notice.title}
                      </h4>
                      <p className={`mb-3 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                        {expandedNotice === notice.id ? notice.fullContent : notice.preview}
                      </p>
                      <button
                        onClick={() => setExpandedNotice(expandedNotice === notice.id ? null : notice.id)}
                        className={`text-sm font-medium ${
                          theme === 'dark' ? 'text-purple-400 hover:text-purple-300' : 'text-purple-600 hover:text-purple-700'
                        }`}
                      >
                        {expandedNotice === notice.id ? 'Show Less' : 'Show More'}
                      </button>
                    </div>
                  ))}
                </div>
                
                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => setExpandedNoticesMobile(false)}
                    className={`flex-1 py-3 rounded-lg font-medium transition-colors ${
                      theme === 'dark' ? 'bg-gray-800 hover:bg-gray-700 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-900'
                    }`}
                  >
                    Show Less
                  </button>
                  <button
                    onClick={onViewAllNotices}
                    className={`flex-1 py-3 rounded-lg font-medium transition-colors ${
                      theme === 'dark' ? 'bg-purple-700 hover:bg-purple-600 text-white' : 'bg-purple-600 hover:bg-purple-700 text-white'
                    }`}
                  >
                    View All Notices
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    );
  }

  // Desktop View
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <AnimatePresence mode="wait">
        {!expandedContactsDesktop && !expandedNoticesDesktop ? (
          <motion.div
            key="collapsed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid md:grid-cols-2 gap-6"
          >
            {/* Contact Directory - Collapsed */}
            <div id="contacts" className={`rounded-2xl overflow-hidden ${
              theme === 'dark' ? 'bg-gray-900 border border-purple-900/50' : 'bg-white border border-purple-200/50'
            } shadow-lg`}>
              <div className={`p-6 border-b ${theme === 'dark' ? 'border-gray-800' : 'border-gray-100'}`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Mail className={`w-6 h-6 ${theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}`} />
                    <h3 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      Contact Directory
                    </h3>
                  </div>
                  <button
                    onClick={() => setExpandedContactsDesktop(true)}
                    className={`p-2 rounded-lg transition-colors ${
                      theme === 'dark' ? 'hover:bg-gray-800 text-purple-400' : 'hover:bg-gray-100 text-purple-600'
                    }`}
                  >
                    <Maximize2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
              
              {/* Horizontal Scroll Carousel */}
              <div className="relative p-6">
                <button
                  onClick={() => scrollContacts('left')}
                  className={`absolute left-2 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full ${
                    theme === 'dark' ? 'bg-gray-800/80 hover:bg-gray-700 text-white' : 'bg-white/80 hover:bg-gray-100 text-gray-900'
                  } shadow-lg transition-colors`}
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                
                <div className="overflow-x-auto scrollbar-hide" ref={contactScrollRef}>
                  <div className="flex gap-4 pb-2">
                    {contacts.map((contact) => (
                      <div
                        key={contact.id}
                        onClick={() => onViewContact(contact)}
                        className={`flex-shrink-0 w-48 p-4 rounded-lg cursor-pointer transition-all hover:scale-105 ${
                          theme === 'dark' ? 'bg-purple-900/20 border border-purple-800/30 hover:bg-purple-800/30' : 'bg-purple-50 border border-purple-200 hover:bg-purple-100'
                        }`}
                      >
                        <div className="flex flex-col items-center text-center">
                          <div className={`w-16 h-16 rounded-lg flex items-center justify-center mb-3 overflow-hidden ${
                            theme === 'dark' ? 'bg-purple-700' : 'bg-purple-300'
                          }`}>
                            {contact.photo ? (
                              <img src={contact.photo} alt={contact.name} className="w-full h-full object-cover" />
                            ) : (
                              <span className="text-white font-bold text-xl">{contact.name[0]}</span>
                            )}
                          </div>
                          <h4 className={`font-semibold text-sm ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                            {contact.name}
                          </h4>
                          <p className={`text-xs mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                            {contact.subjects?.substring(0, 30)}...
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <button
                  onClick={() => scrollContacts('right')}
                  className={`absolute right-2 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full ${
                    theme === 'dark' ? 'bg-gray-800/80 hover:bg-gray-700 text-white' : 'bg-white/80 hover:bg-gray-100 text-gray-900'
                  } shadow-lg transition-colors`}
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              <div className={`p-4 border-t ${theme === 'dark' ? 'border-gray-800' : 'border-gray-100'}`}>
                <button
                  onClick={() => setExpandedContactsDesktop(true)}
                  className={`w-full py-2 rounded-lg font-medium text-sm transition-colors ${
                    theme === 'dark' ? 'bg-purple-700 hover:bg-purple-600 text-white' : 'bg-purple-600 hover:bg-purple-700 text-white'
                  }`}
                >
                  View All
                </button>
              </div>
            </div>

            {/* Latest Notices - Collapsed */}
            <div id="notices" className={`rounded-2xl overflow-hidden ${
              theme === 'dark' ? 'bg-gray-900 border border-purple-900/50' : 'bg-white border border-purple-200/50'
            } shadow-lg`}>
              <div className={`p-6 border-b ${theme === 'dark' ? 'border-gray-800' : 'border-gray-100'}`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Mail className={`w-6 h-6 ${theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}`} />
                    <h3 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      Latest Notices
                    </h3>
                  </div>
                  <button
                    onClick={() => setExpandedNoticesDesktop(true)}
                    className={`p-2 rounded-lg transition-colors ${
                      theme === 'dark' ? 'hover:bg-gray-800 text-purple-400' : 'hover:bg-gray-100 text-purple-600'
                    }`}
                  >
                    <Maximize2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
              
              {/* Vertical Scroll Preview */}
              <div className="relative p-6">
                <div className="max-h-64 overflow-y-auto space-y-3" ref={noticeScrollRef}>
                  {notices.slice(0, 3).map((notice) => (
                    <div
                      key={notice.id}
                      className={`p-4 rounded-lg ${
                        theme === 'dark' ? 'bg-purple-900/20 border border-purple-800/30' : 'bg-purple-50 border border-purple-200'
                      }`}
                    >
                      <div className={`text-sm ${theme === 'dark' ? 'text-purple-400' : 'text-purple-600'} mb-1`}>
                        {notice.date}
                      </div>
                      <h4 className={`font-semibold mb-2 text-sm ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                        {notice.title}
                      </h4>
                      <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                        {notice.preview.substring(0, 80)}...
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className={`p-4 border-t ${theme === 'dark' ? 'border-gray-800' : 'border-gray-100'}`}>
                <button
                  onClick={() => setExpandedNoticesDesktop(true)}
                  className={`w-full py-2 rounded-lg font-medium text-sm transition-colors ${
                    theme === 'dark' ? 'bg-purple-700 hover:bg-purple-600 text-white' : 'bg-purple-600 hover:bg-purple-700 text-white'
                  }`}
                >
                  View All
                </button>
              </div>
            </div>
          </motion.div>
        ) : expandedContactsDesktop ? (
          <motion.div
            key="contacts-expanded"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className={`rounded-2xl overflow-hidden ${
              theme === 'dark' ? 'bg-gray-900 border border-purple-900/50' : 'bg-white border border-purple-200/50'
            } shadow-2xl`}
          >
            <div className={`p-6 border-b ${theme === 'dark' ? 'border-gray-800' : 'border-gray-100'}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Mail className={`w-6 h-6 ${theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}`} />
                  <h3 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    Contact Directory
                  </h3>
                </div>
                <button
                  onClick={() => setExpandedContactsDesktop(false)}
                  className={`p-2 rounded-lg transition-colors ${
                    theme === 'dark' ? 'hover:bg-gray-800 text-purple-400' : 'hover:bg-gray-100 text-purple-600'
                  }`}
                >
                  <Minimize2 className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            <div className="p-6 max-h-[600px] overflow-y-auto">
              {instructions && (
                <p className={`mb-6 p-4 rounded-lg ${
                  theme === 'dark' ? 'bg-purple-900/20 text-gray-300' : 'bg-purple-50 text-gray-700'
                }`}>
                  {instructions}
                </p>
              )}
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {contacts.map((contact) => (
                  <div
                    key={contact.id}
                    className={`p-4 rounded-lg transition-all hover:scale-102 cursor-pointer ${
                      theme === 'dark' ? 'bg-purple-900/20 border border-purple-800/30 hover:bg-purple-800/30' : 'bg-purple-50 border border-purple-200 hover:bg-purple-100'
                    }`}
                    onClick={() => onViewContact(contact)}
                  >
                    <div className="flex flex-col items-center text-center mb-4">
                      <div className={`w-20 h-20 rounded-xl flex items-center justify-center mb-3 overflow-hidden ${
                        theme === 'dark' ? 'bg-purple-700' : 'bg-purple-300'
                      }`}>
                        {contact.photo ? (
                          <img src={contact.photo} alt={contact.name} className="w-full h-full object-cover" />
                        ) : (
                          <span className="text-white font-bold text-2xl">{contact.name[0]}</span>
                        )}
                      </div>
                      <h4 className={`font-semibold mb-1 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                        {contact.name}
                      </h4>
                      <p className={`text-xs mb-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                        {contact.education}
                      </p>
                      <p className={`text-sm mb-2 ${theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}`}>
                        {contact.subjects}
                      </p>
                      <p className={`text-xs italic ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
                        "{contact.bio}"
                      </p>
                    </div>
                    
                    <button
                      className={`w-full py-2 rounded-lg font-medium text-sm transition-colors ${
                        theme === 'dark' ? 'bg-purple-700 hover:bg-purple-600 text-white' : 'bg-purple-600 hover:bg-purple-700 text-white'
                      }`}
                    >
                      View More
                    </button>
                  </div>
                ))}
              </div>
            </div>
            
            <div className={`p-4 border-t ${theme === 'dark' ? 'border-gray-800' : 'border-gray-100'}`}>
              <button
                onClick={() => setExpandedContactsDesktop(false)}
                className={`w-full py-2 rounded-lg font-medium text-sm transition-colors ${
                  theme === 'dark' ? 'bg-gray-800 hover:bg-gray-700 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-900'
                }`}
              >
                Show Less
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="notices-expanded"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className={`rounded-2xl overflow-hidden ${
              theme === 'dark' ? 'bg-gray-900 border border-purple-900/50' : 'bg-white border border-purple-200/50'
            } shadow-2xl`}
          >
            <div className={`p-6 border-b ${theme === 'dark' ? 'border-gray-800' : 'border-gray-100'}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Mail className={`w-6 h-6 ${theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}`} />
                  <h3 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    Latest Notices
                  </h3>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={onViewAllNotices}
                    className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                      theme === 'dark' ? 'bg-purple-700 hover:bg-purple-600 text-white' : 'bg-purple-600 hover:bg-purple-700 text-white'
                    }`}
                  >
                    View All Notices
                  </button>
                  <button
                    onClick={() => setExpandedNoticesDesktop(false)}
                    className={`p-2 rounded-lg transition-colors ${
                      theme === 'dark' ? 'hover:bg-gray-800 text-purple-400' : 'hover:bg-gray-100 text-purple-600'
                    }`}
                  >
                    <Minimize2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
            
            <div className="p-6 max-h-[600px] overflow-y-auto">
              <div className="space-y-4">
                {notices.map((notice) => (
                  <div
                    key={notice.id}
                    className={`p-4 rounded-lg ${
                      theme === 'dark' ? 'bg-purple-900/20 border border-purple-800/30' : 'bg-purple-50 border border-purple-200'
                    }`}
                  >
                    <div className={`text-sm ${theme === 'dark' ? 'text-purple-400' : 'text-purple-600'} mb-1`}>
                      {notice.date}
                    </div>
                    <h4 className={`font-semibold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      {notice.title}
                    </h4>
                    <p className={`mb-3 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      {expandedNotice === notice.id ? notice.fullContent : notice.preview}
                    </p>
                    <button
                      onClick={() => setExpandedNotice(expandedNotice === notice.id ? null : notice.id)}
                      className={`text-sm font-medium ${
                        theme === 'dark' ? 'text-purple-400 hover:text-purple-300' : 'text-purple-600 hover:text-purple-700'
                      }`}
                    >
                      {expandedNotice === notice.id ? 'Show Less' : 'Show More'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
            
            <div className={`p-4 border-t ${theme === 'dark' ? 'border-gray-800' : 'border-gray-100'}`}>
              <button
                onClick={() => setExpandedNoticesDesktop(false)}
                className={`w-full py-2 rounded-lg font-medium text-sm transition-colors ${
                  theme === 'dark' ? 'bg-gray-800 hover:bg-gray-700 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-900'
                }`}
              >
                Show Less
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
