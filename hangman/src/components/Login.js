import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Login extends Component {
  
  render() {

    return (
      <div className="Login">
        <div className="portal">
          <Link to="/main"><button>Login</button></Link>
        </div>
      </div>
    );
  }
}