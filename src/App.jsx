import React, { useState } from 'react';
import { Header } from './components/Layout/Header';
import { BottomNav } from './components/Layout/BottomNav';
import { Feed } from './components/Feed/Feed';
import { Profile } from './components/Profile/Profile';
import { SignInModal } from './components/Auth/SignInModal';
import { CreateEventModal } from './components/Feed/CreateEventModal';
import { EventDetailsModal } from './components/Feed/EventDetailsModal';
import { NotificationsModal } from './components/Notifications/NotificationsModal';
import { MessagesModal } from './components/Messages/MessagesModal';
import { SplashScreen } from './components/SplashScreen/SplashScreen';
import styles from './App.module.css';

const INITIAL_EVENTS = [
  { id: 'e1', title: 'Night Run', desc: '5k through the neon city — bring lights & buddies', time: '2025-11-20T20:00:00Z', dist: 400, cat: 'Fitness', host: { name: 'Sam', bio: 'Night Runner', avatar: null }, lat: 12.935, lng: 77.624, joinedCount: 5, maxCapacity: 10 },
  { id: 'e2', title: 'Synthwave Jam', desc: 'Bring synths & guitars — limited slots', time: '2025-11-20T21:00:00Z', dist: 1200, cat: 'Music', host: { name: 'Maya', bio: 'Producer', avatar: null }, lat: 12.9343, lng: 77.6292, joinedCount: 2, maxCapacity: 4 },
  { id: 'e3', title: 'Code & Chill', desc: 'Late night coding session with pizza', time: '2025-11-21T19:00:00Z', dist: 2200, cat: 'Tech', host: { name: 'Rohit', bio: 'Fullstack', avatar: null }, lat: 12.94, lng: 77.62, joinedCount: 6, maxCapacity: 6 },
  { id: 'e4', title: 'Futsal Match', desc: 'Under the lights — bring cleats', time: '2025-11-19T18:30:00Z', dist: 600, cat: 'Sports', host: { name: 'Asha', bio: 'Coach', avatar: null }, lat: 12.9312, lng: 77.63, joinedCount: 8, maxCapacity: 12 }
];

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [currentView, setCurrentView] = useState('feed'); // 'feed' or 'profile'
  const [showSearch, setShowSearch] = useState(true); // Search bar visibility
  const [user, setUser] = useState(null);
  const [events, setEvents] = useState(INITIAL_EVENTS);
  const [joinedEvents, setJoinedEvents] = useState(new Set());
  const [hostedEvents, setHostedEvents] = useState([]); // Track events created by user

  // Modal States
  const [isAuthOpen, setAuthOpen] = useState(false);
  const [isCreateOpen, setCreateOpen] = useState(false);
  const [isNotificationsOpen, setNotificationsOpen] = useState(false);
  const [isMessagesOpen, setMessagesOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const feedRef = React.useRef(null);

  const handleSearchFocus = () => {
    setCurrentView('feed');
    setShowSearch(true);
    // Small timeout to ensure view switch happens and component mounts/updates
    setTimeout(() => {
      if (feedRef.current) {
        feedRef.current.focusSearch();
      }
    }, 50);
  };

  const handleLogin = (userData) => {
    setUser(userData);
    setAuthOpen(false);
  };

  const handleSignOut = () => {
    setUser(null);
    setJoinedEvents(new Set());
    setHostedEvents([]);
    setCurrentView('feed');
  };

  const handleCreateEvent = (newEvent) => {
    const eventId = `e${Date.now()}`;
    const event = {
      ...newEvent,
      id: eventId,
      host: { name: user?.name || 'You', bio: 'Host' }
    };
    setEvents([event, ...events]);
    setHostedEvents([...hostedEvents, eventId]);
  };

  const handleJoin = (id) => {
    if (!user) {
      setAuthOpen(true);
      return;
    }
    const next = new Set(joinedEvents);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setJoinedEvents(next);
  };

  if (showSplash) {
    return <SplashScreen onComplete={() => setShowSplash(false)} />;
  }

  return (
    <div className={styles.app}>
      <Header
        user={user}
        onSignIn={() => setAuthOpen(true)}
        onNotifications={() => setNotificationsOpen(true)}
        onSearch={handleSearchFocus}
      />

      <main className={styles.main}>
        {currentView === 'feed' ? (
          <Feed
            ref={feedRef}
            events={events}
            joined={joinedEvents}
            onJoin={handleJoin}
            onView={(ev) => setSelectedEvent(ev)}
            showSearch={showSearch}
          />
        ) : (
          <Profile
            user={user}
            joinedEvents={joinedEvents}
            hostedEvents={hostedEvents}
            allEvents={events}
            onSignOut={handleSignOut}
          />
        )}
      </main>

      <BottomNav
        currentView={currentView}
        onNavigate={setCurrentView}
        onCreate={() => user ? setCreateOpen(true) : setAuthOpen(true)}
        onSearch={handleSearchFocus}
        showSearch={showSearch}
        onMessages={() => setMessagesOpen(true)}
      />

      <SignInModal
        isOpen={isAuthOpen}
        onClose={() => setAuthOpen(false)}
        onLogin={handleLogin}
      />

      <CreateEventModal
        isOpen={isCreateOpen}
        onClose={() => setCreateOpen(false)}
        onCreate={handleCreateEvent}
      />

      <NotificationsModal
        isOpen={isNotificationsOpen}
        onClose={() => setNotificationsOpen(false)}
      />

      <MessagesModal
        isOpen={isMessagesOpen}
        onClose={() => setMessagesOpen(false)}
      />

      <EventDetailsModal
        event={selectedEvent}
        isOpen={!!selectedEvent}
        onClose={() => setSelectedEvent(null)}
        onJoin={handleJoin}
        isJoined={selectedEvent && joinedEvents.has(selectedEvent.id)}
      />
    </div>
  );
}

export default App;
