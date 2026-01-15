import { useState } from 'react';
import { BookOpen, Calculator, Atom, Code, Globe, FileText, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ResourcesSectionProps {
  theme: 'light' | 'dark';
  resources: any[];
}

const getIcon = (iconName: string) => {
  const iconClass = "w-6 h-6";
  switch (iconName) {
    case 'Calculator':
      return <Calculator className={iconClass} />;
    case 'Atom':
      return <Atom className={iconClass} />;
    case 'Code':
      return <Code className={iconClass} />;
    case 'Globe':
      return <Globe className={iconClass} />;
    case 'FileText':
      return <FileText className={iconClass} />;
    case 'BookOpen':
      return <BookOpen className={iconClass} />;
    default:
      return <BookOpen className={iconClass} />;
  }
};

export function ResourcesSection({ theme, resources }: ResourcesSectionProps) {
  const [expandedResource, setExpandedResource] = useState<string | null>(null);

  return (
    <section id="resources" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h2 className={`text-4xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
          Academic Resources
        </h2>
        <p className={`text-lg ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
          Browse our curated collection of study materials and guides
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {resources.map((resource) => {
          const isExpanded = expandedResource === resource.id;
          
          return (
            <motion.div
              key={resource.id}
              layout
              className={`p-6 rounded-2xl transition-all ${
                theme === 'dark'
                  ? 'bg-gradient-to-br from-purple-900/40 to-gray-900 border border-purple-800/30 hover:border-purple-700/50'
                  : 'bg-gradient-to-br from-purple-50 to-white border border-purple-200 hover:border-purple-300'
              } ${isExpanded ? 'shadow-2xl' : 'hover:shadow-xl'}`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                  theme === 'dark' ? 'bg-purple-800/50' : 'bg-purple-200'
                }`}>
                  {getIcon(resource.icon)}
                </div>
                
                <button
                  onClick={() => setExpandedResource(isExpanded ? null : resource.id)}
                  className={`p-2 rounded-lg transition-all ${
                    theme === 'dark' ? 'hover:bg-purple-800/30 text-purple-300' : 'hover:bg-purple-100 text-purple-700'
                  } ${isExpanded ? 'rotate-180' : ''}`}
                >
                  <ChevronDown className="w-5 h-5" />
                </button>
              </div>
              
              <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                {resource.title}
              </h3>
              
              <p className={`mb-4 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                {resource.description}
              </p>
              
              <AnimatePresence>
                {isExpanded && (
                  <motion.ul
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-2 mb-4"
                  >
                    {resource.items.map((item: string, idx: number) => (
                      <li
                        key={idx}
                        className={`flex items-center gap-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${
                          theme === 'dark' ? 'bg-purple-400' : 'bg-purple-600'
                        }`} />
                        {item}
                      </li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
              
              <button
                className={`w-full py-2 rounded-lg font-semibold transition-all hover:scale-105 ${
                  theme === 'dark'
                    ? 'bg-purple-800/50 hover:bg-purple-700/50 text-purple-300'
                    : 'bg-purple-200 hover:bg-purple-300 text-purple-800'
                }`}
                style={{
                  filter: theme === 'dark'
                    ? 'drop-shadow(0 0 6px rgba(147, 51, 234, 0.15))'
                    : 'drop-shadow(0 0 4px rgba(147, 51, 234, 0.1))'
                }}
              >
                Access Resources
              </button>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
