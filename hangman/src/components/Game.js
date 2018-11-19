import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import Axios from 'axios';
import { connect } from 'react-redux';
import { updateScore } from '../ducks/reducer';
import pokemon from './pokemon';
import Hangman from './Hangman';
import Keyboard from './Keyboard';

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
      board: [],
      rightGuessedLetters: [],
      wrongGuessedLetters: [],
      userWon: false,
      parts: 0
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
    let { word, wrongGuessedLetters } = this.state;

    // calculate new userScore
    let newScore = Object.assign({}, this.props.score);
    let { total_score, word_score, games_played } = newScore;
    games_played++;
    total_score += word.length;
    total_score -= wrongGuessedLetters.length;
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
    let { board, rightGuessedLetters, wrongGuessedLetters, word, parts } = this.state;
    let newParts = parts + 1;

    // put correctly guessed letter on the board
    let newBoard = word.split('').map( (val, i) => (guess.toUpperCase() === val.toUpperCase()) ? val : board[i] );
    
    // detect if user won
    let won = !!newBoard.reduce((acc, val) => { return acc * (val !== '_') }, true);
    if (won) this.playerWon();
    
    // if board changed, user rightly guessed; add guess to right guesses
    if (this.state.board.join('') !== newBoard.join('')){
      this.setState({
        board: newBoard,
        guess: '',
        userWon: won,
        rightGuessedLetters: [...rightGuessedLetters, guess]
      });
    } else { // if didn't change, add guess to wrong guesses
      this.setState({
        parts: newParts,
        board: newBoard,
        guess: '',
        userWon: won,
        wrongGuessedLetters: [...wrongGuessedLetters, guess]
      });
    }
  }

  render() {

    let { rightGuessedLetters, wrongGuessedLetters, board, guess, userWon, definition, parts } = this.state;
    let { wordCategory } = this.props;
    let category = wordCategory.split(' ');

    return (
      <div className="Game">
        <h1>StarWars Hangman!</h1>

        <div className="window">
          <div> <Hangman hangmanColor="black" backgroundColor="white" size="150px" parts={parts} /> </div>
          <div className="right">
            <p className="category">Category: {category[1]}</p>
            <p className="board">{board.join('')}</p>
            <Keyboard handleGuess={this.handleGuess} rightGuessed={rightGuessedLetters} wrongGuessed={wrongGuessedLetters}/>
            <p className="definition">{definition}</p>
            {
              userWon
              ?
              <h2>You Won!</h2>
              :
              <p></p>
            }
          </div>
        </div>
        
        <Link to="/main"><button>back</button></Link>

      </div>
    );
  }
}

function mapStateToProps(state) {
  let { score, wordCategory } = state;
  return { score, wordCategory };
}

export default withRouter(connect( mapStateToProps, { updateScore } )( Game ));