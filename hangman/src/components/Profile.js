import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

class Profile extends Component {
  
  render() {
    //set up data
    console.log(this.props);
    let { total_score, word_score, games_played } = this.props.score;
    let { name, nickname } = this.props.currentUser;
    let { givenName, familyName } = name;
    if (!givenName) {
      if (!nickname){
        givenName = "Michael"
      } else {
        givenName = nickname;
      }
    }
    if (!familyName) {
      familyName = "Jephandrews";
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

function mapStateToProps(state){
  let { score, currentUser } = state;
  return { score, currentUser };
}

export default withRouter(connect( mapStateToProps )( Profile ));