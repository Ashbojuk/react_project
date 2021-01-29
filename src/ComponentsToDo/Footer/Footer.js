import React from 'react';
import { Card } from 'react-bootstrap';
import styles from './footer.module.css';
import { FaLinkedin, FaGithub } from 'react-icons/fa';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <Card.Footer className="text-center">
                <span className={styles.linkedLink}>
                    <span className='pr-1'>
                        <FaLinkedin />
                    </span>
                    <a href='https://www.linkedin.com/in/ashkhen-bojukyan-6a5874204'> Linkedin</a>
                </span>
                <span>
                    <span className='pr-1'>
                        <FaGithub />
                    </span>
                    <a href='https://github.com/AshkhenBojukyan'>Github</a>
                </span>
            </Card.Footer>
        </footer>
    );
}