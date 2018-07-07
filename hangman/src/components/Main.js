import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';

export default class Main extends Component {
  constructor(){
    super();

    this.state = {
      topScores: [],
      currentUser: {},
    }

  }

  componentDidMount(){
    Axios.get('/api/user')
      .then( response => {
        console.log(response.data);
        this.setState({ currentUser: response.data });
      } )
      .catch( err => console.log(`Axios err: ${err.message}`) );

    Axios.get('/api/topscores/10')
      .then( response => {
        this.setState({ topScores: response.data });
      })
      .catch(err => console.log(`Axios err: ${err.message}`) );

  }
  
  render() {

    let {topScores, currentUser } = this.state;

    let scores = topScores.map((item, i) => {
      return (
        <tr key={`row-${i}`}>
          <td>{i}</td>
          <td>{item.score}</td>
          <td>{`${item.first_name} ${item.last_name}`}</td>
        </tr>
      )
    });
    
    let { first_name, last_name, user_id, is_admin } = currentUser;

    return (
      <div className="Main">
        <div className="top">
          <h1>Impossible Hangman!</h1>
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
        <div className="bottom-button">
          <Link to="/game"><button>Start New Game</button></Link>
        </div>

      </div>
    );
  }
}