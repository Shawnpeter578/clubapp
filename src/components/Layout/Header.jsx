import React from 'react';
import { Search, Bell, ArrowLeft, X } from 'lucide-react';
import { Avatar } from '../UI/Avatar';
import styles from './Header.module.css';

export const Header = ({ user, onSignIn, showBack, onBack, showCancel, onCancel, onNotifications, onSearch }) => {
    return (
        <header className={styles.header}>
            <div className={styles.left}>
                {showBack && (
                    <button className={styles.backBtn} onClick={onBack}>
                        <ArrowLeft size={24} />
                    </button>
                )}
                {!showBack && (
                    <>
                        <div className={styles.logo}>
                            <div className={styles.logoIcon}>C</div>
                        </div>
                        <h1 className={styles.title}>ClubApp</h1>
                    </>
                )}
            </div>

            <div className={styles.right}>
                {showCancel ? (
                    <button className={styles.cancelBtn} onClick={onCancel}>
                        <X size={18} />
                        Cancel
                    </button>
                ) : (
                    <>
                        <button className={styles.iconBtn} onClick={onSearch}>
                            <Search size={20} />
                        </button>
                        <button className={styles.iconBtn} onClick={onNotifications}>
                            <Bell size={20} />
                        </button>
                        {user ? (
                            <Avatar src={null} alt={user.name} size="sm" />
                        ) : (
                            <button className={styles.signInBtn} onClick={onSignIn}>
                                Sign In
                            </button>
                        )}
                    </>
                )}
            </div>
        </header>
    );
};
