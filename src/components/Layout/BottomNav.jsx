import React from 'react';
import { Home, Search, Plus, MessageCircle, User } from 'lucide-react';
import styles from './BottomNav.module.css';
import clsx from 'clsx';

export const BottomNav = ({ currentView, onNavigate, onCreate, onSearch, showSearch, onMessages }) => {
    const getStrokeWidth = (isActive) => isActive ? 2.5 : 2;

    return (
        <nav className={styles.nav}>
            <button
                className={clsx(styles.item, currentView === 'feed' && styles.active)}
                onClick={() => onNavigate('feed')}
            >
                <Home size={26} strokeWidth={getStrokeWidth(currentView === 'feed')} />
            </button>
            <button
                className={clsx(styles.item, showSearch && currentView === 'feed' && styles.active)}
                onClick={onSearch}
            >
                <Search size={26} strokeWidth={getStrokeWidth(showSearch)} />
            </button>
            <button className={styles.fab} onClick={onCreate}>
                <Plus size={32} strokeWidth={2.5} />
            </button>
            <button className={styles.item} onClick={onMessages}>
                <MessageCircle size={26} strokeWidth={2} />
            </button>
            <button
                className={clsx(styles.item, currentView === 'profile' && styles.active)}
                onClick={() => onNavigate('profile')}
            >
                <User size={26} strokeWidth={getStrokeWidth(currentView === 'profile')} />
            </button>
        </nav>
    );
};
