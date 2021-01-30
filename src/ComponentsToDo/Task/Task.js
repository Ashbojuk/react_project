import React, { PureComponent } from 'react';
import { Button, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit, faCheck, faHistory } from '@fortawesome/free-solid-svg-icons';
import styles from './task.module.css';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { formatDate, shortStr } from '../../helpers/utils';
import { removeTask, changeTaskStatus } from '../../store/taskActions';

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
        const { data, removeTask, onEdit, disabled, changeTaskStatus } = this.props;
        const { checked } = this.state;
        return (
            <Card className={`card ${styles.task} ${checked ? styles.checked : ''} ${data.status === 'active' ? styles.active : ''}
            ${data.status === 'done' ? styles.done : ''}  `}
            >

                <Card.Body>
                    <input
                        type='checkbox'
                        className={styles.checkbox}
                        onClick={this.toggleCheckbox}
                    />
                    {disabled ?
                        <Card.Title>
                            {data.title}
                        </Card.Title> :
                        <Link
                            to={`/task/${data._id}`}
                        >
                            <Card.Title>
                                {data.title}
                            </Card.Title>
                        </Link>
                    }

                    <Card.Text>
                        Description: {shortStr(data.description, 60)}
                    </Card.Text>
                    <Card.Text>
                        Date: {formatDate(data.date)}
                    </Card.Text>
                    <Card.Text>
                        Created: {formatDate(data.created_at)}
                    </Card.Text>
                    <Card.Text>
                        Status: {data.status}
                    </Card.Text>
                    <Button
                        title='Remove'
                        className='m-1 float-right'
                        variant="danger"
                        size="sm"
                        disabled={disabled}
                        onClick={() => removeTask(data._id)}

                    >
                        <FontAwesomeIcon
                            icon={faTrash}
                        />
                    </Button>

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

                    {
                        data.status === 'active' ?
                            <Button
                                title='Mark as done'
                                className='m-1 float-right'
                                variant="success"
                                size="sm"
                                onClick={() => changeTaskStatus(data._id, { status: 'done' })}
                                disabled={disabled}
                            >
                                <FontAwesomeIcon icon={faCheck} />
                            </Button>
                            :
                            <Button
                                title='Mark as active'
                                className='m-1 float-right'
                                variant="warning"
                                size="sm"
                                onClick={() => changeTaskStatus(data._id, { status: 'active' })}
                                disabled={disabled}
                            >
                                <FontAwesomeIcon icon={faHistory} />
                            </Button>
                    }

                </Card.Body>
            </Card>
        );
    }
}
Task.propTypes = {
    data: PropTypes.object,
    onCheck: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
    changeTaskStatus: PropTypes.func.isRequired
};

const mapDispatchToProps = {
    removeTask,
    changeTaskStatus
};

export default connect(null, mapDispatchToProps)(Task);


