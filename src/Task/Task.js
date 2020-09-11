import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';


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
                <Card.Title
                    style={{
                        marginBottom: "50px",
                        marginTop: "10px"
                    }}
                >
                    Task
                    </Card.Title>
                <Card.Text>
                    {data.text}
                </Card.Text>
                <Button variant="danger"
                    size="sm"
                    style={{
                        position: "absolute",
                        top: "15rem"
                    }}
                    onClick={props.onRemove(data.id)}>
                    <FontAwesomeIcon icon={faTrash}
                        color="black"
                    />
                </Button>
            </Card.Body>
        </Card>
    );
}
