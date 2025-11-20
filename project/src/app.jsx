import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  Users, 
  Home, 
  MessageSquare, 
  Bell, 
  Search, 
  MapPin, 
  Clock, 
  ChevronRight,
  Plus,
  Heart,
  Share2,
  MoreHorizontal,
  Settings,
  LogOut,
  Trophy
} from 'lucide-react';

// --- Mock Data ---

const EVENTS = [
  {
    id: 1,
    title: "Annual Tech Summit",
    date: "Oct 24, 2023",
    time: "10:00 AM",
    location: "Innovation Hall A",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=2000",
    attendees: 142,
    category: "Tech"
  },
  {
    id: 2,
    title: "Sunday Morning Hike",
    date: "Oct 29, 2023",
    time: "06:30 AM",
    location: "Blue Ridge Trail",
    image: "https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&q=80&w=2000",
    attendees: 28,
    category: "Outdoor"
  },
  {
    id: 3,
    title: "Coffee & Code Mixer",
    date: "Nov 02, 2023",
    time: "05:00 PM",
    location: "Bean & Byte Cafe",
    image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&q=80&w=2000",
    attendees: 45,
    category: "Social"
  },
  {
    id: 4,
    title: "Design Workshop",
    date: "Nov 12, 2023",
    time: "02:00 PM",
    location: "Creative Studio",
    image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&q=80&w=2000",
    attendees: 32,
    category: "Tech"
  },
  {
    id: 5,
    title: "Sunset Yoga",
    date: "Nov 15, 2023",
    time: "05:30 PM",
    location: "City Park",
    image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&q=80&w=2000",
    attendees: 18,
    category: "Outdoor"
  }
];

const MEMBERS = [
  { id: 1, name: "Alex Rivera", role: "President", avatar: "https://i.pravatar.cc/150?u=a" },
  { id: 2, name: "Sarah Chen", role: "Event Lead", avatar: "https://i.pravatar.cc/150?u=b" },
  { id: 3, name: "Jordan Smith", role: "Member", avatar: "https://i.pravatar.cc/150?u=c" },
  { id: 4, name: "Mike Johnson", role: "Member", avatar: "https://i.pravatar.cc/150?u=d" },
  { id: 5, name: "Emily Davis", role: "Secretary", avatar: "https://i.pravatar.cc/150?u=e" },
  { id: 6, name: "Chris Lee", role: "VP Marketing", avatar: "https://i.pravatar.cc/150?u=f" },
  { id: 7, name: "Patricia Wu", role: "Member", avatar: "https://i.pravatar.cc/150?u=g" },
];

const NOTIFICATIONS = [
  { id: 1, text: "New event added: Holiday Party", time: "2h ago", type: "event" },
  { id: 2, text: "Sarah commented on your post", time: "5h ago", type: "social" },
  { id: 3, text: "Membership renewal due soon", time: "1d ago", type: "alert" },
  { id: 4, text: "Upcoming: Tech Summit tomorrow", time: "1d ago", type: "event" },
];

// --- Components ---

const TopBar = ({ title, showProfile = true }) => (
  <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-gray-100 px-6 py-4 flex justify-between items-center shadow-sm transition-all duration-300">
    <h1 className="text-2xl font-bold text-gray-900 tracking-tight">{title}</h1>
    {showProfile && (
      <div className="flex items-center space-x-4">
        <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors relative hidden md:block">
           <Search size={20} />
        </button>
        <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors relative">
          <Bell size={20} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>
        <img 
          src="https://i.pravatar.cc/150?u=me" 
          alt="Profile" 
          className="w-9 h-9 rounded-full border-2 border-indigo-100 cursor-pointer hover:border-indigo-500 transition-colors"
        />
      </div>
    )}
  </div>
);

const SideNav = ({ activeTab, setActiveTab }) => (
  <div className="hidden md:flex flex-col items-center py-8 w-24 bg-white border-r border-gray-100 h-full fixed left-0 top-0 z-50 shadow-lg">
    <div className="mb-10 p-3 bg-indigo-600 rounded-2xl shadow-lg shadow-indigo-200">
      <Trophy className="text-white" size={24} />
    </div>
    <div className="flex flex-col gap-6 w-full px-4">
      {[
        { id: 'home', icon: Home, label: 'Home' },
        { id: 'events', icon: Calendar, label: 'Events' },
        { id: 'community', icon: Users, label: 'Club' },
        { id: 'profile', icon: Settings, label: 'Profile' },
      ].map((item) => (
        <button
          key={item.id}
          onClick={() => setActiveTab(item.id)}
          className={`flex flex-col items-center gap-1 p-3 rounded-xl transition-all duration-300 group relative w-full ${
            activeTab === item.id ? 'bg-indigo-50 text-indigo-600' : 'text-gray-400 hover:bg-gray-50 hover:text-gray-600'
          }`}
        >
          <item.icon size={24} strokeWidth={activeTab === item.id ? 2.5 : 2} />
          <span className="text-[10px] font-bold">{item.label}</span>
        </button>
      ))}
    </div>
    <button className="mt-auto mb-8 p-3 text-gray-400 hover:bg-red-50 hover:text-red-500 rounded-xl transition-colors">
      <LogOut size={24} />
    </button>
  </div>
);

const Dashboard = () => {
  return (
    <div className="pb-24 md:pb-10 space-y-6 animate-fade-in max-w-7xl mx-auto w-full">
      <TopBar title="Discover" />
      
      {/* Search Bar - Mobile Only */}
      <div className="px-6 md:hidden">
        <div className="relative group">
          <Search className="absolute left-3 top-3.5 text-gray-400 group-focus-within:text-indigo-500 transition-colors" size={20} />
          <input 
            type="text" 
            placeholder="Find events, members, topics..." 
            className="w-full bg-gray-50 hover:bg-gray-100 focus:bg-white border-2 border-transparent focus:border-indigo-500 rounded-2xl py-3 pl-10 pr-4 outline-none transition-all duration-300 shadow-sm font-medium text-gray-700 placeholder-gray-400"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 px-6">
        {/* Featured Card */}
        <div className="lg:col-span-2 relative h-64 md:h-80 rounded-3xl overflow-hidden shadow-xl group cursor-pointer">
          <img 
            src="https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&q=80&w=2000" 
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            alt="Featured" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
          <div className="absolute bottom-0 left-0 p-6 md:p-8 text-white max-w-lg">
            <span className="bg-indigo-500 text-xs font-bold px-3 py-1 rounded-full mb-3 inline-block uppercase tracking-wider">Featured</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-2 leading-tight">Fall Club Night</h2>
            <p className="text-gray-200 font-medium flex items-center gap-2 text-sm md:text-base">
              <MapPin size={16} /> Grand Ballroom • 8 PM
            </p>
          </div>
        </div>

        {/* Quick Actions & Recent - Desktop Side Column */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-4">Quick Actions</h3>
            <div className="grid grid-cols-4 gap-4">
              {[
                { icon: <Calendar size={24} />, label: "Schedule", color: "bg-blue-50 text-blue-600" },
                { icon: <Users size={24} />, label: "Team", color: "bg-purple-50 text-purple-600" },
                { icon: <Trophy size={24} />, label: "Awards", color: "bg-yellow-50 text-yellow-600" },
                { icon: <MessageSquare size={24} />, label: "Chat", color: "bg-pink-50 text-pink-600" }
              ].map((action, idx) => (
                <button key={idx} className="flex flex-col items-center gap-2 group">
                  <div className={`w-full aspect-square rounded-2xl flex items-center justify-center ${action.color} shadow-sm group-hover:scale-105 transition-transform duration-300`}>
                    {action.icon}
                  </div>
                  <span className="text-xs font-semibold text-gray-600 hidden md:block">{action.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-3xl p-2 shadow-sm border border-gray-100 h-full">
            <div className="flex justify-between items-center p-3 pb-1">
               <h3 className="text-md font-bold text-gray-800">Updates</h3>
               <button className="text-indigo-600 text-xs font-bold hover:underline">View All</button>
            </div>
            {NOTIFICATIONS.slice(0,3).map((notif, idx) => (
              <div key={notif.id} className={`flex items-center p-3 gap-3 hover:bg-gray-50 rounded-xl transition-colors cursor-pointer`}>
                <div className={`w-2 h-2 rounded-full flex-shrink-0 ${notif.type === 'event' ? 'bg-blue-500' : notif.type === 'alert' ? 'bg-red-500' : 'bg-green-500'}`}></div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800 truncate">{notif.text}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{notif.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* More Content for Desktop Fill */}
      <div className="px-6 hidden lg:block">
         <h3 className="text-lg font-bold text-gray-800 mb-4">Trending Discussions</h3>
         <div className="grid grid-cols-2 gap-4">
            {[1,2].map(i => (
               <div key={i} className="bg-white p-5 rounded-2xl border border-gray-100 hover:shadow-md transition-all cursor-pointer">
                  <div className="flex items-center gap-2 mb-2">
                     <span className="bg-indigo-100 text-indigo-700 text-xs font-bold px-2 py-1 rounded-md">General</span>
                     <span className="text-gray-400 text-xs">2h ago</span>
                  </div>
                  <h4 className="font-bold text-gray-900 mb-1">How do we prepare for the upcoming hackathon?</h4>
                  <p className="text-gray-500 text-sm">Looking for teammates and project ideas...</p>
               </div>
            ))}
         </div>
      </div>
    </div>
  );
};

const EventsPage = () => {
  const [filter, setFilter] = useState('All');
  const filters = ['All', 'Tech', 'Outdoor', 'Social'];

  return (
    <div className="pb-24 md:pb-10 animate-fade-in max-w-7xl mx-auto w-full">
      <TopBar title="Events" />
      
      {/* Filters */}
      <div className="px-6 py-2 flex gap-3 overflow-x-auto no-scrollbar pb-4 sticky top-[73px] z-20 bg-gray-50/95 backdrop-blur md:static md:bg-transparent">
        {filters.map(f => (
          <button 
            key={f}
            onClick={() => setFilter(f)}
            className={`px-5 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all duration-300 ${
              filter === f 
              ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' 
              : 'bg-white text-gray-500 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {EVENTS.filter(e => filter === 'All' || e.category === filter).map(event => (
          <div key={event.id} className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden group hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col">
            <div className="h-48 overflow-hidden relative">
              <img 
                src={event.image} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                alt={event.title}
              />
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-lg text-xs font-bold text-indigo-900 shadow-sm">
                {event.category}
              </div>
            </div>
            <div className="p-5 flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="text-indigo-600 text-sm font-bold mb-1 uppercase tracking-wide">{event.date}</p>
                  <h3 className="text-xl font-bold text-gray-900 leading-tight mb-1 group-hover:text-indigo-600 transition-colors">{event.title}</h3>
                </div>
                <button className="p-2 hover:bg-gray-50 rounded-full transition-colors">
                   <Heart size={20} className="text-gray-400 hover:text-red-500 transition-colors" />
                </button>
              </div>
              
              <div className="flex items-center gap-4 text-gray-500 text-sm mb-6">
                <div className="flex items-center gap-1.5">
                  <Clock size={16} />
                  {event.time}
                </div>
                <div className="flex items-center gap-1.5 truncate">
                  <MapPin size={16} />
                  <span className="truncate">{event.location}</span>
                </div>
              </div>

              <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-50">
                <div className="flex -space-x-2">
                  {[1,2,3].map(i => (
                    <img key={i} src={`https://i.pravatar.cc/150?u=${event.id}-${i}`} className="w-8 h-8 rounded-full border-2 border-white" alt="Attendee" />
                  ))}
                  <div className="w-8 h-8 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center text-xs font-bold text-gray-500">
                    +{event.attendees}
                  </div>
                </div>
                <button className="bg-gray-900 text-white px-5 py-2 rounded-xl text-sm font-bold hover:bg-indigo-600 transition-colors shadow-md hover:shadow-lg">
                  Join
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const CommunityPage = () => {
  return (
    <div className="pb-24 md:pb-10 animate-fade-in max-w-7xl mx-auto w-full">
      <TopBar title="Community" />
      
      <div className="px-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Invite & Officers */}
        <div className="lg:col-span-2 space-y-8">
            <div className="bg-indigo-600 rounded-3xl p-6 md:p-8 text-white shadow-xl shadow-indigo-200 relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="relative z-10 max-w-md">
                <h2 className="text-2xl md:text-3xl font-bold mb-2">Invite Friends</h2>
                <p className="text-indigo-100 mb-4 text-sm md:text-base">Grow our community and get exclusive badges for every 3 friends who join.</p>
                <button className="bg-white text-indigo-600 px-6 py-3 rounded-xl font-bold text-sm shadow-sm hover:bg-indigo-50 transition-colors">
                  Copy Invite Link
                </button>
              </div>
              <div className="hidden md:block relative z-10 bg-white/10 p-4 rounded-2xl backdrop-blur-sm border border-white/10">
                 <div className="text-center">
                    <div className="text-3xl font-bold">342</div>
                    <div className="text-xs text-indigo-200 uppercase tracking-wider">Members</div>
                 </div>
              </div>
              <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
              <div className="absolute top-0 left-1/2 w-64 h-64 bg-indigo-500/30 rounded-full blur-3xl"></div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-800">Club Officers</h3>
                <button className="p-2 text-gray-400 hover:text-gray-600"><MoreHorizontal size={20}/></button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {MEMBERS.filter(m => m.role !== 'Member').map(member => (
                  <div key={member.id} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center hover:border-indigo-200 transition-colors cursor-pointer group relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-16 bg-gradient-to-b from-gray-50 to-transparent"></div>
                    <div className="relative mb-3 z-10">
                      <img src={member.avatar} alt={member.name} className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover group-hover:scale-105 transition-transform border-4 border-white shadow-sm" />
                      <div className="absolute -bottom-1 -right-1 bg-indigo-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full border-2 border-white shadow-sm">
                        {member.role}
                      </div>
                    </div>
                    <h4 className="font-bold text-gray-900 text-sm md:text-base mb-1">{member.name}</h4>
                    <button className="text-xs text-indigo-500 font-semibold hover:underline">View Profile</button>
                  </div>
                ))}
              </div>
            </div>
        </div>

        {/* Right Column: All Members List */}
        <div>
           <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-800">New Members</h3>
              <button className="text-sm text-indigo-600 font-bold">See All</button>
           </div>
           <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm">
              {MEMBERS.map((member, idx) => (
                 <div key={member.id} className={`flex items-center justify-between p-4 hover:bg-gray-50 transition-colors ${idx !== MEMBERS.length -1 ? 'border-b border-gray-50' : ''}`}>
                   <div className="flex items-center gap-3">
                     <img src={member.avatar} alt={member.name} className="w-10 h-10 rounded-full bg-gray-200" />
                     <div>
                       <h4 className="font-bold text-sm text-gray-900">{member.name}</h4>
                       <span className="text-xs text-gray-400">{member.role}</span>
                     </div>
                   </div>
                   <button className="p-2 text-gray-400 hover:bg-gray-200 rounded-full transition-colors">
                     <MessageSquare size={18} />
                   </button>
                 </div>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
};

const ProfilePage = () => {
  return (
    <div className="pb-24 md:pb-10 animate-fade-in w-full">
      <div className="relative h-48 md:h-64 bg-gradient-to-br from-indigo-600 to-purple-700 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="absolute inset-0 bg-black/10"></div>
        <button className="absolute top-6 right-6 p-2 bg-white/20 backdrop-blur text-white rounded-full hover:bg-white/30 transition-colors">
          <Settings size={20} />
        </button>
      </div>
      
      <div className="px-6 relative -mt-16 max-w-4xl mx-auto">
        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-6 md:p-8 text-center relative z-10">
          <img 
            src="https://i.pravatar.cc/150?u=me" 
            alt="Profile" 
            className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-white shadow-md mx-auto -mt-20 md:-mt-24 mb-4 bg-white object-cover" 
          />
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Jamie Doe</h1>
          <p className="text-gray-500 text-sm md:text-base font-medium mb-8">UX Designer & Club Enthusiast</p>
          
          <div className="grid grid-cols-3 gap-4 border-t border-gray-100 pt-8 max-w-lg mx-auto">
            <div className="text-center">
              <div className="text-xl md:text-2xl font-bold text-gray-900">12</div>
              <div className="text-xs text-gray-400 font-medium uppercase tracking-wide">Events</div>
            </div>
            <div className="text-center border-l border-r border-gray-100">
              <div className="text-xl md:text-2xl font-bold text-gray-900">48</div>
              <div className="text-xs text-gray-400 font-medium uppercase tracking-wide">Friends</div>
            </div>
            <div className="text-center">
              <div className="text-xl md:text-2xl font-bold text-gray-900">850</div>
              <div className="text-xs text-gray-400 font-medium uppercase tracking-wide">Points</div>
            </div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
           <div className="bg-white p-2 rounded-3xl shadow-sm border border-gray-100">
             <h3 className="px-4 py-2 text-sm font-bold text-gray-400 uppercase tracking-wide">Account</h3>
             {[
               { icon: <Users size={18} />, label: "My Groups" },
               { icon: <Calendar size={18} />, label: "Saved Events" },
               { icon: <Trophy size={18} />, label: "Achievements" },
               { icon: <Heart size={18} />, label: "Favorites" },
             ].map((item, idx) => (
               <button key={idx} className="w-full flex items-center justify-between p-4 hover:bg-gray-50 rounded-xl transition-colors group">
                 <div className="flex items-center gap-3 text-gray-600 group-hover:text-indigo-600">
                   {item.icon}
                   <span className="font-bold text-sm md:text-base">{item.label}</span>
                 </div>
                 <ChevronRight size={16} className="text-gray-300" />
               </button>
             ))}
           </div>

           <div className="bg-white p-2 rounded-3xl shadow-sm border border-gray-100 flex flex-col">
              <h3 className="px-4 py-2 text-sm font-bold text-gray-400 uppercase tracking-wide">Preferences</h3>
               {[
                 { icon: <Bell size={18} />, label: "Notifications" },
                 { icon: <Share2 size={18} />, label: "Invite Friends" },
                 { icon: <Settings size={18} />, label: "App Settings" },
               ].map((item, idx) => (
                 <button key={idx} className="w-full flex items-center justify-between p-4 hover:bg-gray-50 rounded-xl transition-colors group">
                   <div className="flex items-center gap-3 text-gray-600 group-hover:text-indigo-600">
                     {item.icon}
                     <span className="font-bold text-sm md:text-base">{item.label}</span>
                   </div>
                   <ChevronRight size={16} className="text-gray-300" />
                 </button>
               ))}
               <div className="mt-auto p-2">
                  <button className="w-full flex items-center justify-center gap-2 p-4 text-red-500 font-bold text-sm bg-red-50 hover:bg-red-100 rounded-2xl transition-colors">
                    <LogOut size={18} />
                    Sign Out
                  </button>
               </div>
           </div>
        </div>
      </div>
    </div>
  );
}

const App = () => {
  const [activeTab, setActiveTab] = useState('home');

  // Adjusted effect for responsive body
  useEffect(() => {
    document.body.style.backgroundColor = '#f9fafb'; // bg-gray-50
    return () => {
      document.body.style.backgroundColor = '';
    };
  }, []);

  return (
    <div className="min-h-screen w-full bg-gray-50 font-sans text-gray-900 selection:bg-indigo-100 selection:text-indigo-900 flex">
      {/* Desktop Side Navigation */}
      <SideNav activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-screen md:pl-24 transition-all duration-300 relative">
        <main className="flex-1 overflow-y-auto scroll-smooth no-scrollbar w-full">
          {activeTab === 'home' && <Dashboard />}
          {activeTab === 'events' && <EventsPage />}
          {activeTab === 'community' && <CommunityPage />}
          {activeTab === 'profile' && <ProfilePage />}
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-6 py-3 pb-6 flex justify-between items-center z-50 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.1)]">
        {[
          { id: 'home', icon: Home, label: 'Home' },
          { id: 'events', icon: Calendar, label: 'Events' },
          { id: 'add', icon: Plus, label: 'New', isFab: true },
          { id: 'community', icon: Users, label: 'Club' },
          { id: 'profile', icon: Settings, label: 'Profile' },
        ].map((item) => {
          if (item.isFab) {
             return (
               <button 
                 key={item.id}
                 className="bg-gray-900 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg shadow-gray-400 transform -translate-y-4 hover:scale-105 active:scale-95 transition-all duration-300"
               >
                 <item.icon size={24} />
               </button>
             )
          }
          
          const isActive = activeTab === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center gap-1 transition-all duration-300 ${
                isActive ? 'text-indigo-600' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <item.icon size={isActive ? 24 : 22} strokeWidth={isActive ? 2.5 : 2} />
              <span className={`text-[10px] font-bold ${isActive ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>
      
      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.4s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default App;