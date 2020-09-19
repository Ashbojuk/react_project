import React, { PureComponent } from 'react';
import { Button, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import styles from './task.module.css';
import PropTypes from 'prop-types';

class Task extends PureComponent {

    state = {
        checked: false,

    };

    toggleCheckbox = () => {
        this.setState({
            checked: !this.state.checked
        });
        this.props.onCheck();
    };

    render() {
        const { data, onRemove, onEdit } = this.props;
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
                        className='m-1'
                        variant="info"
                        size="sm"
                        onClick={onEdit}
                    >
                        <FontAwesomeIcon icon={faEdit} />
                    </Button>
                    <Button
                        variant="danger"
                        size="sm"
                        onClick={onRemove(data.id)}>
                        <FontAwesomeIcon
                            icon={faTrash}
                        />
                    </Button>

                </Card.Body>
            </Card>
        );
    }
}
Task.propTypes = {
    data: PropTypes.object,
    onRemove: PropTypes.func,
    onCheck: PropTypes.func,
    onEdit: PropTypes.func,
};
export default Task;
