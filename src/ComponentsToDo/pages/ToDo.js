import React, { Component } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import NewTask from '../NewTask/NewTask';
import Task from '../Task/Task';
import Confirm from '../Confirm';
import EditTaskModal from '../EditTaskModal';
import {connect} from 'react-redux';
import {getTasks, removeTasks} from '../../store/actions';

class ToDo extends Component {

    state = {
        checkedTasks: new Set(),
        showConfirm: false,
        editTask: null,
        openNewTaskModal: false
    };

    componentDidMount() {
        this.props.getTasks();
    }

    componentDidUpdate(prevProps){
        if(!prevProps.addTaskSuccess && this.props.addTaskSuccess){
            this.setState({
                openNewTaskModal: false
            });
        }
        if(!prevProps.removeTasksSuccess && this.props.removeTasksSuccess){
            this.setState({
                showConfirm: false,
                checkedTasks: new Set()
            });
        }
        if(!prevProps.editTaskSuccess && this.props.editTaskSuccess){
            this.setState({ editTask: null });
        }
    }


    handleCheck = (taskId) => () => {
        const checkedTasks = new Set(this.state.checkedTasks);
        if (checkedTasks.has(taskId)) {
            checkedTasks.delete(taskId);
        }
        else {
            checkedTasks.add(taskId);
        }
        this.setState({
            checkedTasks
        });
    };

    handleEdit = (task) => () => {
        this.setState({
            editTask: task
        });
    };

    onRemoveSelected = () => {
        const checkedTasks = [...this.state.checkedTasks];
        this.props.removeTasks({
             tasks: checkedTasks
        });
    };

    toggleConfirm = () => {
        this.setState({
            showConfirm: !this.state.showConfirm
        });
    };


    toggleNewTaskModal = () => {
        const { openNewTaskModal } = this.state;
        this.setState({
            openNewTaskModal: !openNewTaskModal
        });

    };

    render() {
        const { checkedTasks, showConfirm, editTask, openNewTaskModal } = this.state;
        const {tasks} = this.props;
        const tasksComponents = tasks.map((task) =>

            <Col
                key={task._id}
                xs={12} sm={6} md={4} lg={3} xl={2}
            >

                <Task
                    data={task}
                    onCheck={this.handleCheck(task._id)}
                    onEdit={this.handleEdit(task)}
                    disabled={!!checkedTasks.size}
                />
            </Col>
        );
        return (
            <Container fluid>
                <Row >

                    <Col md={{ span: 6, offset: 3 }}
                        className="text-center"
                    >
                        <Button
                            className='m-3'
                            variant="primary"
                            disabled={checkedTasks.size}
                            onClick={this.toggleNewTaskModal}
                        >
                            Add new task
                </Button>


                        <Button
                            variant="danger"
                            disabled={checkedTasks.size ? false : true}
                            onClick={this.toggleConfirm}
                        >
                            Remove Selected
                </Button>

                    </Col>

                </Row>

                <Row>

                    {tasksComponents}

                </Row>

                { showConfirm &&
                    <Confirm
                        count={checkedTasks.size}
                        onSubmit={this.onRemoveSelected}
                        onCancel={this.toggleConfirm}
                    />
                }
                { !!editTask &&
                    <EditTaskModal
                        data={editTask}
                        onSave={this.handleSave}
                        onCancel={this.handleEdit(null)}
                    />
                }
                {openNewTaskModal &&
                    <NewTask
                        // onAdd={this.addTask}
                        onCancel={this.toggleNewTaskModal}
                    />
                }

            </Container>
        );
    }

}

const mapStateToProps = (state)=>{
    return {
       tasks: state.tasks,
       addTaskSuccess: state.addTaskSuccess,
       removeTasksSuccess: state.removeTasksSuccess,
       editTaskSuccess: state.editTaskSuccess
    };
   };

   const mapDispatchToProps = {
    getTasks,
    removeTasks
};

export default connect(mapStateToProps, mapDispatchToProps)(ToDo); 

