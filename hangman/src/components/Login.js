import React, { Component } from 'react';
const HOSTED_SERVER="206.189.77.22";
const LOCAL_SERVER="localhost";
const IS_HOSTED=false;

export default class Login extends Component {
  
  render() {

    return (
      <div className="Login">
        <div className="portal">
          <button><a href={`http://${IS_HOSTED ? HOSTED_SERVER : LOCAL_SERVER}:4000/login`}>Login</a></button>
        </div>
      </div>
    );
  }
}
