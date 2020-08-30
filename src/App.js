import React from 'react';
import ReactDom from 'react-dom';
import logo from './logo.svg';
import './index.css';
import './App.css';
import Hello from './home_demo/Hello';
import {Name} from './home_demo/Name.jsx';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <Hello code='JSX'/>
        <Name name='Ashkhen'/>
      </header>
    </div>
  );
}

export default App;
