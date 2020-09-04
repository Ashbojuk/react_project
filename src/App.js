import React from 'react';
import ReactDom from 'react-dom';
// import logo from './logo.svg';
import './index.css';
import './App.css';
// import Hello from './home_demo/Hello';
// import {Name} from './home_demo/Name.jsx';
import Product from './home_demo/Product';
// import Price from './home_demo/Price'

function App() {
  return (
    <div className="App">
      <header className="App-header">
       
        {/* <Hello code='JSX'/> */}
        {/* <Name name='Ashkhen'/> */}
        <Product name='bananas' price='2$' description='Fresh bananas'  />
      </header>
    </div>
  );
}

export default App;
