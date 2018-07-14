import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import Axios from 'axios';
import { connect } from 'react-redux';
import { updateCurrentUser, updateTopScores, updateScore } from '../ducks/reducer';

class Main extends Component {

  componentDidMount(){
    // get currentUser
    Axios.get('/api/currentUser')
      .then( response => {
        this.props.updateCurrentUser(response.data);
      } )
      .catch( err => console.log(`Axios err: ${err.message}`) );

    // get topScores
    Axios.get('/api/topscores/10')
      .then( response => {
        this.props.updateTopScores(response.data);
      })
      .catch(err => console.log(`Axios err: ${err.message}`) );
    
    // get currenUserScore
    Axios.get('api/score')
      .then( response => {
        this.props.updateScore(response.data[0]);
      })
      .catch( err => console.log(err.message));
  }
  
  render() {
    let { topScores, currentUser } = this.props;

    let scores = topScores.map((item, i) => {
      let { total_score, word_score, games_played, first_name, last_name } = item;
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

function mapStateToProps(state) {
  let { topScores, currentUser } = state;
  return { topScores, currentUser };
}

export default withRouter(connect( mapStateToProps, { updateCurrentUser, updateTopScores, updateScore } )( Main ));