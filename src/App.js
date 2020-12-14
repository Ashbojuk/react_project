import React,{PureComponent} from 'react';
import './index.css';
import './App.css';
import ToDo from './ComponentsToDo/pages/ToDo';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import NotFound from './ComponentsToDo/pages/NotFound';
import NavMenu from './ComponentsToDo/NavMenu/NavMenu';
import SingleTask from './ComponentsToDo/pages/SingleTask';
import Spinner from './ComponentsToDo/Spinner/Spinner';
import { Route, Switch, Redirect } from 'react-router-dom';
import {ToastContainer,toast} from 'react-toastify';
import {connect} from 'react-redux';

class App extends PureComponent {
  componentDidUpdate(){
    const { errorMessage, successMessage } = this.props;
    
    if (successMessage) {
      toast.success(successMessage);
    }
    if (errorMessage) {
      toast.error(errorMessage);
    }

  }
  
 render(){
   const {showSpinner}=this.props;
  
  return (
    <>
      <div className='app'>
      <NavMenu />
      <Switch>
        <Route path='/' exact component={ToDo} />
        <Route path='/task/:id' exact component={SingleTask} />
        <Route path='/not-found' exact component={NotFound} />
        <Redirect to='/not-found' />
      </Switch>

      <ToastContainer
position="bottom-left"
autoClose={3000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
/>
    </div>
    {showSpinner&&<Spinner/>}
</>
  );
 }
}

 const mapStateToProps=(state)=>{
  return {
    errorMessage:state.error,
    successMessage:state.successMessage,
    showSpinner:state.loading,
  }
 };
export default connect(mapStateToProps,null)(App);
