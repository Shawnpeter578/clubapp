import React from 'react';
import { Home, Search, Plus, MessageCircle, User } from 'lucide-react';
import styles from './BottomNav.module.css';
import clsx from 'clsx';

export const BottomNav = ({ currentView, onNavigate, onCreate, onToggleSearch, showSearch }) => {
    return (
        <nav className={styles.nav}>
            <button
                className={clsx(styles.item, currentView === 'feed' && styles.active)}
                onClick={() => onNavigate('feed')}
            >
                <Home size={24} />
            </button>
            <button
                className={clsx(styles.item, showSearch && currentView === 'feed' && styles.active)}
                onClick={onToggleSearch}
            >
                <Search size={24} />
            </button>
            <button className={styles.fab} onClick={onCreate}>
                <Plus size={28} />
            </button>
            <button className={styles.item}>
                <MessageCircle size={24} />
            </button>
            <button
                className={clsx(styles.item, currentView === 'profile' && styles.active)}
                onClick={() => onNavigate('profile')}
            >
                <User size={24} />
            </button>
        </nav>
    );
};
