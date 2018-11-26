import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import Axios from 'axios';
import { connect } from 'react-redux';
import { updateCurrentUser, updateTopScores, updateScore, updateWordCategory, updateRedirect } from '../ducks/reducer';
import Hangman from './Hangman';

class Main extends Component {

  componentDidMount(){
    // get currentUser
    Axios.get('/api/currentUser')
      .then( response => {
        this.props.updateCurrentUser(response.data);
      } )
      .catch( err => {
        console.log(`Axios err: ${err.message}`);
        this.props.updateRedirect(true);
      } );

    // get topScores
    Axios.get('/api/topscores/10')
      .then( response => {
        this.props.updateTopScores(response.data);
      })
      .catch(err => console.log(err.message));
    
    // get currenUserScore
    Axios.get('api/score')
      .then( response => {
        this.props.updateScore(response.data[0]);
      })
      .catch( err => console.log(err.message));
  }

  logout(){
    Axios.get('/logout')
      .then(() => console.log('logged out'))
      .catch(err => console.log(err.message));
  }

  handleChange(category){
    this.setState({ currentCategory: category });
  }
  
  render() {
    let { topScores, currentUser } = this.props;

    let scores = topScores.map((item, i) => {
      let { total_score, word_score, games_played, first_name, last_name } = item;
      return (
        <tr key={`row-${i+1}`}>
          <td>{i+1}</td>
          <td>{total_score}</td>
          <td>{word_score}</td>
          <td>{games_played}</td>
          <td>{`${first_name ? first_name : ''} ${last_name ? last_name : ''}`}</td>
        </tr>
      )
    });
    
    let { id, name, nickname } = currentUser;
    let { givenName, familyName } = name;
    if (!givenName) {
      if (!nickname) {
        givenName = ""
      } else {
        givenName = nickname;
      }
    }
    if (!familyName) {
      familyName = "";
    }

    return (
      <div className="Main">

        <div className="header">
          <div className="title">
            <h1>Hangman!</h1>
            <div className="hangman-box"><Hangman hangmanColor="black" backgroundColor="#0061A3" size="60px" parts="11" /></div>
          </div>

          <div className="profile-box">
            <div className="img-box">
              <img src={`https://robohash.org/${givenName}${familyName}?set=set4`} alt="profile pic"/>
              <p>{`${givenName} ${familyName}`}</p>
            </div>
            <div className="links">
              <Link to={`/profile/${id}`}><span>View Profile</span></Link>
              <Link to="/" onClick={() => this.logout()}><span>Logout</span></Link>
            </div>
          </div>
        </div>

        <div className="content">

          <div className="btn-box">

            <Link to="/game"><button>Start New Game</button></Link>

            <select className="category-select" onChange={ e => this.props.updateWordCategory(e.target.value) }>
              <option value="Random Word">        --Select a category--</option>
              <option value="Star Wars people">   Star Wars- People    </option>
              <option value="Star Wars films">    Star Wars- Films     </option>
              <option value="Star Wars starships">Star Wars- Starships </option>
              <option value="Star Wars vehicles"> Star Wars- Vehicles  </option>
              <option value="Star Wars species">  Star Wars- Species   </option>
              <option value="Star Wars planets">  Star Wars- Planets   </option>
              <option value="Pokemon">            Pokemon (gen 1-3)    </option>
              <option value="Random Word">        Dictionary Word      </option>
            </select>
          </div>

          <h2>Current Standings</h2>
          <table>
            <tbody>
              <tr>
                <td>Place</td>
                <td>Total Score</td>
                <td>Per Word Score</td>
                <td>Games Played</td>
                <td>Name</td>
              </tr>
            { scores }
            </tbody>
          </table>

        </div>       
      </div>
    );
  }
}

function mapStateToProps(state) {
  let { topScores, currentUser, wordCategory } = state;
  return { topScores, currentUser, wordCategory };
}

export default withRouter(connect( mapStateToProps, { updateCurrentUser, updateTopScores, updateScore, updateWordCategory, updateRedirect } )( Main ));