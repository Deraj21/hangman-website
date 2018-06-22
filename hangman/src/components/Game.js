import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const word = 'hangman';

export default class Game extends Component {
  constructor(props){
    super(props);

    this.state = {
      guess: '',
      board: this.makeBoard(word),
      guessedLetters: [],
      userWon: false
    }
  }

  makeBoard(word){
    return word.split('').map(letter => '-');
  }

  handleGuess(guess){
    // set things up
    let { board, guessedLetters } = this.state;
    // put correctly guessed letter on the board
    let newBoard = word.split('').map( (val, i) => (guess === val) ? val : board[i] );
    
    // detect if user won
    let won = !!newBoard.reduce((acc, val) => { return acc * (val !== '-') }, true);
    
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
    let { guessedLetters, board, guess, userWon } = this.state;

    let guessed = guessedLetters.reduce((acc, value, i, arr) => {
      return acc + ((i !== arr.length - 1) ? `${value}, ` : value);
    }, '');

    return (
      <div className="Game">
        <h1>Hang-Game!</h1>
        <div className="window">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuLIa1IlvLDjVYQv5t397U5U5fg3pjM7ivnmC80j1NCvZwJOqwmg" alt="hangman-image"/>
          <div className="right">
            <p className="board">{board.join('')}</p>
            <div>
              <input type="text" value={guess} onChange={ e => this.setState({ guess: e.target.value }) }/>
              <button onClick={ () => this.handleGuess(guess[0])} >guess</button>
            </div>
            <div className="guessed">
              <h3>Guessed Letters:</h3>
              <p>{guessed}</p>
            </div>
            <h2>{userWon ? 'You Won!' : ''}</h2>
          </div>
        </div>
        <div className="bottom-button">
          <Link to="/main"><button>back</button></Link>
        </div>
      </div>
    );
  }
}