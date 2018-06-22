import React, { Component } from 'react';
import { Link } from 'react-router-dom';

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

export default class Profile extends Component {
  
  render() {
    let { first_name, last_name, user_id, is_admin } = user;
    let { total_score, word_score, games_played } = user_score;

    return (
      <div className="Profile">
        <div className="top">
          <img src={`https://robohash.org/${first_name}${last_name}?set=set4`} alt="profile pic"/>
          <h1>{`${first_name} ${last_name}`}</h1>
        </div>
        <table>
          <tr>
            <td>Score</td>
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
        </table>
        <div className="bottom-button">
          <Link to="/main"><button>back</button></Link>
        </div>
      </div>
    );
  }
}