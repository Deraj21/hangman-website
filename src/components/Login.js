import React, { Component } from 'react';
import Hangman from './Hangman';
import env from '../env';
let { APP_BUILD, APP_LOCATION, PRODUCTION_LOCAL, PRODUCTION_HOSTED, BUILDING_LOCAL, } = env;

export default class Login extends Component {

  componentDidMount(){
    
  }
  
  render() {

    let URL = (APP_BUILD === 'production') ? ((APP_LOCATION === 'local') ? PRODUCTION_LOCAL : PRODUCTION_HOSTED) : BUILDING_LOCAL
    console.log(URL);

    return (
      <div className="Login">
        <h1>Welcome to Hangman!</h1>
        <Hangman hangmanColor="black" backgroundColor="#BCFCFF" parts="11" />
          <button><a href={`http://${URL}:4000/login`}>Click Here to Login</a></button>
      </div>
    );
  }
}
