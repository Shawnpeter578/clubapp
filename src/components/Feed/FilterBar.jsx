import React from 'react';
import { Search, Filter } from 'lucide-react';
import styles from './FilterBar.module.css';

export const FilterBar = ({
    searchQuery,
    onSearchChange,
    selectedCategory,
    onCategoryChange,
    showMyEvents,
    onToggleMyEvents
}) => {
    const categories = ['All', 'Fitness', 'Music', 'Tech', 'Sports'];

    return (
        <div className={styles.filterBar}>
            <div className={styles.searchBox}>
                <Search size={18} className={styles.searchIcon} />
                <input
                    type="text"
                    placeholder="Search events..."
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className={styles.searchInput}
                />
            </div>

            <div className={styles.filters}>
                <button
                    className={`${styles.filterBtn} ${showMyEvents ? styles.active : ''}`}
                    onClick={onToggleMyEvents}
                >
                    My Events
                </button>

                <div className={styles.categoryFilters}>
                    {categories.map(cat => (
                        <button
                            key={cat}
                            className={`${styles.categoryBtn} ${selectedCategory === cat ? styles.active : ''}`}
                            onClick={() => onCategoryChange(cat)}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};
