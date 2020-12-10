import React,{PureComponent} from 'react';
import styles from './pages.module.css';
import Spinner from '../Spinner/Spinner';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import EditTaskModal from '../EditTaskModal';

export default class SingleTask extends PureComponent {
    state = {
        task: null,
        isEdit: false
    };
 
     componentDidMount(){
         const taskId = this.props.match.params.id;
 
         fetch(`http://localhost:3001/task/${taskId}`, {
             method: 'GET',
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
                         task
                     });
 
             })
             .catch((err) => {
                 console.log('err', err);
             });
 
 
     }

     handleRemove=()=>{
        const taskId = this.state.task._id;

        fetch(`http://localhost:3001/task/${taskId}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": 'application/json',
            }
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.error) {
                    throw data.error;
                }

               this.props.history.push('/');

            })
            .catch((err) => {
                console.log('err', err);
            });
     }

     toggleEditModal=()=>{
         const {isEdit}=this.state;
         this.setState({
            isEdit:!isEdit
         });
     }

     handleSave = (taskId, data) => {
         const {isEdit}=this.state;
        fetch(`http://localhost:3001/task/${taskId}`, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
                "Content-Type": 'application/json',
            }
        })
            .then((response) => response.json())
            .then((editedTask) => {

               
                this.setState({ 
                    task:editedTask,
                    isEdit:!isEdit
                });
            })
            .catch((err) => {
                console.log('err', err);
            });
    }

    render(){
        const {task,isEdit}=this.state;
    return (
        <>
        {
            task?
            <div className={styles.pages}>
            <p>Title:{task.title}</p>
            <p>Description:{task.description}</p>
            <p>Date:{task.date.slice(0,10)}</p>
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
                    {
                        isEdit && 
                        <EditTaskModal 
                            data={task}
                            onSave={this.handleSave}
                            onCancel={this.toggleEditModal}
                        />
                    }
            </div>:
            <Spinner/>
        }
        </>
    );
}
}