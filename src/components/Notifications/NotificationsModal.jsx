import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Bell, Calendar, User } from 'lucide-react';
import styles from './NotificationsModal.module.css';

const DUMMY_NOTIFICATIONS = [
    { id: 1, type: 'event', text: 'Night Run starts in 1 hour', time: '10 min ago', icon: Calendar },
    { id: 2, type: 'user', text: 'Maya joined your Synthwave Jam', time: '2 hours ago', icon: User },
    { id: 3, type: 'system', text: 'Welcome to ClubApp Premium!', time: '1 day ago', icon: Bell },
];

export const NotificationsModal = ({ isOpen, onClose }) => {
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
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className={styles.header}>
                            <h2 className={styles.title}>Notifications</h2>
                            <button className={styles.closeBtn} onClick={onClose}>
                                <X size={20} />
                            </button>
                        </div>

                        <div className={styles.list}>
                            {DUMMY_NOTIFICATIONS.map((notif) => (
                                <div key={notif.id} className={styles.item}>
                                    <div className={styles.icon}>
                                        <notif.icon size={20} />
                                    </div>
                                    <div className={styles.content}>
                                        <div className={styles.message}>{notif.text}</div>
                                        <div className={styles.time}>{notif.time}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
