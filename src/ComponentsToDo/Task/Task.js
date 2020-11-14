import React, { PureComponent } from 'react';
import { Button, Card, Tooltip, OverlayTrigger } from 'react-bootstrap';
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
        const { data, onRemove, onEdit, disabled } = this.props;
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
                        {data.title}
                    </Card.Title>
                    <Card.Text>
                        Description: {data.description}
                    </Card.Text>
                    <Card.Text>
                        Date: {data.date ? data.date.slice(0, 10) : 'none'}
                    </Card.Text>
                    <Button
                        title='Edit'
                        className='m-1 float-right'
                        variant="info"
                        size="sm"
                        onClick={onEdit}
                        disabled={disabled}
                    >
                        <FontAwesomeIcon icon={faEdit} />
                    </Button>
                    <Button
                        title='Remove'
                        className='m-1 float-right'
                        variant="danger"
                        size="sm"
                        disabled={disabled}
                        onClick={onRemove(data._id)}
                        
                        >
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
    disabled: PropTypes.bool.isRequired,
};
export default Task;
