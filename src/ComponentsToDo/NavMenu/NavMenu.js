import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import {NavLink} from 'react-router-dom';
import styles from './NavMenu.module.css';

export default function NavMenu() {
    return (
        <Navbar bg="light" variant="dark">
            <Navbar.Brand>
            <NavLink 
            // className={styles.navStyle}
            to='/'
            activeClassName={styles.isActive}
            exact
            >
            Home
            </NavLink>
            </Navbar.Brand>
            <Nav className="mr-auto">
                <NavLink 
                // className={styles.navStyle}
                // style={{textDecoration:'none',color:'yellow'}}
                to='/task'
                activeClassName={styles.isActive}
                exact
                >
                Task
                </NavLink>
                {/* <NavLink 
                // className={styles.navStyle}
                to='/contact'
                activeClassName={styles.isActive}
                exact
                >
                Contact
                </NavLink> */}
            </Nav>
        </Navbar>
    );
}