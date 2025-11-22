import React from 'react';
import { motion } from 'framer-motion';
import styles from './Card.module.css';
import clsx from 'clsx';

export const Card = ({ children, className, hover = false, ...props }) => {
    return (
        <motion.div
            whileHover={hover ? { y: -4 } : {}}
            className={clsx(styles.card, className)}
            {...props}
        >
            {children}
        </motion.div>
    );
};
