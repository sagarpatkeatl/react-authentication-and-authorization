import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Login from './views/Login';
import Main from './views/Main';

ReactDOM.render(
  (
    <Router>
      <Fragment>
        <Route path="/" exact component={Login} />
        <Route path="/app" component={Main} />
      </Fragment>
    </Router>
  )
  , document.getElementById('root'));
