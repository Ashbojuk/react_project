import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import {Link} from 'react-router-dom';

export default function NavMenu() {
    return (
        <Navbar bg="light" variant="dark">
            <Navbar.Brand>
            <Link to='/'>Home</Link>
            </Navbar.Brand>
            <Nav className="mr-auto">
                <Link to='/about'>About</Link>
                <Link to='/contact'>Contact</Link>
            </Nav>
        </Navbar>
    );
}