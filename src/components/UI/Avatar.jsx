import React from 'react';
import styles from './Avatar.module.css';
import clsx from 'clsx';

export const Avatar = ({ src, alt, fallback, size = 'md', className }) => {
    return (
        <div className={clsx(styles.avatar, styles[size], className)}>
            {src ? (
                <img src={src} alt={alt} className={styles.img} />
            ) : (
                <span className={styles.fallback}>{fallback || alt?.[0] || '?'}</span>
            )}
        </div>
    );
};
