import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { login } from '../../../store/userActions';
import { Link } from 'react-router-dom';
import styles from '../Login/loginStyle.module.css';

function Login(props) {
    const [values, setValues] = useState({
        email: '',
        password: ''
    });

    const [errors, setErrors] = useState({
        email: null,
        password: null,
    });

    const handleChange = ({ target: { name, value } }) => {
        setValues({
            ...values,
            [name]: value
        });
        setErrors({
            ...errors,
            [name]: null
        });
    };

    const handleSubmit = () => {
        const { email, password } = values;
        setErrors({
            email: !email ? 'Email is required' : null,
            password: !password ? 'Password is required' : null
        });
        if (email && password) {
            props.login(values);
        }
    };
    return (
        <div className={styles.main}>
            <Container>
                <Row className="justify-content-center">
                    <Col xs={12} sm={8} md={6}>
                        <Form>
                            <h3 className={styles.heading}>Login</h3>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Control
                                    className={errors.email ? styles.invalid : ''}
                                    type="email"
                                    placeholder="Enter email"
                                    name="email"
                                    value={values.email}
                                    onChange={handleChange}
                                />
                                {
                                    <Form.Text className="text-danger">
                                        {errors.email}
                                    </Form.Text>
                                }

                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Control
                                    className={errors.password ? styles.invalid : ''}
                                    type="password"
                                    placeholder="Password"
                                    name="password"
                                    value={values.password}
                                    onChange={handleChange}
                                />
                                {
                                    <Form.Text className="text-danger">
                                        {errors.password}
                                    </Form.Text>
                                }
                            </Form.Group>
                            <div className={styles.submitContainer}>
                                <Button
                                    variant="primary"
                                    onClick={handleSubmit}
                                >
                                    Login
                                </Button>
                            </div>
                            <div className={styles.registerLink}>
                                <Link
                                    variant="text-danger"
                                    to='/register'
                                >
                                    Don't have account yet?Register now.
                            </Link>
                            </div>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}



const mapDispatchToProps = {
    login
}

export default connect(null, mapDispatchToProps)(Login);