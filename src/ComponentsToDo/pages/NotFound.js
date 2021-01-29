import React from 'react';
import styles from './pages.module.css';

export default function NotFound() {
    return (
        <div className={styles.notFound}>
            <h1>404</h1>
            <p> Oops!Page not found</p>
        </div>
    );
}