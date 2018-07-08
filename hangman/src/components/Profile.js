import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';

export default class Profile extends Component {
  constructor(){
    super();

    this.state = {
      currentUser: {
        name: {
          givenName: '',
          familyName: ''
        },
        id: '',
        nickname: ''
      },
      score: {
        total_score: 0,
        word_score: 0,
        games_played: 0
      }
    }

  }

  componentDidMount(){
    // get current user data
    Axios.get('/api/currentUser')
      .then( response => {
        this.setState({ currentUser: response.data });
      })
      .catch( err => console.log(`axios err: ${err.message}`) );

    // get score data
    Axios.get('/api/score')
      .then( response => {
        this.setState({ score: response.data[0] })
      } )
      .catch( err => console.log(`axios err: ${err.message}`) );
  }
  
  render() {
    //set up data
    let { total_score, word_score, games_played } = this.state.score;
    let { name, nickname } = this.state.currentUser;
    let { givenName, familyName } = name;
    if (!givenName) {
      givenName = nickname;
    }
    if (!familyName) {
      familyName = '';
    }


    return (
      <div className="Profile">
        <div className="top">
          <img src={`https://robohash.org/${givenName}${familyName}?set=set4`} alt="profile pic"/>
          <h1>{`${givenName} ${familyName}`}</h1>
        </div>
        <table>
          <tbody>
          <tr>
            <td>Score per Word</td>
            <td>{word_score}</td>
          </tr>
          <tr>
            <td>Total Score</td>
            <td>{total_score}</td>
          </tr>
          <tr>
            <td>Games Played</td>
            <td>{games_played}</td>
          </tr>
          </tbody>
        </table>
        <div className="bottom-button">
          <Link to="/main"><button>back</button></Link>
        </div>
      </div>
    );
  }
}