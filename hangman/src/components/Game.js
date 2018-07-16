import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import Axios from 'axios';
import { connect } from 'react-redux';
import { updateScore } from '../ducks/reducer';
import pokemon from './pokemon';

const wordsapiConfig = {
  baseURL: "https://wordsapiv1.p.mashape.com",
  headers: {
    "X-Mashape-Key":"2f0GdKnXKsmshUuilyDAgDCrKPHJp1878O1jsncmbHfvljrHmi"
  }
};
const swapiConfig = {
  baseURL: "https://swapi.co"
}

class Game extends Component {
  constructor(props){
    super(props);

    this.state = {
      word: '',
      definition: '',
      guess: '',
      board: [],
      guessedLetters: [],
      userWon: false
    }

    this.handleGuess = this.handleGuess.bind(this);
  }

  componentDidMount(){
    this.getWord();
  }
  
  getWord(){
    let { wordCategory } = this.props;
    let category = wordCategory.split(' ');

    // SWapi
    if (category[0] === 'SW'){
      Axios.get(`/api/${category[1]}/`, swapiConfig)
        .then(response => {
          let item = this.randomFromList(response.data.results);
          let newWord = (category[1] === 'films') ? item.title : item.name;
          this.setState({
            word: newWord,
            board: this.makeBoard(newWord)
          });
        })
        .catch( err => console.log(`swapi err: ${err.message}`) );
    // Pokemon
    } else if (category[0] === "pokemon") {
      let newWord = this.randomFromList(pokemon).name;
      this.setState({
        word: newWord,
        board: this.makeBoard(newWord)
      });
    // Wordsapi
    } else if (category[0] === 'random') {
      Axios.get("/words?random=true", wordsapiConfig)
        .then( response => {
          let { word } = response.data;
          console.log(word);
          this.setState({
            word: word,
            board: this.makeBoard(word)
          });
        })
        .catch( err => {
          console.log(`words err: ${err.message}`);
        });
    } else {
      console.log('category not found', wordCategory, category);
    }

  }

  randomFromList(array){
    let rand = Math.floor(Math.random() * array.length);
    return array[rand];
  }

  playerWon(){
    let { word, guessedLetters } = this.state;

    // calculate new userScore
    let newScore = Object.assign({}, this.props.score);
    let { total_score, word_score, games_played } = newScore;
    games_played++;
    total_score += word.length;
    total_score -= guessedLetters.length;
    word_score = total_score / games_played;

    // send changes to database
    this.props.updateScore({ total_score, word_score, games_played });
  }
  
  makeBoard(word){
    return word.split('').map(letter => {
      let nonLetters = `,.?'"; :-!0123456789`;
      if (nonLetters.indexOf(letter) !== -1) {
        return letter;
      }
      return '_';
    } );
  }

  handleGuess(guess){
    // set things up
    let { board, guessedLetters, word } = this.state;

    // put correctly guessed letter on the board
    let newBoard = word.split('').map( (val, i) => (guess.toUpperCase() === val.toUpperCase()) ? val : board[i] );
    
    // detect if user won
    let won = !!newBoard.reduce((acc, val) => { return acc * (val !== '_') }, true);
    if (won) this.playerWon();
    
    // if board changed, no wrong guesses occured
    if (this.state.board.join('') !== newBoard.join('')){
      this.setState({
        board: newBoard,
        guess: '',
        userWon: won
      });
    } else { // if didn't change, add guess to wrong guesses
      this.setState({
        board: newBoard,
        guess: '',
        userWon: won,
        guessedLetters: [...guessedLetters, guess]
      });
    }
  }

  render() {

    let { guessedLetters, board, guess, userWon, definition } = this.state;
    let { wordCategory } = this.props;
    let category = wordCategory.split(' ');

    let guessed = guessedLetters.reduce((acc, value, i, arr) => {
      return acc + ((i !== arr.length - 1) ? `${value}, ` : value);
      }, '');

    return (
      <div className="Game">
        <h1>StarWars Hangman!</h1>
        <div className="window">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuLIa1IlvLDjVYQv5t397U5U5fg3pjM7ivnmC80j1NCvZwJOqwmg" alt="hangman-image"/>
          <div className="right">
            <p className="category">Category: {category[1]}</p>
            <p className="board">{board.join('')}</p>
            <p className="definition">{definition}</p>
            {
              userWon
              ?
              <h2>You Won!</h2>
              :
              <div>
                <input type="text" value={guess} onChange={ e => this.setState({ guess: e.target.value }) }/>
                <button onClick={ () => this.handleGuess(guess[0])} >guess</button>
              </div>
            }
            <div className="guessed">
              <h3>Guessed Letters:</h3>
              <p>{guessed}</p>
            </div>
          </div>
        </div>
        <div className="bottom-button">
          <Link to="/main"><button>back</button></Link>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  let { score, wordCategory } = state;
  return { score, wordCategory };
}

export default withRouter(connect( mapStateToProps, { updateScore } )( Game ));