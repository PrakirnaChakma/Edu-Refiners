import { X, Target, Users, Trophy, Image as ImageIcon, Newspaper, Mail } from 'lucide-react';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
  theme: 'light' | 'dark';
  aboutData: any;
}

export function AboutModal({ isOpen, onClose, theme, aboutData }: AboutModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <div
        className={`max-w-4xl w-full max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl ${
          theme === 'dark' ? 'bg-gray-900' : 'bg-white'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className={`sticky top-0 flex items-center justify-between p-6 border-b ${
          theme === 'dark' ? 'bg-gray-900 border-purple-900/50' : 'bg-white border-purple-200/50'
        }`}>
          <h2 className={`text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent`}>
            About Refiners Team
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
        <div className="p-6 space-y-8">
          {/* Our Story */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <Users className={`w-6 h-6 ${theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}`} />
              <h3 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Our Story
              </h3>
            </div>
            <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
              {aboutData.story || "Refiners Team was founded by a group of passionate students who recognized the challenges that juniors face in their academic journey. We believe that every student deserves access to quality guidance and resources, regardless of their background. Our mission is to create a supportive community where knowledge flows freely and no question goes unanswered."}
            </p>
          </section>

          {/* Our Goals */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <Target className={`w-6 h-6 ${theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}`} />
              <h3 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Our Goals
              </h3>
            </div>
            <ul className={`space-y-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
              {(aboutData.goals || [
                "Provide personalized 1:1 guidance to students struggling with their coursework",
                "Build a comprehensive library of academic resources accessible to all",
                "Foster a collaborative learning environment where peers help peers",
                "Keep students informed with important academic notices and updates"
              ]).map((goal: string, idx: number) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-purple-500 mt-1">•</span>
                  <span>{goal}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Team Highlights */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <Trophy className={`w-6 h-6 ${theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}`} />
              <h3 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Team Highlights
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {(aboutData.highlights || [
                { label: "Students Helped", value: "500+" },
                { label: "Resources Shared", value: "50+" },
                { label: "Active Mentors", value: "15+" }
              ]).map((highlight: any, idx: number) => (
                <div key={idx} className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-purple-900/20 border border-purple-800/30' : 'bg-purple-50 border border-purple-200'}`}>
                  <div className={`text-3xl font-bold ${theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}`}>{highlight.value}</div>
                  <div className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>{highlight.label}</div>
                </div>
              ))}
            </div>
          </section>

          {/* Gallery */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <ImageIcon className={`w-6 h-6 ${theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}`} />
              <h3 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Gallery
              </h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className={`aspect-video rounded-lg ${
                    theme === 'dark' ? 'bg-purple-900/20 border border-purple-800/30' : 'bg-purple-100 border border-purple-200'
                  } flex items-center justify-center`}
                >
                  <ImageIcon className={`w-8 h-8 ${theme === 'dark' ? 'text-purple-600' : 'text-purple-400'}`} />
                </div>
              ))}
            </div>
          </section>

          {/* Latest Updates */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <Newspaper className={`w-6 h-6 ${theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}`} />
              <h3 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Latest Updates
              </h3>
            </div>
            <div className="space-y-3">
              <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-800 border border-gray-700' : 'bg-gray-50 border border-gray-200'}`}>
                <div className={`font-semibold ${theme === 'dark' ? 'text-purple-400' : 'text-purple-600'} mb-1`}>
                  January 2026
                </div>
                <div className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  Launched new study resource library with 20+ comprehensive guides
                </div>
              </div>
              <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-800 border border-gray-700' : 'bg-gray-50 border border-gray-200'}`}>
                <div className={`font-semibold ${theme === 'dark' ? 'text-purple-400' : 'text-purple-600'} mb-1`}>
                  December 2025
                </div>
                <div className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  Expanded mentorship program with 5 new senior mentors
                </div>
              </div>
            </div>
          </section>

          {/* Ready to Connect */}
          <section className={`p-6 rounded-lg ${
            theme === 'dark' 
              ? 'bg-gradient-to-r from-purple-900/40 to-pink-900/40 border border-purple-700/50' 
              : 'bg-gradient-to-r from-purple-100 to-pink-100 border border-purple-300'
          }`}>
            <div className="flex items-center gap-2 mb-3">
              <Mail className={`w-6 h-6 ${theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}`} />
              <h3 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Ready to Connect?
              </h3>
            </div>
            <p className={`mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
              Join our community today and get the academic support you need. Reach out through our contact directory below or follow us on social media!
            </p>
            <button
              onClick={() => {
                onClose();
                setTimeout(() => {
                  const element = document.getElementById('contacts');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                }, 300);
              }}
              className={`px-6 py-3 rounded-full font-semibold ${
                theme === 'dark' 
                  ? 'bg-purple-600 hover:bg-purple-700 text-white' 
                  : 'bg-purple-600 hover:bg-purple-700 text-white'
              } transition-colors`}
            >
              Get Started
            </button>
          </section>
        </div>
      </div>
    </div>
  );
}