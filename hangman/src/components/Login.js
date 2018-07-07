import React, { Component } from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';

export default class Login extends Component {

  // login(){
  //   Axios.get('http://localhost:4000/login')
  //     .then( response => console.log(response) )
  //     .catch( err => console.log(err.message) );
  // }
  
  render() {

    return (
      <div className="Login">
        <div className="portal">
          <button><a href="http://localhost:4000/login">Login</a></button>
        </div>
      </div>
    );
  }
}
/* <a href="http://localhost:4000/login">Login</a> */