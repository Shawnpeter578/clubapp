import React, { useState } from 'react';
import { User, Mail, Calendar, MapPin, Users, LogOut, Edit2 } from 'lucide-react';
import { Card } from '../UI/Card';
import { Button } from '../UI/Button';
import { Avatar } from '../UI/Avatar';
import styles from './Profile.module.css';

export const Profile = ({ user, joinedEvents, hostedEvents, allEvents, onSignOut }) => {
    const [activeTab, setActiveTab] = useState('joined'); // 'joined' or 'hosted'

    if (!user) {
        return (
            <div className={styles.emptyState}>
                <p>Please sign in to view your profile</p>
            </div>
        );
    }

    const joinedEventsList = allEvents.filter(ev => joinedEvents.has(ev.id));
    const hostedEventsList = allEvents.filter(ev => hostedEvents.includes(ev.id));

    const formatTime = (iso) => {
        return new Date(iso).toLocaleString(undefined, {
            hour: 'numeric', minute: '2-digit', day: 'numeric', month: 'short'
        });
    };

    const formatDist = (m) => m < 1000 ? `${m} m` : `${(m / 1000).toFixed(1)} km`;

    return (
        <div className={styles.profile}>
            {/* Profile Header */}
            <Card className={styles.profileCard}>
                <div className={styles.profileHeader}>
                    <Avatar src={null} alt={user.name} size="lg" />
                    <div className={styles.profileInfo}>
                        <h2 className={styles.name}>{user.name}</h2>
                        <p className={styles.email}>
                            <Mail size={14} /> {user.email}
                        </p>
                    </div>
                    <button className={styles.editBtn}>
                        <Edit2 size={18} />
                    </button>
                </div>

                <div className={styles.stats}>
                    <div className={styles.stat}>
                        <div className={styles.statValue}>{joinedEventsList.length}</div>
                        <div className={styles.statLabel}>Joined</div>
                    </div>
                    <div className={styles.stat}>
                        <div className={styles.statValue}>{hostedEventsList.length}</div>
                        <div className={styles.statLabel}>Hosted</div>
                    </div>
                    <div className={styles.stat}>
                        <div className={styles.statValue}>{joinedEventsList.length + hostedEventsList.length}</div>
                        <div className={styles.statLabel}>Total</div>
                    </div>
                </div>

                <Button
                    variant="ghost"
                    className={styles.signOutBtn}
                    onClick={onSignOut}
                >
                    <LogOut size={18} /> Sign Out
                </Button>
            </Card>

            {/* Tabs */}
            <div className={styles.tabs}>
                <button
                    className={`${styles.tab} ${activeTab === 'joined' ? styles.active : ''}`}
                    onClick={() => setActiveTab('joined')}
                >
                    Joined Events ({joinedEventsList.length})
                </button>
                <button
                    className={`${styles.tab} ${activeTab === 'hosted' ? styles.active : ''}`}
                    onClick={() => setActiveTab('hosted')}
                >
                    Hosted Events ({hostedEventsList.length})
                </button>
            </div>

            {/* Events List */}
            <div className={styles.eventsList}>
                {activeTab === 'joined' && (
                    <>
                        {joinedEventsList.length === 0 ? (
                            <div className={styles.emptyState}>
                                <p>You haven't joined any events yet</p>
                            </div>
                        ) : (
                            joinedEventsList.map(ev => (
                                <Card key={ev.id} className={styles.eventCard}>
                                    <div className={styles.eventHeader}>
                                        <h3 className={styles.eventTitle}>{ev.title}</h3>
                                        <span className={styles.category}>{ev.cat}</span>
                                    </div>
                                    <p className={styles.eventDesc}>{ev.desc}</p>
                                    <div className={styles.eventMeta}>
                                        <span className={styles.metaItem}>
                                            <Calendar size={14} /> {formatTime(ev.time)}
                                        </span>
                                        <span className={styles.metaItem}>
                                            <MapPin size={14} /> {formatDist(ev.dist)}
                                        </span>
                                    </div>
                                </Card>
                            ))
                        )}
                    </>
                )}

                {activeTab === 'hosted' && (
                    <>
                        {hostedEventsList.length === 0 ? (
                            <div className={styles.emptyState}>
                                <p>You haven't hosted any events yet</p>
                            </div>
                        ) : (
                            hostedEventsList.map(ev => {
                                // Mock participants - in real app, this would come from backend
                                const participantCount = Math.floor(Math.random() * 15) + 3;

                                return (
                                    <Card key={ev.id} className={styles.eventCard}>
                                        <div className={styles.eventHeader}>
                                            <h3 className={styles.eventTitle}>{ev.title}</h3>
                                            <span className={styles.category}>{ev.cat}</span>
                                        </div>
                                        <p className={styles.eventDesc}>{ev.desc}</p>
                                        <div className={styles.eventMeta}>
                                            <span className={styles.metaItem}>
                                                <Calendar size={14} /> {formatTime(ev.time)}
                                            </span>
                                            <span className={styles.metaItem}>
                                                <MapPin size={14} /> {formatDist(ev.dist)}
                                            </span>
                                            <span className={styles.metaItem}>
                                                <Users size={14} /> {participantCount} joined
                                            </span>
                                        </div>
                                    </Card>
                                );
                            })
                        )}
                    </>
                )}
            </div>
        </div>
    );
};
