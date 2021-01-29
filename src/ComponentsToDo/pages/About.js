import React from 'react';
import styles from './pages.module.css';

export default function About() {
    return (

        <div className={styles.about}>
            <h1 className={styles.titleAbout}>ABOUT</h1>
            <h3 className='text-center'>Todo List</h3>
            <p className='text-center pt-4 h5'>The site was created during the ReactJs educational program.</p>
            <p className='text-center h5' > It will help you stay organised.It’s a list of tasks you need to complete, or things that you want to do. </p>
            <p className='text-center h5'>It’s easy to use. </p>
        </div>

    );
}