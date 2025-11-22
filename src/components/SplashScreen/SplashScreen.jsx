import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './SplashScreen.module.css';

export const SplashScreen = ({ onComplete }) => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
            setTimeout(onComplete, 500); // Wait for exit animation
        }, 2500);

        return () => clearTimeout(timer);
    }, [onComplete]);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    className={styles.splash}
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <motion.div
                        className={styles.content}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                    >
                        <motion.div
                            className={styles.logo}
                            animate={{
                                rotate: [0, 360],
                                scale: [1, 1.1, 1]
                            }}
                            transition={{
                                duration: 2,
                                ease: "easeInOut",
                                times: [0, 0.5, 1]
                            }}
                        >
                            <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
                                <circle cx="40" cy="40" r="35" stroke="url(#gradient)" strokeWidth="3" />
                                <circle cx="40" cy="40" r="25" fill="url(#gradient)" opacity="0.3" />
                                <path d="M40 20 L50 35 L40 32 L30 35 Z" fill="white" />
                                <circle cx="40" cy="40" r="5" fill="white" />
                                <defs>
                                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" stopColor="#7c3aed" />
                                        <stop offset="100%" stopColor="#9333ea" />
                                    </linearGradient>
                                </defs>
                            </svg>
                        </motion.div>

                        <motion.h1
                            className={styles.title}
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.3, duration: 0.5 }}
                        >
                            ClubApp
                        </motion.h1>

                        <motion.p
                            className={styles.tagline}
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.5, duration: 0.5 }}
                        >
                            Connect. Explore. Join.
                        </motion.p>

                        <motion.div
                            className={styles.loader}
                            initial={{ width: 0 }}
                            animate={{ width: "100%" }}
                            transition={{ delay: 0.8, duration: 1.5, ease: "easeInOut" }}
                        />
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
