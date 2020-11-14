import React from 'react';
import './index.css';
import './App.css';
import ToDo from './ComponentsToDo/pages/ToDo';
import 'bootstrap/dist/css/bootstrap.min.css';
import NotFound from './ComponentsToDo/pages/NotFound';
import { Route, Switch, Redirect } from 'react-router-dom';
import NavMenu from './ComponentsToDo/NavMenu';
import Task from './ComponentsToDo/pages/Task';
import About from './ComponentsToDo/pages/About';
import Contact from './ComponentsToDo/pages/Contact';


function App() {
  return (
    <div className='app'>
      <NavMenu />
      <Switch>
        <Route path='/' exact component={ToDo} />
        <Route path='/task' exact component={Task} />
        <Route path='/about' exact component={About} />
        <Route path='/contact' exact component={Contact} />
        <Route path='/not-found' exact component={NotFound} />
        <Redirect to='/not-found' />
      </Switch>
    </div>
  );
}

export default App;
