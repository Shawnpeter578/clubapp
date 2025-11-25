import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowLeft, Send } from 'lucide-react';
import styles from './MessagesModal.module.css';

const INITIAL_MESSAGES = [
    {
        id: 1,
        name: 'Sam',
        lastMsg: 'Hey! Are you coming to the Night Run?',
        time: '2m',
        unread: true,
        history: [
            { id: 1, text: 'Hey! Are you coming to the Night Run?', sender: 'them', time: '10:30 AM' }
        ]
    },
    {
        id: 2,
        name: 'Maya',
        lastMsg: 'I have an extra synth if you need one',
        time: '1h',
        unread: false,
        history: [
            { id: 1, text: 'Are you bringing your gear?', sender: 'me', time: '9:00 AM' },
            { id: 2, text: 'I have an extra synth if you need one', sender: 'them', time: '9:15 AM' }
        ]
    },
    {
        id: 3,
        name: 'Club Admin',
        lastMsg: 'Your event has been approved!',
        time: '1d',
        unread: false,
        history: [
            { id: 1, text: 'Your event has been approved!', sender: 'them', time: 'Yesterday' }
        ]
    },
];

export const MessagesModal = ({ isOpen, onClose }) => {
    const [activeConv, setActiveConv] = useState(null);
    const [threads, setThreads] = useState(INITIAL_MESSAGES);
    const [inputText, setInputText] = useState('');
    const messagesEndRef = useRef(null);

    // Reset state when modal closes
    useEffect(() => {
        if (!isOpen) {
            setActiveConv(null);
        }
    }, [isOpen]);

    // Scroll to bottom of chat
    useEffect(() => {
        if (activeConv) {
            messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        }
    }, [activeConv, threads]);

    // Lock body scroll
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    const handleSend = (e) => {
        e.preventDefault();
        if (!inputText.trim() || !activeConv) return;

        const newMessage = {
            id: Date.now(),
            text: inputText,
            sender: 'me',
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        // Update thread history
        const updatedThreads = threads.map(t => {
            if (t.id === activeConv.id) {
                return {
                    ...t,
                    lastMsg: 'You: ' + inputText,
                    time: 'Just now',
                    history: [...t.history, newMessage]
                };
            }
            return t;
        });

        setThreads(updatedThreads);
        // Update active conversation reference to show new message immediately
        setActiveConv(updatedThreads.find(t => t.id === activeConv.id));
        setInputText('');
    };

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
                        initial={{ opacity: 0, y: '100%' }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header */}
                        <div className={styles.header}>
                            <div className={styles.headerLeft}>
                                {activeConv && (
                                    <button
                                        className={styles.backBtn}
                                        onClick={() => setActiveConv(null)}
                                    >
                                        <ArrowLeft size={20} />
                                    </button>
                                )}
                                <h2 className={styles.title}>
                                    {activeConv ? activeConv.name : 'Messages'}
                                </h2>
                            </div>
                            <button className={styles.closeBtn} onClick={onClose}>
                                <X size={20} />
                            </button>
                        </div>

                        {/* Content */}
                        {activeConv ? (
                            <div className={styles.conversation}>
                                <div className={styles.messagesList}>
                                    {activeConv.history.map((msg) => (
                                        <div
                                            key={msg.id}
                                            className={`${styles.msgBubble} ${msg.sender === 'me' ? styles.msgSent : styles.msgReceived}`}
                                        >
                                            {msg.text}
                                            <div className={styles.msgTime}>{msg.time}</div>
                                        </div>
                                    ))}
                                    <div ref={messagesEndRef} />
                                </div>
                                <form className={styles.inputArea} onSubmit={handleSend}>
                                    <input
                                        type="text"
                                        className={styles.input}
                                        placeholder="Type a message..."
                                        value={inputText}
                                        onChange={(e) => setInputText(e.target.value)}
                                    />
                                    <button
                                        type="submit"
                                        className={styles.sendBtn}
                                        disabled={!inputText.trim()}
                                    >
                                        <Send size={18} />
                                    </button>
                                </form>
                            </div>
                        ) : (
                            <div className={styles.list}>
                                {threads.map((thread) => (
                                    <div
                                        key={thread.id}
                                        className={styles.item}
                                        onClick={() => setActiveConv(thread)}
                                    >
                                        <div className={styles.avatar}>
                                            {thread.name[0]}
                                        </div>
                                        <div className={styles.content}>
                                            <div className={styles.name}>{thread.name}</div>
                                            <div className={styles.message}>{thread.lastMsg}</div>
                                        </div>
                                        <div className={styles.meta}>
                                            <span className={styles.time}>{thread.time}</span>
                                            {thread.unread && <div className={styles.badge} />}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
