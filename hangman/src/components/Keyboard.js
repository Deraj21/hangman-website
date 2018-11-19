import React, { Component } from 'react';

class Keyboard extends Component {

  render() {

    let { handleGuess, rightGuessed, wrongGuessed } = this.props;

    const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    // make keys
    const keys = letters.map((letter, i) => {
      // look through guessed letter lists & give className
      let name = 'key';
      if (rightGuessed.indexOf(letter) !== -1){
        name += ' pressed-right';
      } else if (wrongGuessed.indexOf(letter) !== -1){
        name += ' pressed-wrong';
      }

      return (
        <div onClick={() => handleGuess(letter)} className={name} key={letter}>
          {letter}
        </div>
      );
    });


    
    return (
      <div className="Keyboard">
        { keys }
      </div>
    );
  }
  
}

export default Keyboard;