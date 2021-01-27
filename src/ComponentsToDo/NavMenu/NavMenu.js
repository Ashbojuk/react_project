import React, { useEffect } from 'react';
import { Navbar, Button,Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../store/userActions';
import styles from './NavMenu.module.css';
import { getUserInfo } from '../../store/userActions';

function NavMenu({ isAuthenticated, logout, getUserInfo, user }) {
    useEffect(() => {
        if (isAuthenticated) {
            getUserInfo();
        }
    }, [getUserInfo, isAuthenticated]);

    return (
        <>

            <Navbar bg="light" variant="dark">

                {isAuthenticated ?
                    <Navbar.Brand>
                        <NavLink
                            to='/'
                            activeClassName={styles.isActive}
                            exact
                        >
                            Home
            </NavLink>
                    </Navbar.Brand> :
                    <>
                        <NavLink
                            to='/register'
                            className={styles.register}
                            activeClassName={styles.isActive}
                            exact
                        >
                            Register
            </NavLink>
                        <NavLink
                            className={styles.login}
                            to='/login'
                            activeClassName={styles.isActive}
                            exact
                        >
                            Login
            </NavLink>

                    </>
                }
                <Nav className="mr-auto">
            <NavLink 
            to='/about'
            className={styles.about}
            activeClassName={styles.isActive}
            exact
            >
             About
             </NavLink>                
             <NavLink 
             to='/contact'
             className={styles.about}
             activeClassName={styles.isActive}
             exact
             >
              Contact
              </NavLink>
            </Nav>

                {isAuthenticated &&
                    <>
                    <span className={styles.logout}>
                        <Button
                            variant='primary'
                            onClick={logout}
                        >
                            Logout
            </Button>
            </span>
                        {user && <div className='text-right'>{user.name}{user.surname}</div>}
                    </>}
            </Navbar>
        </>
    );
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.authReducer.isAuthenticated,
        user: state.authReducer.userInfo
    };
};

const mapDispatchToProps = {
    logout,
    getUserInfo
};

export default connect(mapStateToProps, mapDispatchToProps)(NavMenu);