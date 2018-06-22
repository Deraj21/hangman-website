import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const scoreData = [
  {
    score: 100,
    first_name: 'Rachel',
    last_name: 'Tanner'
  },
  {
    score: 98,
    first_name: 'Kalina',
    last_name: 'Tanner'
  },
  {
    score: 45,
    first_name: 'Holland',
    last_name: 'Tanner'
  },
  {
    score: 30,
    first_name: 'Chalane',
    last_name: 'Tanner'
  },
  {
    score: 10,
    first_name: 'Jeffrey',
    last_name: 'Tanner'
  }
];

// first_name, last_name, user_id, is_admin
let user = {
  first_name: 'Jared',
  last_name: 'Tanner',
  user_id: 1,
  is_admin: true
}

// user_id, total_score, word_score, games_played
let user_score = {
  user_id: 1,
  total_score: 95,
  word_score: 9.5,
  games_played: 10
}

export default class Main extends Component {
  
  render() {

    let scores = scoreData.map((item, i) => {
      return (
        <tr key={`row-${i}`}>
          <td>{i}</td>
          <td>{item.score}</td>
          <td>{`${item.first_name} ${item.last_name}`}</td>
        </tr>
      )
    });
    
    let { first_name, last_name, user_id, is_admin } = user;

    return (
      <div className="Main">
        <div className="top">
          <h1>HangGame!</h1>
          <div className="profile-box">
            <img src={`https://robohash.org/${first_name}${last_name}?set=set4`} alt="profile pic"/>
            <div className="links">
              <p>{`${first_name} ${last_name}`}</p>
              <Link to={`/profile/${user_id}`}><p>View Profile</p></Link>
              <Link to="/"><p>Logout</p></Link>
            </div>
          </div>
        </div>
        <div className="scores">
          <h2>Top Scores</h2>
          <table>
            <tr>
              <td>Place</td>
              <td>Score</td>
              <td>Name</td>
            </tr>
            { scores }
          </table>
        </div>
        <div className="new-game">
          <Link to="/game"><button>Start New Game</button></Link>
        </div>

      </div>
    );
  }
}