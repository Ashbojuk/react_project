import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import classes from './styleTask.modul.css';

export default function Task(props) {
    const { data } = props;

    return (
        <Card style={{
            width: '18rem',
            height: "18rem",
            backgroundColor: 'rgb(203, 203, 241)',
            textAlign: "center"
        }}

        >
            <Card.Body>
                <Card.Title className="TaskCard">
                    Task
                    </Card.Title>
                <Card.Text>
                    {data.text}
                </Card.Text>
                <Button className="TaskButton"
                variant="danger"
                    size="sm"
                    onClick={props.onRemove(data.id)}>
                    <FontAwesomeIcon className="TaskIcon"
                    icon={faTrash}
                    />
                </Button>
            </Card.Body>
        </Card>
    );
}
