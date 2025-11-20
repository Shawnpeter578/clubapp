import React, { useState, useEffect } from 'react';
import { Shield, BookOpen, MessageSquare, Users, Eye, Zap, Lock, Feather } from 'lucide-react';

// Mock data for the mysterious theme
const mockMembers = [
  { id: 1, name: 'Cipher-001', rank: 'Archivist', status: 'Active', sign: 'Moon', initial: 'C' },
  { id: 2, name: 'Echo-77', rank: 'Acolyte', status: 'Dormant', sign: 'Shadow', initial: 'E' },
  { id: 3, name: 'Void-K', rank: 'Sentinel', status: 'Active', sign: 'Key', initial: 'V' },
  { id: 4, name: 'Solis-9', rank: 'Initiate', status: 'Pending', sign: 'Star', initial: 'S' },
  { id: 5, name: 'Rune-Delta', rank: 'Archivist', status: 'Active', sign: 'Scroll', initial: 'R' },
];

const mockEvents = [
  { id: 101, title: 'The Confluence of Shadows', time: '13th Cycle, 03:00 UT', location: 'Hidden Grove Sector Beta', icon: Eye },
  { id: 102, title: 'Deciphering the Forgotten Chant', time: '21st Cycle, 22:00 UT', location: 'The Subterranean Library', icon: BookOpen },
  { id: 103, title: 'The Sentinel’s Summit', time: '5th Cycle, 00:00 UT', location: 'Coordinates Unstable', icon: Shield },
];

const mockCiphers = [
    { id: 201, sender: 'Archivist', content: 'The owl calls at midnight.', status: 'New', time: '2h ago' },
    { id: 202, sender: 'Sentinel', content: 'Seven keys for the seven seals.', status: 'Read', time: '1d ago' },
    { id: 203, sender: 'Acolyte', content: 'What lurks beneath the obsidian pact?', status: 'Unread', time: '5m ago' },
];

// Utility component for a card with glow effect
const MysteriousCard = ({ children, className = '' }) => (
  <div className={`p-4 bg-gray-800/50 backdrop-blur-sm border border-teal-700/50 rounded-lg shadow-2xl transition-all duration-300 hover:shadow-[0_0_15px_rgba(0,255,255,0.4)] ${className}`}>
    {children}
  </div>
);

// --- View Components ---

const DashboardView = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
    <MysteriousCard className="col-span-1 md:col-span-2 lg:col-span-3">
      <h2 className="text-xl font-bold text-teal-400 mb-2 flex items-center">
        <Shield className="w-5 h-5 mr-2 text-purple-400" />
        The Oath of Silence
      </h2>
      <p className="text-gray-400 text-sm">
        Welcome, operative. Your current status is **Active**. The veil holds, but internal security breaches are possible.
        Maintain protocol and refer to the cipher repository for your next directive.
      </p>
      <div className="mt-4 flex flex-wrap gap-4 text-xs font-mono">
        <span className="px-3 py-1 bg-purple-900/60 rounded-full text-purple-300">STATUS: C-404</span>
        <span className="px-3 py-1 bg-teal-900/60 rounded-full text-teal-300">LAST SYNC: 2025-11-20 23:19 UT</span>
      </div>
    </MysteriousCard>

    <MysteriousCard>
      <h3 className="text-lg font-semibold text-teal-300 mb-2 flex items-center">
        <Zap className="w-4 h-4 mr-2" />
        Recent Activity
      </h3>
      <ul className="space-y-2 text-sm">
        <li className="text-gray-400 border-l-2 border-purple-500 pl-2">Cipher-001 updated **The Shadow Protocol**.</li>
        <li className="text-gray-400 border-l-2 border-teal-500 pl-2">New Event: **The Confluence of Shadows**.</li>
        <li className="text-gray-400 border-l-2 border-yellow-500 pl-2">Access key **R-144** rotated.</li>
      </ul>
    </MysteriousCard>

    <MysteriousCard>
      <h3 className="text-lg font-semibold text-teal-300 mb-2 flex items-center">
        <Lock className="w-4 h-4 mr-2" />
        Security Log
      </h3>
      <p className="text-gray-400 text-sm">
        External intrusion attempt detected and neutralized. IP address logged. All systems are nominally secure.
        <a href="#" className="text-purple-400 hover:text-purple-300 ml-2 block mt-2">View Full Audit Log</a>
      </p>
    </MysteriousCard>

    <MysteriousCard className="md:col-span-2">
      <h3 className="text-lg font-semibold text-teal-300 mb-2 flex items-center">
        <Feather className="w-4 h-4 mr-2" />
        The Daily Enigma
      </h3>
      <blockquote className="border-l-4 border-purple-500 pl-4 italic text-gray-300 text-base">
        "The truth is a lattice of lies woven by time. To see the whole, you must accept the pieces are broken."
      </blockquote>
      <p className="text-right text-xs text-gray-500 mt-2">-- The Oracle, Fragment 7</p>
    </MysteriousCard>
  </div>
);

const EventsView = () => (
  <div className="p-4">
    <h1 className="text-2xl font-bold text-teal-400 mb-6 border-b border-teal-700/50 pb-2">
      Scheduled Confluences
    </h1>
    <div className="space-y-6">
      {mockEvents.map(event => (
        <MysteriousCard key={event.id} className="relative overflow-hidden">
          <div className="absolute top-0 right-0 h-full w-1 bg-purple-500/50 animate-pulse"></div>
          <div className="flex items-start">
            <event.icon className="w-8 h-8 mr-4 text-purple-400 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-xl font-semibold text-teal-300 hover:text-white transition-colors">{event.title}</h3>
              <p className="text-sm text-gray-400 mt-1">
                <span className="font-mono text-purple-300 block">{event.time}</span>
                <span className="text-xs text-gray-500 block mt-1">Location: {event.location}</span>
              </p>
            </div>
          </div>
          <button className="mt-3 text-xs px-3 py-1 bg-teal-800 hover:bg-teal-700 text-white rounded-full transition-shadow shadow-md hover:shadow-[0_0_8px_rgba(0,255,255,0.7)]">
            Acknowledge Receipt
          </button>
        </MysteriousCard>
      ))}
    </div>
  </div>
);

const MembersView = () => (
  <div className="p-4">
    <h1 className="text-2xl font-bold text-teal-400 mb-6 border-b border-teal-700/50 pb-2 flex items-center">
      <Users className="w-6 h-6 mr-2" />
      The Roster (Access Level 3)
    </h1>
    <MysteriousCard className="overflow-x-auto">
      <table className="min-w-full divide-y divide-teal-700/50">
        <thead>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              ID
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name/Codename
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">
              Rank
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">
              Sign
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-teal-900/50">
          {mockMembers.map(member => (
            <tr key={member.id} className="hover:bg-gray-700/50 transition-colors">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-purple-400">
                {member.id}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-teal-300">
                <div className="flex items-center">
                  <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-purple-800 text-purple-300 text-sm mr-3 font-semibold">
                    {member.initial}
                  </span>
                  {member.name}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400 hidden sm:table-cell">
                {member.rank}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden lg:table-cell">
                {member.sign}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                  member.status === 'Active' ? 'bg-green-800/50 text-green-300' :
                  member.status === 'Dormant' ? 'bg-yellow-800/50 text-yellow-300' :
                  'bg-red-800/50 text-red-300'
                }`}>
                  {member.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </MysteriousCard>
  </div>
);

const CiphersView = () => (
  <div className="p-4">
    <h1 className="text-2xl font-bold text-teal-400 mb-6 border-b border-teal-700/50 pb-2 flex items-center">
      <MessageSquare className="w-6 h-6 mr-2" />
      Secure Cipher Repository
    </h1>
    <div className="space-y-4">
      {mockCiphers.map(cipher => (
        <MysteriousCard key={cipher.id} className="relative flex justify-between items-center cursor-pointer">
          <div className="flex-1 min-w-0">
            <p className={`text-sm font-mono ${cipher.status === 'Unread' ? 'text-purple-300 font-bold' : 'text-teal-300'}`}>
              <span className="font-semibold text-gray-500 mr-2">{cipher.sender}:</span>
              {cipher.content}
            </p>
            <p className="text-xs text-gray-500 mt-1">Received {cipher.time}</p>
          </div>
          {cipher.status === 'Unread' && (
            <div className="w-2 h-2 rounded-full bg-red-500 ml-4 animate-ping absolute top-2 right-2 sm:static sm:ml-4"></div>
          )}
          <button className="hidden sm:block text-xs px-3 py-1 bg-purple-800 hover:bg-purple-700 text-white rounded-full transition-shadow shadow-md hover:shadow-[0_0_8px_rgba(255,0,255,0.7)] ml-4">
            Decrypt
          </button>
        </MysteriousCard>
      ))}
      <MysteriousCard className="text-center p-6 border-dashed border-teal-900/50">
        <p className="text-gray-500 italic">-- End of Transmission Log --</p>
      </MysteriousCard>
    </div>
  </div>
);

// --- Main App Component ---

const NavItem = ({ icon: Icon, label, currentView, setView }) => {
  const isActive = currentView === label;
  return (
    <button
      onClick={() => setView(label)}
      className={`flex items-center justify-center md:justify-start space-x-2 p-3 rounded-xl transition-all duration-200 group w-full ${
        isActive
          ? 'bg-purple-800/70 text-teal-300 shadow-[0_0_10px_rgba(255,0,255,0.5)]'
          : 'text-gray-400 hover:bg-gray-800/70 hover:text-teal-300'
      }`}
    >
      <Icon className="w-6 h-6 flex-shrink-0" />
      <span className="hidden md:inline font-semibold">{label}</span>
    </button>
  );
};

const navItems = [
  { icon: Shield, label: 'Dashboard' },
  { icon: BookOpen, label: 'Events' },
  { icon: MessageSquare, label: 'Ciphers' },
  { icon: Users, label: 'Roster' },
];

export default function App() {
  const [currentView, setCurrentView] = useState('Dashboard');

  const renderView = () => {
    switch (currentView) {
      case 'Dashboard':
        return <DashboardView />;
      case 'Events':
        return <EventsView />;
      case 'Ciphers':
        return <CiphersView />;
      case 'Roster':
        return <MembersView />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans antialiased">
      {/* Tailwind CSS Script - For Canvas Environment */}
      <script src="https://cdn.tailwindcss.com"></script>

      {/* Global Styles for Mysterious Theme */}
      <style>{`
        body {
          font-family: 'Inter', sans-serif;
        }
        .header-glow {
          text-shadow: 0 0 5px rgba(0, 255, 255, 0.5), 0 0 10px rgba(138, 43, 226, 0.3);
        }
      `}</style>

      <div className="flex flex-col md:flex-row h-screen overflow-hidden">
        {/* Sidebar/Mobile Nav */}
        <nav className="bg-gray-900 border-b md:border-r border-teal-700/30 p-2 md:p-4 flex flex-row md:flex-col justify-around md:justify-start md:space-y-4 w-full md:w-56 flex-shrink-0">
          <div className="hidden md:block mb-8 text-center">
            <h1 className="text-xl font-extrabold text-teal-400 header-glow">
              <Zap className="inline-block w-5 h-5 mr-1" />
              OBSIDIAN
            </h1>
            <p className="text-xs text-purple-400">ARCHIVE SYSTEM</p>
          </div>
          {navItems.map(item => (
            <NavItem
              key={item.label}
              icon={item.icon}
              label={item.label}
              currentView={currentView}
              setView={setCurrentView}
            />
          ))}
        </nav>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto bg-gray-900 p-2 md:p-6 custom-scrollbar">
          <div className="max-w-7xl mx-auto">
            {renderView()}
          </div>
        </main>
      </div>
    </div>
  );
}