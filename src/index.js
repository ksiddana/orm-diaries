import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';

import reducers from './reducers';
import Routes from './routes';

import Login from './components/login/login';
import SignUp from './components/signup/signup';
import Header from './components/header/header';
import Main from './components/main/main';

const store = createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(ReduxThunk)
);


const App = (props) => {
  return(
      <Provider store={store}>
        <Routes />
      </Provider>
  );
};

ReactDOM.render(<App store={store} />, document.getElementById('root'));
