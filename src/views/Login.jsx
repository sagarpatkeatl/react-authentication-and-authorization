import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

const styles = {
  paper: {
    padding: '2em'
  }
}

export default class LoginView extends Component {
  render() {
    return (
      <Paper style={styles.paper}>
        <h2>Login</h2>
        <Link to="/app">
          <Button variant="contained" color="primary">
              Login
          </Button>
        </Link>
      </Paper>
    );
  }
}