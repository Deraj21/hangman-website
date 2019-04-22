import React, { Component } from 'react';
import Hangman from './Hangman';
const HOSTED_SERVER="206.189.77.22";
const LOCAL_SERVER="localhost";

export default class Login extends Component {
  constructor(){
    super();

    this.state = {
      isHosted: false
    };
  }

  componentDidMount(){
    
  }
  
  render() {

    let { isHosted } = this.state;

    return (
      <div className="Login">
        <h1>Welcome to Hangman!</h1>
        <Hangman hangmanColor="black" backgroundColor="#BCFCFF" parts="11" />
          <button><a href={`http://${isHosted ? HOSTED_SERVER : LOCAL_SERVER}:4000/login`}>Click Here to Login</a></button>
      </div>
    );
  }
}
