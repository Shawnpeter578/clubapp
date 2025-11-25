import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, MapPin, Type, Tag } from 'lucide-react';
import { Button } from '../UI/Button';
import { Input } from '../UI/Input';
import styles from './CreateEventModal.module.css';

export const CreateEventModal = ({ isOpen, onClose, onCreate }) => {
    const [formData, setFormData] = useState({
        title: '',
        desc: '',
        location: '',
        time: '',
        dist: '',
        cat: 'General'
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        onCreate({
            ...formData,
            dist: Number(formData.dist),
            host: { name: 'You', bio: 'Host' }, // Mock host
            lat: 12.935, lng: 77.624 // Mock location
        });
        onClose();
    };

    React.useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

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
                        className={styles.modal}
                        initial={{ opacity: 0, y: 100 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 100 }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className={styles.header}>
                            <h3>Create Event</h3>
                            <button className={styles.closeBtn} onClick={onClose}>
                                <X size={20} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className={styles.form}>
                            <Input
                                icon={Type}
                                placeholder="Event Title"
                                value={formData.title}
                                onChange={e => setFormData({ ...formData, title: e.target.value })}
                                required
                            />

                            <Input
                                icon={MapPin}
                                placeholder="Location Name"
                                value={formData.location}
                                onChange={e => setFormData({ ...formData, location: e.target.value })}
                                required
                            />

                            <div className={styles.row}>
                                <Input
                                    icon={Calendar}
                                    type="datetime-local"
                                    value={formData.time}
                                    onChange={e => setFormData({ ...formData, time: e.target.value })}
                                    required
                                />
                                <Input
                                    icon={MapPin}
                                    type="number"
                                    placeholder="Distance (m)"
                                    value={formData.dist}
                                    onChange={e => setFormData({ ...formData, dist: e.target.value })}
                                    required
                                />
                            </div>

                            <textarea
                                className={styles.textarea}
                                placeholder="Description..."
                                value={formData.desc}
                                onChange={e => setFormData({ ...formData, desc: e.target.value })}
                                required
                            />

                            <div className={styles.selectWrap}>
                                <Tag size={18} className={styles.selectIcon} />
                                <select
                                    className={styles.select}
                                    value={formData.cat}
                                    onChange={e => setFormData({ ...formData, cat: e.target.value })}
                                >
                                    <option>General</option>
                                    <option>Music</option>
                                    <option>Tech</option>
                                    <option>Sports</option>
                                </select>
                            </div>

                            <Button type="submit" className={styles.submitBtn}>
                                Create Event
                            </Button>
                        </form>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
