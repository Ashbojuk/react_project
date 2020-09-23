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
        const { data, onRemove, onEdit,disabled } = this.props;
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
                        disabled={disabled}
                    >
                        <FontAwesomeIcon icon={faEdit} />
                    </Button>
                    <Button
                        variant="danger"
                        size="sm"
                        disabled={disabled}
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
    onRemove: PropTypes.func.isRequired,
    onCheck: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired,
};
export default Task;
