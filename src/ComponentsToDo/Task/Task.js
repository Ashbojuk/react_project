import React, { PureComponent } from 'react';
import { Button, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import styles from './task.module.css';

class Task extends PureComponent {

    state = {
        checked: false
    };

    toggleCheckbox = () => {
        this.setState({
            checked: !this.state.checked
        });
        this.props.onCheck();
    };

    render() {
        const { data } = this.props;
        const { checked } = this.state;
        return (
            <Card className={`card ${styles.task} ${checked ? styles.checked : ''}`}>

                <Card.Body>
                    <input
                        type='checkbox'
                        className={styles.checkbox}
                        onClick={this.toggleCheckbox}
                    />
                    <Card.Title>
                        Task
                    </Card.Title>
                    <Card.Text>
                        {data.text}
                    </Card.Text>
                    <Button
                        variant="danger"
                        size="sm"
                        onClick={this.props.onRemove(data.id)}>
                        <FontAwesomeIcon
                            icon={faTrash}
                        />
                    </Button>
                </Card.Body>
            </Card>
        );
    }
}

export default Task;
