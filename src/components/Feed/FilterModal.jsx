import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import styles from './FilterModal.module.css';

export const FilterModal = ({ isOpen, onClose, currentFilters, onApply }) => {
    const [filters, setFilters] = useState(currentFilters);

    const handleApply = () => {
        onApply(filters);
        onClose();
    };

    const handleReset = () => {
        const resetFilters = { sortBy: 'nearest', distance: 'all', date: 'any' };
        setFilters(resetFilters);
        onApply(resetFilters);
        onClose();
    };

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
                            initial={{ y: '100%' }}
                            animate={{ y: 0 }}
                            exit={{ y: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className={styles.header}>
                                <h3 className={styles.title}>Filters</h3>
                                <button className={styles.closeBtn} onClick={onClose}>
                                    <X size={20} />
                                </button>
                            </div>

                            <div className={styles.section}>
                                <div className={styles.sectionTitle}>Sort By</div>
                                <div className={styles.options}>
                                    {['Nearest', 'Earliest', 'Popular'].map(opt => (
                                        <button
                                            key={opt}
                                            className={`${styles.optionBtn} ${filters.sortBy === opt.toLowerCase() ? styles.active : ''}`}
                                            onClick={() => setFilters({ ...filters, sortBy: opt.toLowerCase() })}
                                        >
                                            {opt}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className={styles.section}>
                                <div className={styles.sectionTitle}>Distance</div>
                                <div className={styles.options}>
                                    {['All', '< 1km', '< 5km', '< 10km'].map(opt => (
                                        <button
                                            key={opt}
                                            className={`${styles.optionBtn} ${filters.distance === opt.toLowerCase() ? styles.active : ''}`}
                                            onClick={() => setFilters({ ...filters, distance: opt.toLowerCase() })}
                                        >
                                            {opt}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className={styles.section}>
                                <div className={styles.sectionTitle}>Date</div>
                                <div className={styles.options}>
                                    {['Any', 'Today', 'Tomorrow', 'This Week'].map(opt => (
                                        <button
                                            key={opt}
                                            className={`${styles.optionBtn} ${filters.date === opt.toLowerCase() ? styles.active : ''}`}
                                            onClick={() => setFilters({ ...filters, date: opt.toLowerCase() })}
                                        >
                                            {opt}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className={styles.actions}>
                                <button className={styles.resetBtn} onClick={handleReset}>Reset</button>
                                <button className={styles.applyBtn} onClick={handleApply}>Apply Filters</button>
                            </div>
                        </motion.div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};
