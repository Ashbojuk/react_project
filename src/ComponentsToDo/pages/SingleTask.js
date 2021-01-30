import React, { PureComponent } from 'react';
import styles from './pages.module.css';
import { Button, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit, faCheck, faHistory } from '@fortawesome/free-solid-svg-icons';
import EditTaskModal from '../EditTaskModal';
import { formatDate } from '../../helpers/utils';
import { getTask, removeTask, changeTaskStatus } from '../../store/taskActions';
import { connect } from 'react-redux';

class SingleTask extends PureComponent {
    state = {
        isEdit: false,

    };

    componentDidMount() {
        const taskId = this.props.match.params.id;
        this.props.getTask(taskId);
    }

    componentDidUpdate(prevProps) {

        if (!prevProps.editTaskSuccess && this.props.editTaskSuccess) {
            this.toggleEditModal();
        }
    }

    handleRemove = () => {
        const taskId = this.props.task._id;
        this.props.removeTask(taskId, 'single');
    }

    toggleEditModal = () => {
        const { isEdit } = this.state;
        this.setState({
            isEdit: !isEdit
        });
    }

    handleChangeStatus = () => {
        const taskId = this.props.task._id,
            { task } = this.props;
        if (task.status === 'active') {
            this.props.changeTaskStatus(taskId, { status: 'done' }, 'single');
        }
        else {
            this.props.changeTaskStatus(taskId, { status: 'active' }, 'single');
        }
    }
    render() {
        const { isEdit } = this.state,
            { task, disabled } = this.props;

        return (
            <>
                {
                    task ?
                        <div className={styles.singleTask}>
                            <Card.Body >
                                <Card.Title className={styles.titleSingleTask} >
                                    {task.title}
                                </Card.Title>
                                <Card.Text className={styles.description}>
                                    Description: {task.description}
                                </Card.Text>
                                <Card.Text>
                                    Date: {formatDate(task.date)}
                                </Card.Text>
                                <Card.Text>
                                    Created: {formatDate(task.created_at)}
                                </Card.Text>
                                <Card.Text>
                                    Status: {task.status}
                                </Card.Text>

                                {
                                    task.status === 'active' ?
                                        <Button
                                            title='Mark as done'
                                            className='m-1 '
                                            variant="success"
                                            size="lg"
                                            onClick={this.handleChangeStatus}
                                            disabled={disabled}
                                        >
                                            <FontAwesomeIcon icon={faCheck} />
                                        </Button>
                                        :
                                        <Button
                                            title='Mark as active'
                                            className='m-1 '
                                            variant="warning"
                                            size="lg"
                                            onClick={this.handleChangeStatus}
                                            disabled={disabled}
                                        >
                                            <FontAwesomeIcon icon={faHistory} />
                                        </Button>
                                }


                                <Button
                                    title='Edit'
                                    className='m-1 '
                                    variant="info"
                                    size="lg"
                                    onClick={this.toggleEditModal}
                                >
                                    <FontAwesomeIcon icon={faEdit} />
                                </Button>

                                <Button
                                    title='Remove'
                                    className='m-1 '
                                    variant="danger"
                                    size="lg"
                                    onClick={this.handleRemove}

                                >
                                    <FontAwesomeIcon
                                        icon={faTrash}
                                    />
                                </Button>
                            </Card.Body>

                            {
                                isEdit &&
                                <EditTaskModal
                                    data={task}
                                    onCancel={this.toggleEditModal}
                                    from='single'
                                />
                            }
                        </div> :
                        <div>There is no task!</div>
                }
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        task: state.taskReducer.task,
        editTaskSuccess: state.taskReducer.editTaskSuccess,
    }
};

const mapDispatchToProps = {
    getTask,
    removeTask,
    changeTaskStatus
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleTask);
