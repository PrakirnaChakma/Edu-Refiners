import { useState } from 'react';
import { X, Search } from 'lucide-react';
import { motion } from 'motion/react';

interface AllNoticesPageProps {
  isOpen: boolean;
  onClose: () => void;
  notices: any[];
  theme: 'light' | 'dark';
}

export function AllNoticesPage({ isOpen, onClose, notices, theme }: AllNoticesPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedNotice, setExpandedNotice] = useState<string | null>(null);

  if (!isOpen) return null;

  const filteredNotices = notices.filter(notice =>
    notice.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    notice.fullContent.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className={`max-w-5xl w-full h-[90vh] rounded-2xl shadow-2xl flex flex-col ${
          theme === 'dark' ? 'bg-gray-900' : 'bg-white'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className={`flex items-center justify-between p-6 border-b ${
          theme === 'dark' ? 'border-purple-900/50' : 'border-purple-200/50'
        }`}>
          <h2 className={`text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent`}>
            All Notices
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

        {/* Search Bar */}
        <div className="p-6 pb-4">
          <div className={`flex items-center gap-3 px-4 py-3 rounded-lg ${
            theme === 'dark' ? 'bg-gray-800 border border-gray-700' : 'bg-gray-50 border border-gray-200'
          }`}>
            <Search className={`w-5 h-5 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`} />
            <input
              type="text"
              placeholder="Search notices..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`flex-1 bg-transparent outline-none ${
                theme === 'dark' ? 'text-white placeholder-gray-400' : 'text-gray-900 placeholder-gray-500'
              }`}
            />
          </div>
        </div>

        {/* Notices List */}
        <div className="flex-1 overflow-y-auto px-6 pb-6">
          <div className="space-y-4">
            {filteredNotices.length > 0 ? (
              filteredNotices.map((notice) => (
                <div
                  key={notice.id}
                  className={`p-5 rounded-lg ${
                    theme === 'dark' ? 'bg-gray-800 border border-gray-700' : 'bg-gray-50 border border-gray-200'
                  }`}
                >
                  <div className={`text-sm mb-2 ${theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}`}>
                    {notice.date}
                  </div>
                  <h3 className={`text-xl font-bold mb-3 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    {notice.title}
                  </h3>
                  <p className={`mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                    {expandedNotice === notice.id ? notice.fullContent : notice.preview}
                  </p>
                  {notice.images && notice.images.length > 0 && (
                    <div className="flex flex-wrap gap-3 mb-4">
                      {notice.images.map((img: string, idx: number) => (
                        <img 
                          key={idx} 
                          src={img} 
                          alt="" 
                          className="w-32 h-32 object-cover rounded-lg" 
                        />
                      ))}
                    </div>
                  )}
                  <button
                    onClick={() => setExpandedNotice(expandedNotice === notice.id ? null : notice.id)}
                    className={`text-sm font-medium ${
                      theme === 'dark' ? 'text-purple-400 hover:text-purple-300' : 'text-purple-600 hover:text-purple-700'
                    }`}
                  >
                    {expandedNotice === notice.id ? 'Show Less' : 'Show More'}
                  </button>
                </div>
              ))
            ) : (
              <div className={`text-center py-12 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                No notices found matching your search.
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
