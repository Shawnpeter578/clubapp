import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, ArrowRight } from 'lucide-react';
import { Button } from '../UI/Button';
import { Input } from '../UI/Input';
import styles from './SignInModal.module.css';

export const SignInModal = ({ isOpen, onClose, onLogin }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Mock login
        onLogin({ name: 'Shawn', email, avatar: null });
        onClose();
    };

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
                <>
                    <motion.div
                        className={styles.backdrop}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                    >
                        <motion.div
                            className={styles.modal}
                            initial={{ opacity: 0, y: 100, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 100, scale: 0.95 }}
                            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button className={styles.closeBtn} onClick={onClose}>
                                <X size={20} />
                            </button>

                            <div className={styles.header}>
                                <h2 className={styles.title}>
                                    {isLogin ? 'Welcome back' : 'Create account'}
                                </h2>
                                <p className={styles.subtitle}>
                                    {isLogin
                                        ? 'Enter your details to access your account'
                                        : 'Join the community and start exploring'}
                                </p>
                            </div>

                            <form onSubmit={handleSubmit} className={styles.form}>
                                <Input
                                    icon={Mail}
                                    placeholder="Email address"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                                <Input
                                    icon={Lock}
                                    placeholder="Password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />

                                <Button type="submit" className={styles.submitBtn}>
                                    {isLogin ? 'Sign In' : 'Sign Up'}
                                    <ArrowRight size={18} />
                                </Button>
                            </form>

                            <div className={styles.footer}>
                                <span>
                                    {isLogin ? "Don't have an account? " : "Already have an account? "}
                                </span>
                                <button
                                    className={styles.switchBtn}
                                    onClick={() => setIsLogin(!isLogin)}
                                >
                                    {isLogin ? 'Sign up' : 'Log in'}
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};
