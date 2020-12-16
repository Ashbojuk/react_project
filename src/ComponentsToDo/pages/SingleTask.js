import React,{PureComponent} from 'react';
import styles from './pages.module.css';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import EditTaskModal from '../EditTaskModal';
import {formatDate} from '../../helpers/utils';
import {getTask,removeTask} from '../../store/actions';
import { connect } from 'react-redux';

class SingleTask extends PureComponent {
    state = {
        isEdit: false
    };
 
     componentDidMount(){
         const taskId = this.props.match.params.id;
        this.props.getTask(taskId);
     }

     componentDidUpdate(prevProps){

         if(!prevProps.removeTaskSuccess&&this.props.removeTaskSuccess){
             this.props.history.push('/');
         }

         if(!prevProps.editTaskSuccess&&this.props.editTaskSuccess){
             this.toggleEditModal();
         }
     }

     handleRemove=()=>{
        const taskId = this.props.task._id;
        this.props.removeTask(taskId,'single');
     }

     toggleEditModal=()=>{
         const {isEdit}=this.state;
         this.setState({
            isEdit:!isEdit
         });
     }

    render(){
        const {isEdit}=this.state,
              {task}=this.props;  
        
    return (
        <>
        {
            task?
            <div className={styles.pages}>
            <p>Title:{task.title}</p>
            <p>Description:{task.description}</p>
            <p>Date:{formatDate(task.date)}</p>
            <p>Created: {formatDate(task.created_at)}</p>
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
                            onCancel={this.toggleEditModal}
                            from='single'
                        />
                    }
            </div>:
            <div>There is no task!</div>
        }
        </>
    );
}
}
const mapStateToProps=(state)=>{
    return {
        task:state.task,
        removeTaskSuccess:state.removeTaskSuccess,
        editTaskSuccess:state.editTaskSuccess
    }
};

const mapDispatchToProps={
    getTask,
    removeTask
};

export default connect(mapStateToProps,mapDispatchToProps)(SingleTask);