
import React, { useState, useRef, useImperativeHandle, forwardRef } from 'react';
import { MapPin, Calendar, Users } from 'lucide-react';
import { Card } from '../UI/Card';
import { Button } from '../UI/Button';
import { Avatar } from '../UI/Avatar';
import { FilterBar } from './FilterBar';
import styles from './Feed.module.css';
import { CreateEventModal } from './CreateEventModal';
import { FilterModal } from './FilterModal';

export const Feed = forwardRef(({ events: initialEvents, joined, onJoin, onView, showSearch = true, isCreateOpen, onCloseCreate }, ref) => {
    const filterBarRef = useRef(null);

    useImperativeHandle(ref, () => ({
        focusSearch: () => {
            if (filterBarRef.current) {
                filterBarRef.current.focus();
            }
        }
    }));
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [showMyEvents, setShowMyEvents] = useState(false);
    const [events, setEvents] = useState(initialEvents);

    const formatTime = (iso) => {
        return new Date(iso).toLocaleString(undefined, {
            hour: 'numeric', minute: '2-digit', day: 'numeric', month: 'short'
        });
    };

    const formatDist = (m) => m < 1000 ? `${m} m` : `${(m / 1000).toFixed(1)} km`;

    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [filters, setFilters] = useState({ sortBy: 'nearest', distance: 'all', date: 'any' });

    const handleCreateEvent = (newEvent) => {
        const event = {
            id: Date.now(),
            ...newEvent,
            host: { name: 'You', bio: 'Host', avatar: null },
            joinedCount: 1,
            maxCapacity: 10 // Default capacity
        };
        setEvents([event, ...events]);
    };

    const handleJoinEvent = (eventId) => {
        setEvents(events.map(ev => {
            if (ev.id === eventId) {
                const isJoined = ev.isJoined;
                return {
                    ...ev,
                    isJoined: !isJoined,
                    joinedCount: isJoined ? ev.joinedCount - 1 : ev.joinedCount + 1
                };
            }
            return ev;
        }));
        if (onJoin) {
            onJoin(eventId);
        }
    };

    // Filtering Logic
    const filteredEvents = events.filter(ev => {
        if (searchQuery && !ev.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
        if (selectedCategory !== 'All' && ev.cat !== selectedCategory) return false;
        if (showMyEvents && !joined.has(ev.id)) return false;

        if (filters.distance !== 'all') {
            const maxDist = filters.distance === '< 1km' ? 1000 : filters.distance === '< 5km' ? 5000 : 10000;
            if (ev.dist > maxDist) return false;
        }

        if (filters.date !== 'any') {
            const eventDate = new Date(ev.time);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const eventDay = new Date(eventDate);
            eventDay.setHours(0, 0, 0, 0);

            if (filters.date === 'today' && eventDay.getTime() !== today.getTime()) return false;
            if (filters.date === 'tomorrow') {
                const tomorrow = new Date(today);
                tomorrow.setDate(tomorrow.getDate() + 1);
                if (eventDay.getTime() !== tomorrow.getTime()) return false;
            }
        }

        return true;
    }).sort((a, b) => {
        if (filters.sortBy === 'nearest') return a.dist - b.dist;
        if (filters.sortBy === 'earliest') return new Date(a.time) - new Date(b.time);
        if (filters.sortBy === 'popular') return b.joinedCount - a.joinedCount;
        return 0;
    });

    return (
        <div className={styles.feed}>
            {showSearch && (
                <FilterBar
                    ref={filterBarRef}
                    searchQuery={searchQuery}
                    onSearchChange={setSearchQuery}
                    selectedCategory={selectedCategory}
                    onCategoryChange={setSelectedCategory}
                    showMyEvents={showMyEvents}
                    onToggleMyEvents={() => setShowMyEvents(!showMyEvents)}
                    onOpenFilter={() => setIsFilterOpen(true)}
                />
            )}

            <div className={styles.eventList}>
                {filteredEvents.length === 0 ? (
                    <div className={styles.emptyState}>
                        <p>No events found</p>
                        {showMyEvents && <p className={styles.emptyHint}>You haven't joined any events yet</p>}
                    </div>
                ) : (
                    filteredEvents.map(ev => {
                        const date = new Date(ev.time);
                        const month = date.toLocaleString('default', { month: 'short' });
                        const day = date.getDate();
                        const time = date.toLocaleString('default', { hour: 'numeric', minute: '2-digit' });

                        return (
                            <Card
                                key={ev.id}
                                className={styles.eventCard}
                                onClick={() => onView(ev)}
                                hover
                                style={{ cursor: 'pointer' }}
                            >
                                <div className={styles.cardContent}>
                                    <div className={styles.header}>
                                        <div className={styles.mainInfo}>
                                            <span className={styles.category}>{ev.cat}</span>
                                            <h3 className={styles.title}>{ev.title}</h3>
                                        </div>
                                        <div className={styles.dateBadge}>
                                            <span className={styles.month}>{month}</span>
                                            <span className={styles.day}>{day}</span>
                                        </div>
                                    </div>

                                    <div className={styles.detailsGrid}>
                                        <div className={styles.detailItem}>
                                            <Calendar size={14} className={styles.detailIcon} />
                                            <span>{time}</span>
                                        </div>
                                        <div className={styles.detailItem}>
                                            <MapPin size={14} className={styles.detailIcon} />
                                            <span>{formatDist(ev.dist)}</span>
                                        </div>
                                        <div className={styles.detailItem}>
                                            <Users size={14} className={styles.detailIcon} />
                                            <span>{ev.joinedCount}/{ev.maxCapacity} Joined</span>
                                        </div>
                                        {ev.location && (
                                            <div className={styles.detailItem}>
                                                <MapPin size={14} className={styles.detailIcon} />
                                                <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                                    {ev.location}
                                                </span>
                                            </div>
                                        )}
                                    </div>

                                    <div className={styles.footer}>
                                        <div className={styles.hostInfo}>
                                            <Avatar src={ev.host.avatar} alt={ev.host.name} size="sm" />
                                            <div className={styles.hostText}>
                                                <span className={styles.hostedBy}>Hosted by</span>
                                                <span className={styles.hostName}>{ev.host.name}</span>
                                            </div>
                                        </div>

                                        <Button
                                            variant={joined.has(ev.id) ? "outline" : "primary"}
                                            size="sm"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleJoinEvent(ev.id);
                                            }}
                                            className={styles.joinBtn}
                                        >
                                            {joined.has(ev.id) ? 'Joined' : 'Join'}
                                        </Button>
                                    </div>
                                </div>
                            </Card>
                        );
                    })
                )}
            </div>

            <CreateEventModal
                isOpen={isCreateOpen}
                onClose={onCloseCreate}
                onCreate={handleCreateEvent}
            />

            <FilterModal
                isOpen={isFilterOpen}
                onClose={() => setIsFilterOpen(false)}
                currentFilters={filters}
                onApply={setFilters}
            />
        </div>
    );
});

Feed.displayName = 'Feed';
