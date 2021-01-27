import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { register } from '../../../store/userActions';
import styles from './registerStyle.module.css';
import { Link } from 'react-router-dom';


function Register(props) {

    const [values, setValues] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        name: '',
        surname: ''
    });

    const [errors, setErrors] = useState({
        email: null,
        password: null,
        confirmPassword: null,
        name: null,
        surname: null
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
        const { email, password, confirmPassword, name, surname } = values;

        let passwordMessage = null;
        if (!password && !confirmPassword) {
            passwordMessage = 'Password is required';
        }
        if (password && !confirmPassword) {
            passwordMessage = 'Please confirm password';
        }
        else if (password !== confirmPassword) {
            passwordMessage = "Passwords didn't match";
        }

        setErrors({
            email: !email ? 'Email is required' : email.includes('@') ? null : 'Please write email',
            confirmPassword: passwordMessage,
            password: !password ? 'Password is required' : password.length >= 6 ? null : 'Password should not be shorter than 6 character',
            name: name ? null : 'Name is required',
            surname: surname ? null : 'Surname is required'
        });
        if ((email && email.includes('@')) && confirmPassword && password && name && surname && (confirmPassword === password)) {
            props.register(values);
        }

    };
   

    return (
        <div className={styles.main}>
            <Container>
                <Row className="justify-content-center">
                    <Col xs={12} sm={8} md={6}>
                        <Form>
                            <h3 className={styles.heading}>Register</h3>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Control
                                    className={errors.name ? styles.invalid : ''}
                                    type="text"
                                    placeholder="Enter your name"
                                    name="name"
                                    value={values.name}
                                    onChange={handleChange}
                                />
                                {
                                    <Form.Text className="text-danger">
                                        {errors.name}
                                    </Form.Text>
                                }
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Control
                                    className={errors.surname ? styles.invalid : ''}
                                    type="text"
                                    placeholder="Enter your surname"
                                    name="surname"
                                    value={values.surname}
                                    onChange={handleChange}
                                />
                                {
                                    <Form.Text className="text-danger">
                                        {errors.surname}
                                    </Form.Text>
                                }
                            </Form.Group>

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

                            <Form.Group>
                                <Form.Control
                                    className={errors.confirmPassword ? styles.invalid : ''}
                                    type="password"
                                    placeholder="confirmPassword"
                                    name="confirmPassword"
                                    value={values.confirmPassword}
                                    onChange={handleChange}
                                />
                                {
                                    <Form.Text className="text-danger">
                                        {errors.confirmPassword}
                                    </Form.Text>
                                }
                            </Form.Group>
                            <div className={styles.submitContainer}>
                                <Button
                                    variant="primary"
                                    onClick={handleSubmit}
                                >
                                    Register
                                </Button>
                            </div>
                            <div className={styles.loginLink}>
                                <Link to='/login'>Already registered?Try to login.</Link>
                            </div>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}


const mapDispatchToProps = {
    register
}
export default connect(null, mapDispatchToProps)(Register);
