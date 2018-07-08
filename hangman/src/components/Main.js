import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';

export default class Main extends Component {
  constructor(){
    super();

    this.state = {
      topScores: [],
      currentUser: {
        name: {
          givenName: '',
          familyName: ''
        },
        id: '',
        nickname: ''
      }
    }

  }

  componentDidMount(){
    Axios.get('/api/currentUser')
      .then( response => {
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

    let { topScores, currentUser } = this.state;

    let scores = topScores.map((item, i) => {
      let { total_score, word_score, first_name, last_name } = item;
      return (
        <tr key={`row-${i+1}`}>
          <td>{i+1}</td>
          <td>{total_score}</td>
          <td>{`${first_name} ${last_name}`}</td>
        </tr>
      )
    });
    
    let { id, name, nickname } = currentUser;
    let { givenName, familyName } = name;
    if (!givenName) {
      givenName = nickname;
    }
    if (!familyName) {
      familyName = '';
    }
    

    return (
      <div className="Main">
        <div className="top">
          <h1>Impossible Hangman!</h1>
          <div className="profile-box">
            <img src={`https://robohash.org/${givenName}${familyName}?set=set4`} alt="profile pic"/>
            <div className="links">
              <p>{`${givenName} ${familyName}`}</p>
              <Link to={`/profile/${id}`}><p>View Profile</p></Link>
              <Link to="/"><p>Logout</p></Link>
            </div>
          </div>
        </div>
        <div className="scores">
          <h2>Top Scores</h2>
          <table>
            <tbody>
              <tr>
                <td>Place</td>
                <td>Score</td>
                <td>Name</td>
              </tr>
            { scores }
            </tbody>
          </table>
        </div>
        <div className="bottom-button">
          <Link to="/game"><button>Start New Game</button></Link>
        </div>

      </div>
    );
  }
}