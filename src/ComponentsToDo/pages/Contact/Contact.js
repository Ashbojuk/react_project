import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import styles from '../Contact/contactStyles.module.css';
import checkEmailAddres from '../../../helpers/checkEmail';
import {contact} from '../../../store/userActions';

function Contact(props) {

    const [values, setValues] = useState({
        email: '',
        name: '',
        surname: '',
        message: ''
    });

    const [errors, setErrors] = useState({
        email: null,
        name: null,
        surname: null,
        message: null
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
        const { email, message, name, surname } = values;
        setErrors({
            name: name ? null : 'Name is required',
            surname: surname ? null : 'Surname is required',
            email: !email ? 'Email is required' : checkEmailAddres(email) ? null : 'Please write email',
            message: !message ? 'Message is required' : null,
        });
        if (name && surname && email && checkEmailAddres(email) && message) {
            props.contact(values);
        };
    };

    return (
        <div className={styles.main}>
            <Container>
                <Row className="justify-content-center">
                    <Col xs={12} sm={8} md={6}>
                        <Form>
                            <h3 className={styles.heading}>Contact Us</h3>
                            <Form.Group >
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
                            <Form.Group >
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
                            <Form.Group>
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


                            <Form.Group >
                                <Form.Label>Enter your message</Form.Label>
                                <Form.Control
                                    className={errors.message ? styles.invalid : ''}
                                    name="message"
                                    value={values.message}
                                    as="textarea"
                                    onChange={handleChange}
                                    rows={3}
                                />
                                {
                                    <Form.Text className="text-danger">
                                        {errors.message}
                                    </Form.Text>
                                }
                            </Form.Group>
                            <div className={styles.submitContainer}>
                            <Button 
                                variant="primary"
                                onClick={handleSubmit}
                            >
                                Send
        </Button>
        </div>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

const mapDispatchToProps={
    contact
}

export default connect(null,mapDispatchToProps)(Contact);