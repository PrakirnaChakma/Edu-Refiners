import { useState, useEffect } from 'react';
import { X, Save, Plus, Trash2, Edit } from 'lucide-react';
import { motion } from 'motion/react';
import { api } from '@/utils/api';

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  theme: 'light' | 'dark';
  onDataUpdate: () => void;
}

export function AdminDashboard({ isOpen, onClose, theme, onDataUpdate }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState('landing');
  const [saving, setSaving] = useState(false);

  // State for different sections
  const [landingData, setLandingData] = useState({
    welcomeText: '',
    subtext1: '',
    subtext2: ''
  });

  const [contacts, setContacts] = useState<any[]>([]);
  const [contactInstructions, setContactInstructions] = useState('');
  const [notices, setNotices] = useState<any[]>([]);
  const [resources, setResources] = useState<any[]>([]);
  const [footerData, setFooterData] = useState<any>({});
  const [aboutData, setAboutData] = useState<any>({});
  const [logoUrl, setLogoUrl] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const loadAllData = async () => {
    try {
      const [landing, logo, contactsList, instructions, noticesList, resourcesList, footer, about] = await Promise.all([
        api.getLanding().catch(() => ({
          welcomeText: 'Welcome to Refiners Team',
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

  // Load data when opening
  useEffect(() => {
    if (isOpen) {
      loadAllData();
    }
  }, [isOpen]);

  const saveLanding = async () => {
    setSaving(true);
    try {
      await api.updateLanding(landingData);
      onDataUpdate();
      alert('Landing page updated successfully!');
    } catch (error) {
      alert('Error updating landing page');
    }
    setSaving(false);
  };

  const saveContacts = async () => {
    setSaving(true);
    try {
      await api.updateContacts(contacts);
      await api.updateContactInstructions(contactInstructions);
      onDataUpdate();
      alert('Contacts updated successfully!');
    } catch (error) {
      alert('Error updating contacts');
    }
    setSaving(false);
  };

  const saveNotices = async () => {
    setSaving(true);
    try {
      await api.updateNotices(notices);
      onDataUpdate();
      alert('Notices updated successfully!');
    } catch (error) {
      alert('Error updating notices');
    }
    setSaving(false);
  };

  const saveResources = async () => {
    setSaving(true);
    try {
      await api.updateResources(resources);
      onDataUpdate();
      alert('Resources updated successfully!');
    } catch (error) {
      alert('Error updating resources');
    }
    setSaving(false);
  };

  const saveFooter = async () => {
    setSaving(true);
    try {
      await api.updateFooter(footerData);
      onDataUpdate();
      alert('Footer updated successfully!');
    } catch (error) {
      alert('Error updating footer');
    }
    setSaving(false);
  };

  const saveAbout = async () => {
    setSaving(true);
    try {
      await api.updateAbout(aboutData);
      onDataUpdate();
      alert('About section updated successfully!');
    } catch (error) {
      alert('Error updating about section');
    }
    setSaving(false);
  };

  if (!isOpen) return null;

  const tabs = [
    { id: 'landing', label: 'Landing Page' },
    { id: 'logo', label: 'Logo & Settings' },
    { id: 'contacts', label: 'Contacts' },
    { id: 'notices', label: 'Notices' },
    { id: 'resources', label: 'Resources' },
    { id: 'footer', label: 'Footer' },
    { id: 'about', label: 'About Modal' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm" onClick={onClose}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`max-w-6xl w-full h-[90vh] rounded-2xl shadow-2xl flex flex-col ${
          theme === 'dark' ? 'bg-gray-900' : 'bg-white'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className={`flex items-center justify-between p-6 border-b ${
          theme === 'dark' ? 'border-purple-900/50' : 'border-purple-200/50'
        }`}>
          <h2 className={`text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent`}>
            Admin Dashboard
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

        {/* Tabs */}
        <div className={`flex gap-2 p-4 border-b overflow-x-auto ${
          theme === 'dark' ? 'border-gray-800' : 'border-gray-200'
        }`}>
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? theme === 'dark'
                    ? 'bg-purple-700 text-white'
                    : 'bg-purple-600 text-white'
                  : theme === 'dark'
                    ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === 'landing' && (
            <div className="space-y-4">
              <div>
                <label className={`block mb-2 font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Welcome Text
                </label>
                <input
                  type="text"
                  value={landingData.welcomeText}
                  onChange={(e) => setLandingData({ ...landingData, welcomeText: e.target.value })}
                  className={`w-full px-4 py-2 rounded-lg ${
                    theme === 'dark' ? 'bg-gray-800 text-white border-gray-700' : 'bg-white text-gray-900 border-gray-300'
                  } border`}
                />
              </div>
              <div>
                <label className={`block mb-2 font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Subtext 1
                </label>
                <textarea
                  value={landingData.subtext1}
                  onChange={(e) => setLandingData({ ...landingData, subtext1: e.target.value })}
                  rows={3}
                  className={`w-full px-4 py-2 rounded-lg ${
                    theme === 'dark' ? 'bg-gray-800 text-white border-gray-700' : 'bg-white text-gray-900 border-gray-300'
                  } border`}
                />
              </div>
              <div>
                <label className={`block mb-2 font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Subtext 2
                </label>
                <textarea
                  value={landingData.subtext2}
                  onChange={(e) => setLandingData({ ...landingData, subtext2: e.target.value })}
                  rows={3}
                  className={`w-full px-4 py-2 rounded-lg ${
                    theme === 'dark' ? 'bg-gray-800 text-white border-gray-700' : 'bg-white text-gray-900 border-gray-300'
                  } border`}
                />
              </div>
              <button
                onClick={saveLanding}
                disabled={saving}
                className="flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors"
              >
                <Save className="w-5 h-5" />
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          )}

          {activeTab === 'logo' && (
            <div className="space-y-6">
              <div>
                <label className={`block mb-2 font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Logo URL
                </label>
                <input
                  type="text"
                  value={logoUrl}
                  onChange={(e) => setLogoUrl(e.target.value)}
                  placeholder="https://your-cloudinary-url.com/logo.png"
                  className={`w-full px-4 py-2 rounded-lg ${
                    theme === 'dark' ? 'bg-gray-800 text-white border-gray-700' : 'bg-white text-gray-900 border-gray-300'
                  } border`}
                />
                <p className={`mt-2 text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  Upload your logo to Cloudinary and paste the URL here
                </p>
              </div>

              <div className={`p-4 rounded-lg border ${
                theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'
              }`}>
                <h3 className={`text-lg font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Change Admin Password
                </h3>
                <div className="space-y-3">
                  <div>
                    <label className={`block mb-2 font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      Current Password
                    </label>
                    <input
                      type="password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      className={`w-full px-4 py-2 rounded-lg ${
                        theme === 'dark' ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-900 border-gray-300'
                      } border`}
                    />
                  </div>
                  <div>
                    <label className={`block mb-2 font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      New Password
                    </label>
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className={`w-full px-4 py-2 rounded-lg ${
                        theme === 'dark' ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-900 border-gray-300'
                      } border`}
                    />
                  </div>
                  <button
                    onClick={async () => {
                      if (!currentPassword || !newPassword) {
                        alert('Please fill in both fields');
                        return;
                      }
                      try {
                        setSaving(true);
                        await api.changePassword(currentPassword, newPassword);
                        alert('Password changed successfully!');
                        setCurrentPassword('');
                        setNewPassword('');
                      } catch (error) {
                        alert('Error changing password. Check your current password.');
                      } finally {
                        setSaving(false);
                      }
                    }}
                    disabled={saving}
                    className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors"
                  >
                    <Save className="w-4 h-4" />
                    {saving ? 'Saving...' : 'Change Password'}
                  </button>
                </div>
              </div>

              <button
                onClick={async () => {
                  try {
                    setSaving(true);
                    await api.updateLogo(logoUrl);
                    onDataUpdate();
                    alert('Logo updated successfully!');
                  } catch (error) {
                    alert('Error updating logo');
                  } finally {
                    setSaving(false);
                  }
                }}
                disabled={saving}
                className="flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors"
              >
                <Save className="w-5 h-5" />
                {saving ? 'Saving...' : 'Save Logo'}
              </button>
            </div>
          )}

          {activeTab === 'contacts' && (
            <div className="space-y-6">
              <div>
                <label className={`block mb-2 font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Instructions Text
                </label>
                <textarea
                  value={contactInstructions}
                  onChange={(e) => setContactInstructions(e.target.value)}
                  rows={3}
                  className={`w-full px-4 py-2 rounded-lg ${
                    theme === 'dark' ? 'bg-gray-800 text-white border-gray-700' : 'bg-white text-gray-900 border-gray-300'
                  } border`}
                />
              </div>

              <div className="flex items-center justify-between">
                <h3 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Contact Profiles
                </h3>
                <button
                  onClick={() => {
                    const newContact = {
                      id: Date.now().toString(),
                      photo: '',
                      name: 'New Contact',
                      education: '',
                      subjects: '',
                      bio: '',
                      socials: [],
                      mostAvailableOn: '',
                      bestAt: ''
                    };
                    setContacts([...contacts, newContact]);
                  }}
                  className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Add Contact
                </button>
              </div>

              {contacts.map((contact, index) => (
                <div
                  key={contact.id}
                  className={`p-4 rounded-lg border ${
                    theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h4 className={`font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      Contact #{index + 1}
                    </h4>
                    <button
                      onClick={() => setContacts(contacts.filter(c => c.id !== contact.id))}
                      className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="Name"
                      value={contact.name}
                      onChange={(e) => {
                        const updated = [...contacts];
                        updated[index].name = e.target.value;
                        setContacts(updated);
                      }}
                      className={`px-3 py-2 rounded ${
                        theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'
                      } border ${theme === 'dark' ? 'border-gray-600' : 'border-gray-300'}`}
                    />
                    <input
                      type="text"
                      placeholder="Education"
                      value={contact.education}
                      onChange={(e) => {
                        const updated = [...contacts];
                        updated[index].education = e.target.value;
                        setContacts(updated);
                      }}
                      className={`px-3 py-2 rounded ${
                        theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'
                      } border ${theme === 'dark' ? 'border-gray-600' : 'border-gray-300'}`}
                    />
                    <input
                      type="text"
                      placeholder="Subjects"
                      value={contact.subjects}
                      onChange={(e) => {
                        const updated = [...contacts];
                        updated[index].subjects = e.target.value;
                        setContacts(updated);
                      }}
                      className={`px-3 py-2 rounded ${
                        theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'
                      } border ${theme === 'dark' ? 'border-gray-600' : 'border-gray-300'}`}
                    />
                    <input
                      type="text"
                      placeholder="Best At"
                      value={contact.bestAt}
                      onChange={(e) => {
                        const updated = [...contacts];
                        updated[index].bestAt = e.target.value;
                        setContacts(updated);
                      }}
                      className={`px-3 py-2 rounded ${
                        theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'
                      } border ${theme === 'dark' ? 'border-gray-600' : 'border-gray-300'}`}
                    />
                  </div>
                  <textarea
                    placeholder="Bio/Quote"
                    value={contact.bio}
                    onChange={(e) => {
                      const updated = [...contacts];
                      updated[index].bio = e.target.value;
                      setContacts(updated);
                    }}
                    rows={2}
                    className={`w-full mt-3 px-3 py-2 rounded ${
                      theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'
                    } border ${theme === 'dark' ? 'border-gray-600' : 'border-gray-300'}`}
                  />
                </div>
              ))}

              <button
                onClick={saveContacts}
                disabled={saving}
                className="flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors"
              >
                <Save className="w-5 h-5" />
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          )}

          {activeTab === 'notices' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Notices
                </h3>
                <button
                  onClick={() => {
                    const newNotice = {
                      id: Date.now().toString(),
                      date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
                      title: 'New Notice',
                      preview: '',
                      fullContent: '',
                      images: []
                    };
                    setNotices([newNotice, ...notices]);
                  }}
                  className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Add Notice
                </button>
              </div>

              {notices.map((notice, index) => (
                <div
                  key={notice.id}
                  className={`p-4 rounded-lg border ${
                    theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h4 className={`font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      Notice #{index + 1}
                    </h4>
                    <button
                      onClick={() => setNotices(notices.filter(n => n.id !== notice.id))}
                      className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="space-y-3">
                    <input
                      type="text"
                      placeholder="Title"
                      value={notice.title}
                      onChange={(e) => {
                        const updated = [...notices];
                        updated[index].title = e.target.value;
                        setNotices(updated);
                      }}
                      className={`w-full px-3 py-2 rounded ${
                        theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'
                      } border ${theme === 'dark' ? 'border-gray-600' : 'border-gray-300'}`}
                    />
                    <input
                      type="text"
                      placeholder="Date"
                      value={notice.date}
                      onChange={(e) => {
                        const updated = [...notices];
                        updated[index].date = e.target.value;
                        setNotices(updated);
                      }}
                      className={`w-full px-3 py-2 rounded ${
                        theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'
                      } border ${theme === 'dark' ? 'border-gray-600' : 'border-gray-300'}`}
                    />
                    <textarea
                      placeholder="Preview Text"
                      value={notice.preview}
                      onChange={(e) => {
                        const updated = [...notices];
                        updated[index].preview = e.target.value;
                        setNotices(updated);
                      }}
                      rows={2}
                      className={`w-full px-3 py-2 rounded ${
                        theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'
                      } border ${theme === 'dark' ? 'border-gray-600' : 'border-gray-300'}`}
                    />
                    <textarea
                      placeholder="Full Content"
                      value={notice.fullContent}
                      onChange={(e) => {
                        const updated = [...notices];
                        updated[index].fullContent = e.target.value;
                        setNotices(updated);
                      }}
                      rows={4}
                      className={`w-full px-3 py-2 rounded ${
                        theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'
                      } border ${theme === 'dark' ? 'border-gray-600' : 'border-gray-300'}`}
                    />
                  </div>
                </div>
              ))}

              <button
                onClick={saveNotices}
                disabled={saving}
                className="flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors"
              >
                <Save className="w-5 h-5" />
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          )}

          {activeTab === 'resources' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Resources
                </h3>
                <button
                  onClick={() => {
                    const newResource = {
                      id: Date.now().toString(),
                      icon: 'BookOpen',
                      title: 'New Resource',
                      description: '',
                      items: []
                    };
                    setResources([...resources, newResource]);
                  }}
                  className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Add Resource
                </button>
              </div>

              {resources.map((resource, index) => (
                <div
                  key={resource.id}
                  className={`p-4 rounded-lg border ${
                    theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h4 className={`font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      Resource #{index + 1}
                    </h4>
                    <button
                      onClick={() => setResources(resources.filter(r => r.id !== resource.id))}
                      className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="space-y-3">
                    <input
                      type="text"
                      placeholder="Title"
                      value={resource.title}
                      onChange={(e) => {
                        const updated = [...resources];
                        updated[index].title = e.target.value;
                        setResources(updated);
                      }}
                      className={`w-full px-3 py-2 rounded ${
                        theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'
                      } border ${theme === 'dark' ? 'border-gray-600' : 'border-gray-300'}`}
                    />
                    <select
                      value={resource.icon}
                      onChange={(e) => {
                        const updated = [...resources];
                        updated[index].icon = e.target.value;
                        setResources(updated);
                      }}
                      className={`w-full px-3 py-2 rounded ${
                        theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'
                      } border ${theme === 'dark' ? 'border-gray-600' : 'border-gray-300'}`}
                    >
                      <option value="BookOpen">BookOpen</option>
                      <option value="Calculator">Calculator</option>
                      <option value="Atom">Atom</option>
                      <option value="Code">Code</option>
                      <option value="Globe">Globe</option>
                      <option value="FileText">FileText</option>
                    </select>
                    <textarea
                      placeholder="Description"
                      value={resource.description}
                      onChange={(e) => {
                        const updated = [...resources];
                        updated[index].description = e.target.value;
                        setResources(updated);
                      }}
                      rows={2}
                      className={`w-full px-3 py-2 rounded ${
                        theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'
                      } border ${theme === 'dark' ? 'border-gray-600' : 'border-gray-300'}`}
                    />
                    <textarea
                      placeholder="Items (one per line)"
                      value={resource.items.join('\n')}
                      onChange={(e) => {
                        const updated = [...resources];
                        updated[index].items = e.target.value.split('\n').filter(item => item.trim());
                        setResources(updated);
                      }}
                      rows={4}
                      className={`w-full px-3 py-2 rounded ${
                        theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'
                      } border ${theme === 'dark' ? 'border-gray-600' : 'border-gray-300'}`}
                    />
                  </div>
                </div>
              ))}

              <button
                onClick={saveResources}
                disabled={saving}
                className="flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors"
              >
                <Save className="w-5 h-5" />
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          )}

          {activeTab === 'footer' && (
            <div className="space-y-4">
              <div>
                <label className={`block mb-2 font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  About Text
                </label>
                <textarea
                  value={footerData.about || ''}
                  onChange={(e) => setFooterData({ ...footerData, about: e.target.value })}
                  rows={3}
                  className={`w-full px-4 py-2 rounded-lg ${
                    theme === 'dark' ? 'bg-gray-800 text-white border-gray-700' : 'bg-white text-gray-900 border-gray-300'
                  } border`}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={`block mb-2 font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    Email
                  </label>
                  <input
                    type="email"
                    value={footerData.email || ''}
                    onChange={(e) => setFooterData({ ...footerData, email: e.target.value })}
                    className={`w-full px-4 py-2 rounded-lg ${
                      theme === 'dark' ? 'bg-gray-800 text-white border-gray-700' : 'bg-white text-gray-900 border-gray-300'
                    } border`}
                  />
                </div>
                <div>
                  <label className={`block mb-2 font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={footerData.phone || ''}
                    onChange={(e) => setFooterData({ ...footerData, phone: e.target.value })}
                    className={`w-full px-4 py-2 rounded-lg ${
                      theme === 'dark' ? 'bg-gray-800 text-white border-gray-700' : 'bg-white text-gray-900 border-gray-300'
                    } border`}
                  />
                </div>
              </div>
              <button
                onClick={saveFooter}
                disabled={saving}
                className="flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors"
              >
                <Save className="w-5 h-5" />
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          )}

          {activeTab === 'about' && (
            <div className="space-y-4">
              <div>
                <label className={`block mb-2 font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Our Story
                </label>
                <textarea
                  value={aboutData.story || ''}
                  onChange={(e) => setAboutData({ ...aboutData, story: e.target.value })}
                  rows={4}
                  className={`w-full px-4 py-2 rounded-lg ${
                    theme === 'dark' ? 'bg-gray-800 text-white border-gray-700' : 'bg-white text-gray-900 border-gray-300'
                  } border`}
                />
              </div>
              <div>
                <label className={`block mb-2 font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Goals (one per line)
                </label>
                <textarea
                  value={aboutData.goals?.join('\n') || ''}
                  onChange={(e) => setAboutData({ ...aboutData, goals: e.target.value.split('\n').filter((g: string) => g.trim()) })}
                  rows={6}
                  className={`w-full px-4 py-2 rounded-lg ${
                    theme === 'dark' ? 'bg-gray-800 text-white border-gray-700' : 'bg-white text-gray-900 border-gray-300'
                  } border`}
                />
              </div>
              <button
                onClick={saveAbout}
                disabled={saving}
                className="flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors"
              >
                <Save className="w-5 h-5" />
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}