import React, { Component } from 'react';
const HOST_SERVER="http://206.189.77.22";
const LOCAL_SERVER="http://localhost";

export default class Login extends Component {
  
  render() {

    return (
      <div className="Login">
        <div className="portal">
          <button><a href={`http://206.189.77.22:4000/login`}>Login</a></button>
        </div>
      </div>
    );
  }
}
