import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, MapPin, Maximize2, Minimize2, Users } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Button } from '../UI/Button';
import { Avatar } from '../UI/Avatar';
import styles from './EventDetailsModal.module.css';

// Fix Leaflet icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

export const EventDetailsModal = ({ event, isOpen, onClose, onJoin, isJoined }) => {
    const [isMapExpanded, setIsMapExpanded] = useState(false);

    if (!event) return null;

    const formatTime = (iso) => {
        return new Date(iso).toLocaleString(undefined, {
            hour: 'numeric', minute: '2-digit', day: 'numeric', month: 'short'
        });
    };

    const formatDist = (m) => m < 1000 ? `${m} m` : `${(m / 1000).toFixed(1)} km`;

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className={styles.backdrop}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                >
                    <motion.div
                        className={`${styles.modal} ${isMapExpanded ? styles.modalExpanded : ''}`}
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button className={styles.closeBtn} onClick={onClose}>
                            <X size={20} />
                        </button>

                        <div
                            className={`${styles.mapWrap} ${isMapExpanded ? styles.mapExpanded : ''}`}
                            onClick={() => setIsMapExpanded(!isMapExpanded)}
                        >
                            <MapContainer
                                center={[event.lat, event.lng]}
                                zoom={isMapExpanded ? 15 : 13}
                                style={{ height: '100%', width: '100%' }}
                                zoomControl={false}
                                dragging={isMapExpanded}
                                scrollWheelZoom={isMapExpanded}
                            >
                                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                                <Marker position={[event.lat, event.lng]}>
                                    <Popup>{event.title}</Popup>
                                </Marker>
                            </MapContainer>
                            <button className={styles.mapExpandBtn} onClick={(e) => {
                                e.stopPropagation();
                                setIsMapExpanded(!isMapExpanded);
                            }}>
                                {isMapExpanded ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
                            </button>
                        </div>

                        <div className={styles.content}>
                            <div className={styles.header}>
                                <h2 className={styles.title}>{event.title}</h2>
                                <span className={styles.cat}>{event.cat}</span>
                            </div>

                            <div className={styles.hostRow}>
                                <Avatar src={event.host.avatar} alt={event.host.name} size="md" />
                                <div className={styles.hostInfo}>
                                    <span className={styles.hostName}>{event.host.name}</span>
                                    <span className={styles.hostBio}>{event.host.bio}</span>
                                </div>
                            </div>

                            <p className={styles.desc}>{event.desc}</p>

                            <div className={styles.meta}>
                                <span className={styles.metaItem}>
                                    <Calendar size={14} /> {formatTime(event.time)}
                                </span>
                                <span className={styles.metaItem}>
                                    <MapPin size={14} /> {formatDist(event.dist)}
                                </span>
                                <span className={styles.metaItem}>
                                    <Users size={14} /> {event.joinedCount}/{event.maxCapacity} Joined
                                </span>
                            </div>

                            <Button
                                variant={isJoined ? 'ghost' : 'primary'}
                                onClick={() => onJoin(event.id)}
                                className={styles.joinBtn}
                            >
                                {isJoined ? 'Joined' : 'Join Event'}
                            </Button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
