import React, { Component } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import NewTask from '../NewTask';
import Task from '../Task/Task';
import Confirm from '../Confirm';
import Modal from '../Modal';

export default class ToDo extends Component {

    state = {
        tasks: [],
        checkedTasks: [],
        showConfirm: false,
        editTask: null,
        openNewTaskModal: false
    };

    componentDidMount() {
        fetch('http://localhost:3001/task', {
            method: 'GET',
            headers: {
                "Content-Type": 'application/json',
            }
        })
            .then((response) => response.json())
            .then((tasks) => {
                if (tasks.error) {
                    throw tasks.error;
                }
                this.setState({
                    tasks
                });
            })
            .catch((err) => {
                console.log('err', err);
            });
    }

    addTask = (inputValue) => {

        const data = {
            title: inputValue
        };

        fetch('http://localhost:3001/task', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                "Content-Type": 'application/json',
            }
        })
            .then((response) => response.json())
            .then((task) => {
                if (task.error) {
                    throw task.error;
                }
                this.setState({
                    tasks: [task, ...this.state.tasks],
                    openNewTaskModal: false
                });
            })
            .catch((err) => {
                console.log('err', err);
            });
    };

    removeTask = (taskId) => () => {
        const newTasks = this.state.tasks.filter(task => task._id !== taskId);
        this.setState({
            tasks: newTasks
        });
    };

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
        const checkedTasks = new Set(this.state.checkedTasks);
        let tasks = [...this.state.tasks];
        checkedTasks.forEach(taskId => {
            tasks = tasks.filter(task => task._id !== taskId);
        });
        checkedTasks.clear();
        this.setState({
            tasks,
            checkedTasks,
            showConfirm: false
        });
    };

    toggleConfirm = () => {
        this.setState({
            showConfirm: !this.state.showConfirm
        });
    };

    handleSave = (taskId, value) => {

        const tasks = [...this.state.tasks];
        const taskIndex = tasks.findIndex(task => task.id === taskId);

        tasks[taskIndex] = {
            ...tasks[taskIndex],
            text: value
        };
        this.setState({
            tasks: tasks,
            editTask: null
        })
    };

    toggleNewTaskModal = () => {
        const { openNewTaskModal } = this.state;
        this.setState({
            openNewTaskModal: !openNewTaskModal
        });
    };

    render() {
        const { checkedTasks, showConfirm, editTask, openNewTaskModal } = this.state;
        const tasksComponents = this.state.tasks.map(task =>

            <Col
                key={task._id}
            >

                <Task
                    data={task}
                    onRemove={this.removeTask}
                    onCheck={this.handleCheck(task._id)}
                    onEdit={this.handleEdit(task)}
                    disabled={!!checkedTasks.size}
                />
            </Col>
        );
        return (
            <Container fluid>
                <Row >

                    <Col md={{ span: 6, offset: 3 }}>
                        <Button
                            className='m-3'
                            variant="primary"
                            disabled={checkedTasks.size}
                            onClick={this.toggleNewTaskModal}
                        >
                            Add new task
                </Button>
                    </Col>
                </Row>

                <Row>

                    {tasksComponents}

                </Row>

                <Row className='justify-content-center'>

                    <Button
                        variant="danger"
                        disabled={checkedTasks.size ? false : true}
                        onClick={this.toggleConfirm}
                    >
                        Remove Selected
                </Button>

                </Row>
                { showConfirm &&
                    <Confirm
                        count={checkedTasks.size}
                        onSubmit={this.onRemoveSelected}
                        onCancel={this.toggleConfirm}
                    />
                }
                { !!editTask &&
                    <Modal
                        value={editTask}
                        onSave={this.handleSave}
                        onCancel={this.handleEdit(null)}
                    />
                }
                {openNewTaskModal &&
                    <NewTask
                        onAdd={this.addTask}
                        onCancel={this.toggleNewTaskModal}
                    />
                }

            </Container>
        );
    }

}

