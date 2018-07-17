// React modules
import React, { Component } from 'react';

// Redux modules
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';

// React Router Modules
import { BrowserRouter as Router } from 'react-router-dom';

// Redux files
import { rootReducer } from './redux/reducers/rootReducer';

// Stylesheets
import './css/App.css';


import Homepage from './components/Homepage';

class App extends Component {
  
  render() {

    const store= createStore(rootReducer, applyMiddleware(thunk));
    return (
      <Router>
        <Provider store={store} >
          <Homepage />
        </Provider>
      </Router>
    );
  };
};

export default App;
