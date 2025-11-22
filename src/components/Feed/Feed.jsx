import React, { useState } from 'react';
import { MapPin, Calendar } from 'lucide-react';
import { Card } from '../UI/Card';
import { Button } from '../UI/Button';
import { Avatar } from '../UI/Avatar';
import { FilterBar } from './FilterBar';
import styles from './Feed.module.css';

export const Feed = ({ events, joined, onJoin, onView, showSearch = true }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [showMyEvents, setShowMyEvents] = useState(false);

    const formatTime = (iso) => {
        return new Date(iso).toLocaleString(undefined, {
            hour: 'numeric', minute: '2-digit', day: 'numeric', month: 'short'
        });
    };

    const formatDist = (m) => m < 1000 ? `${m} m` : `${(m / 1000).toFixed(1)} km`;

    // Filter events
    const filteredEvents = events.filter(ev => {
        // Search filter
        const matchesSearch = ev.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            ev.desc.toLowerCase().includes(searchQuery.toLowerCase());

        // Category filter
        const matchesCategory = selectedCategory === 'All' || ev.cat === selectedCategory;

        // My Events filter
        const matchesMyEvents = !showMyEvents || joined.has(ev.id);

        return matchesSearch && matchesCategory && matchesMyEvents;
    });

    return (
        <>
            {showSearch && (
                <FilterBar
                    searchQuery={searchQuery}
                    onSearchChange={setSearchQuery}
                    selectedCategory={selectedCategory}
                    onCategoryChange={setSelectedCategory}
                    showMyEvents={showMyEvents}
                    onToggleMyEvents={() => setShowMyEvents(!showMyEvents)}
                />
            )}

            <div className={styles.feed}>
                {filteredEvents.length === 0 ? (
                    <div className={styles.emptyState}>
                        <p>No events found</p>
                        {showMyEvents && <p className={styles.emptyHint}>You haven't joined any events yet</p>}
                    </div>
                ) : (
                    filteredEvents.map(ev => (
                        <Card key={ev.id} hover className={styles.eventCard}>
                            <div className={styles.header}>
                                <Avatar src={null} alt={ev.host.name} size="md" />
                                <div className={styles.info}>
                                    <h3 className={styles.title}>{ev.title}</h3>
                                    <div className={styles.meta}>
                                        <span className={styles.metaItem}>
                                            <Calendar size={12} /> {formatTime(ev.time)}
                                        </span>
                                        <span className={styles.dot}>•</span>
                                        <span className={styles.metaItem}>
                                            <MapPin size={12} /> {formatDist(ev.dist)}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <p className={styles.desc}>{ev.desc}</p>

                            <div className={styles.actions}>
                                <Button
                                    variant={joined.has(ev.id) ? 'ghost' : 'primary'}
                                    onClick={() => onJoin(ev.id)}
                                    className={styles.joinBtn}
                                >
                                    {joined.has(ev.id) ? 'Joined' : 'Join Event'}
                                </Button>
                                <Button variant="ghost" onClick={() => onView(ev)}>Details</Button>
                            </div>
                        </Card>
                    ))
                )}
            </div>
        </>
    );
};
