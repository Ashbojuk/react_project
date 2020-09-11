import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import idGenerator from '../helpers/idGenerator';

import NewTask from './NewTask';
import Task from './Task';

export default class ToDo extends Component {

    state = {
        tasks: []
    };

    addTask = (inputValue) => {

        const newTask = {
            id: idGenerator(),
            text: inputValue
        };

        const tasks = [newTask, ...this.state.tasks];

        this.setState({
            tasks,
        });

    };


    removeTask = (taskId) => () => {
        const newTasks = this.state.tasks.filter(task => task.id !== taskId);
        this.setState({
            tasks: newTasks
        });
    };


    render() {

        const tasksComponents = this.state.tasks.map(task =>

            <Col
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    marginBottom: "20px"
                }}
                key={task.id}>

                <Task
                    data={task}
                    onRemove={this.removeTask}
                />
            </Col>
        );


        return (
            <Container fluid>
                <Row >

                    <Col md={{ span: 6, offset: 3 }}>
                        <NewTask
                            onAdd={this.addTask} />
                    </Col>

                </Row>


                <Row>

                    {tasksComponents}

                </Row>

            </Container>
        );
    }

}

