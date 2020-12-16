import React from 'react';
import { Navbar } from 'react-bootstrap';
import {NavLink} from 'react-router-dom';
import styles from './NavMenu.module.css';

export default function NavMenu() {
    return (
        <Navbar bg="light" variant="dark">
            <Navbar.Brand>
            <NavLink 
            to='/'
            activeClassName={styles.isActive}
            exact
            >
            Home
            </NavLink>
            </Navbar.Brand>
        </Navbar>
    );
}