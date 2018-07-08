import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';

const wordsConfig = {
  baseURL: "https://wordsapiv1.p.mashape.com",
  headers: {
    "X-Mashape-Key":"2f0GdKnXKsmshUuilyDAgDCrKPHJp1878O1jsncmbHfvljrHmi"
  }
};

const swapiConfig = {
  baseURL: "https://swapi.co"
}

const swapiCategories = [
  "people",
  "films",
  "starships",
  "vehicles",
  "species",
  "planets"
];

export default class Game extends Component {
  constructor(props){
    super(props);

    this.state = {
      word: '',
      definition: '',
      category: '',
      guess: '',
      board: [],
      guessedLetters: [],
      userWon: false,
      currentUser: {
        name: {
          givenName: '',
          familyName: ''
        },
        id: '',
        nickname: ''
      }
    }

    this.handleGuess = this.handleGuess.bind(this);
  }

  componentDidMount(){
    this.getWord();

    Axios.get('/api/currentUser')
      .then( response => {
        this.setState({ currentUser: response.data });
      })
      .catch( err => console.log(`axios err: ${err.message}`) );
  }

  randomFromList(array){
    let rand = Math.floor(Math.random() * array.length);
    return array[rand];
  }

  playerWon(){
    // get definition
    let { word, currentUser, guessedLetters } = this.state;
    // Axios.get(`/words/${word}/definition`, wordsConfig)
    //   .then( response => {
    //     let { definition } = response.data;
    //     this.setState({ definition: definition });
    //   })
    //   .catch( err => {
    //     console.log(`Error: ${err.message}`);
    //   });

    // calculate new userScore
    Axios.get('/api/score') // get old score
      .then( response => {
        // edit data
        let newScore = Object.assign({}, response.data[0]);
        let { total_score, word_score, games_played } = newScore;
        games_played++;
        // num letters in the word is added to total_score
        total_score += word.length;
        // num missed guesses is subtracted from total_score.
        total_score -= guessedLetters.length;
        word_score = total_score / games_played;

        // send changes to database
        Axios.put('/api/score', { total_score, word_score, games_played })
          .then( console.log('score updated') )
          .catch( err => console.log(`axios err: ${err.message}`) );
        } )
      .catch( err => console.log(`axios err: ${err.message}`) )
  }

  getWord(){

    let category = this.randomFromList(swapiCategories);

    Axios.get(`/api/${category}/`, swapiConfig)
      .then(response => {
        let item = this.randomFromList(response.data.results);
        let newWord = (category === 'films') ? item.title : item.name;
        this.setState({
          word: newWord,
          board: this.makeBoard(newWord),
          category: category
        });
      })
      .catch( err => console.log(`swapi err: ${err.message}`) )


    // Axios.get("/words?random=true", wordsConfig)
    //   .then( response => {
    //     let { word } = response.data;
    //     console.log(word);
    //     this.setState({
    //       word: word,
    //       board: this.makeBoard(word)
    //     });
    //   })
    //   .catch( err => {
    //     console.log(`Error message: ${err.message}`);
    //   });

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

    let { guessedLetters, board, guess, userWon, definition, category } = this.state;

    let guessed = guessedLetters.reduce((acc, value, i, arr) => {
      return acc + ((i !== arr.length - 1) ? `${value}, ` : value);
      }, '');

    return (
      <div className="Game">
        <h1>StarWars Hangman!</h1>
        <div className="window">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuLIa1IlvLDjVYQv5t397U5U5fg3pjM7ivnmC80j1NCvZwJOqwmg" alt="hangman-image"/>
          <div className="right">
            <p className="category">Category: {category}</p>
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