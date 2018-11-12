import React from 'react';

function Hangman(parts){

  return (
    <div className="hangman">
      <div className="head"></div>
      <div className="body">
        <div className="part left"></div>
        <div className="part torso"></div>
        <div className="part right"></div>
      </div>
      <div className="legs">
        <div className="part left"></div>
        <div className="part right"></div>
      </div>
    </div>
  );
}

export default Hangman;