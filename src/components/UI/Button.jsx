import React from 'react';
import { motion } from 'framer-motion';
import styles from './Button.module.css';
import clsx from 'clsx';

export const Button = ({ 
  children, 
  variant = 'primary', 
  className, 
  icon: Icon,
  ...props 
}) => {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={clsx(styles.btn, styles[variant], className)}
      {...props}
    >
      {Icon && <Icon size={18} className={styles.icon} />}
      {children}
    </motion.button>
  );
};
