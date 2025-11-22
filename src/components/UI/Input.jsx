import React from 'react';
import styles from './Input.module.css';
import clsx from 'clsx';

export const Input = ({
    label,
    error,
    className,
    icon: Icon,
    ...props
}) => {
    return (
        <div className={clsx(styles.wrapper, className)}>
            {label && <label className={styles.label}>{label}</label>}
            <div className={styles.inputGroup}>
                {Icon && <Icon size={18} className={styles.icon} />}
                <input className={styles.input} {...props} />
            </div>
            {error && <span className={styles.error}>{error}</span>}
        </div>
    );
};
