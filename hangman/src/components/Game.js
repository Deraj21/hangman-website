import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';

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

const wordsConfig = {
  baseURL: "https://wordsapiv1.p.mashape.com",
  headers: {
    "X-Mashape-Key":"2f0GdKnXKsmshUuilyDAgDCrKPHJp1878O1jsncmbHfvljrHmi"
  }
};

export default class Game extends Component {
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
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount(){
    this.getWord();
  }

  playerWon(){
    let { word } = this.state;
    Axios.get(`/words/${word}/definition`, wordsConfig)
      .then( response => {
        console.log(response.data);
        let  { definition } = response.data;
        this.setState({ definition: definition });
      })
      .catch( err => {
        console.log(`Error: ${err.message}`);
      })
  }

  getWord(){

    Axios.get("/words?random=true", wordsConfig)
      .then( response => {
        let { word } = response.data;
        console.log(word);
        this.setState({
          word: word,
          board: this.makeBoard(word)
        });
      })
      .catch( err => {
        console.log(`Error message: ${err.message}`);
      });

  }
  
  makeBoard(word){
    return word.split('').map(letter => {
      let nonLetters = `,.?'"; :-!`;
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
    let newBoard = word.split('').map( (val, i) => (guess === val) ? val : board[i] );
    
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
    
    let guessed = guessedLetters.reduce((acc, value, i, arr) => {
      return acc + ((i !== arr.length - 1) ? `${value}, ` : value);
      }, '');

    return (
      <div className="Game">
        <h1>Impossible Hangman!</h1>
        <div className="window">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuLIa1IlvLDjVYQv5t397U5U5fg3pjM7ivnmC80j1NCvZwJOqwmg" alt="hangman-image"/>
          <div className="right">
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