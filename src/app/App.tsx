import { useState, useEffect } from 'react';
import { Settings } from 'lucide-react';
import { Header } from '@/app/components/Header';
import { HeroSection } from '@/app/components/HeroSection';
import { AboutModal } from '@/app/components/AboutModal';
import { ContactNotices } from '@/app/components/ContactNotices';
import { ContactProfileModal } from '@/app/components/ContactProfileModal';
import { AllNoticesPage } from '@/app/components/AllNoticesPage';
import { ResourcesSection } from '@/app/components/ResourcesSection';
import { Footer } from '@/app/components/Footer';
import { AdminDashboard } from '@/app/components/AdminDashboard';
import { AdminLoginModal } from '@/app/components/AdminLoginModal';
import { api } from '@/utils/api';

export default function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [aboutModalOpen, setAboutModalOpen] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);
  const [adminLoginOpen, setAdminLoginOpen] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [selectedContact, setSelectedContact] = useState<any>(null);
  const [allNoticesOpen, setAllNoticesOpen] = useState(false);
  const [logoUrl, setLogoUrl] = useState('');

  // Data states
  const [landingData, setLandingData] = useState({
    welcomeText: 'Welcome to Edu Refiners',
    subtext1: 'We try to aid juniors academically by providing direct contact and resources',
    subtext2: 'Having trouble with your studies? Feel free to join and contact our socials for 1:1 guidance'
  });
  const [contacts, setContacts] = useState<any[]>([]);
  const [contactInstructions, setContactInstructions] = useState('');
  const [notices, setNotices] = useState<any[]>([]);
  const [resources, setResources] = useState<any[]>([]);
  const [footerData, setFooterData] = useState<any>({});
  const [aboutData, setAboutData] = useState<any>({});

  useEffect(() => {
    initializeData();
  }, []);

  const initializeData = async () => {
    try {
      // Initialize default data first
      await api.init();
      
      // Load all data
      loadAllData();
    } catch (error) {
      console.error('Error initializing:', error);
      // Still try to load data even if init fails (might already be initialized)
      loadAllData();
    }
  };

  const loadAllData = async () => {
    try {
      const [landing, logo, contactsList, instructions, noticesList, resourcesList, footer, about] = await Promise.all([
        api.getLanding().catch(() => ({
          welcomeText: 'Welcome to Edu Refiners',
          subtext1: 'We try to aid juniors academically by providing direct contact and resources',
          subtext2: 'Having trouble with your studies? Feel free to join and contact our socials for 1:1 guidance'
        })),
        api.getLogo().catch(() => ({ logoUrl: '' })),
        api.getContacts().catch(() => []),
        api.getContactInstructions().catch(() => ({ instructions: '' })),
        api.getNotices().catch(() => []),
        api.getResources().catch(() => []),
        api.getFooter().catch(() => ({})),
        api.getAbout().catch(() => ({}))
      ]);

      setLandingData(landing);
      setLogoUrl(logo.logoUrl || '');
      setContacts(contactsList);
      setContactInstructions(instructions.instructions || '');
      setNotices(noticesList);
      setResources(resourcesList);
      setFooterData(footer);
      setAboutData(about);
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const handleAdminLogin = () => {
    setIsAdminLoggedIn(true);
    setAdminOpen(true);
  };

  const handleAdminLogout = () => {
    setIsAdminLoggedIn(false);
    setAdminOpen(false);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 relative ${
      theme === 'dark' ? 'bg-black text-white' : 'bg-white text-gray-900'
    }`}>
      {/* Global Dot Grid Background */}
      <div 
        className="fixed inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, ${theme === 'dark' ? '#8b5cf6' : '#a855f7'} 1px, transparent 1px)`,
          backgroundSize: '30px 30px'
        }}
      />
      
      <div className="relative z-10">
        <Header 
          theme={theme} 
          toggleTheme={toggleTheme} 
          logoUrl={logoUrl}
          onAboutClick={() => setAboutModalOpen(true)}
        />
        
        <main>
          <HeroSection 
            theme={theme} 
            onLearnMore={() => setAboutModalOpen(true)} 
            landingData={landingData}
          />
          <ContactNotices 
            theme={theme} 
            contacts={contacts}
            notices={notices}
            instructions={contactInstructions}
            onViewAllNotices={() => setAllNoticesOpen(true)}
            onViewContact={(contact) => setSelectedContact(contact)}
          />
          <ResourcesSection theme={theme} resources={resources} />
        </main>

        <Footer theme={theme} footerData={footerData} onAdminClick={() => setAdminLoginOpen(true)} />

        <AboutModal 
          isOpen={aboutModalOpen} 
          onClose={() => setAboutModalOpen(false)} 
          theme={theme}
          aboutData={aboutData}
        />

        <ContactProfileModal
          isOpen={!!selectedContact}
          onClose={() => setSelectedContact(null)}
          contact={selectedContact}
          theme={theme}
        />

        <AllNoticesPage
          isOpen={allNoticesOpen}
          onClose={() => setAllNoticesOpen(false)}
          notices={notices}
          theme={theme}
        />

        <AdminLoginModal
          isOpen={adminLoginOpen}
          onClose={() => setAdminLoginOpen(false)}
          onLogin={handleAdminLogin}
          theme={theme}
        />

        {isAdminLoggedIn && (
          <AdminDashboard
            isOpen={adminOpen}
            onClose={() => setAdminOpen(false)}
            theme={theme}
            onDataUpdate={loadAllData}
          />
        )}
      </div>
    </div>
  );
}