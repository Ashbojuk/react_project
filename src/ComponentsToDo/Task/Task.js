import React, { PureComponent } from 'react';
import { Button, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import styles from './task.module.css';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {formatDate,shortStr} from '../../helpers/utils';
import {removeTask} from '../../store/actions';

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
        const { data, removeTask, onEdit, disabled } = this.props;
        const { checked } = this.state;
        return (
            <Card className={`card ${styles.task} ${checked ? styles.checked : ''}`}>

                <Card.Body>
                    <input
                        type='checkbox'
                        className={styles.checkbox}
                        onClick={this.toggleCheckbox}
                    />
                    {disabled?
                        <Card.Title>
                        {data.title}
                    </Card.Title>:
                    <Link
                    to={`/task/${data._id}`}
                    >
                    <Card.Title>
                        {data.title}
                    </Card.Title>
                    </Link>

                    }
                   
                    <Card.Text>
                        Description: {shortStr(data.description,25)}
                    </Card.Text>
                    <Card.Text>
                        Date: {formatDate(data.date)}
                    </Card.Text>
                    <Card.Text>
                        Created: {formatDate(data.created_at)}
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
                        onClick={()=>removeTask(data._id)}
                        
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
    onCheck: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
};

const mapDispatchToProps = {
    removeTask
};

export default connect(null, mapDispatchToProps)(Task);


