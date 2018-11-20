import React, { Component } from 'react';

class Hangman extends Component {
  constructor(props){
    super(props);

    this.state = {
      mounted: false
    };

    this.hideParts = this.hideParts.bind(this);
  }

  componentDidMount(){
    let { hangmanColor, backgroundColor, size, parts } = this.props;
    let hangman = document.querySelector('.Hangman');
    hangman.style.setProperty('--hangman-color', hangmanColor);
    hangman.style.setProperty('--background-color', backgroundColor);

    if (size) {
      hangman.style.setProperty('--hangman-size', size);
    }

    this.hideParts(parts);
    this.setState({mounted: true});
  }

  hideParts(parts) {
    for (let i = 11; i > 0 ; i--){
      let part = document.querySelector(`div[data-part="${i}"]`);
      part.classList.remove("hidden");
    }

    for (let i = 11; i > parts ; i--){
      let part = document.querySelector(`div[data-part="${i}"]`);
      part.classList.add("hidden");
    }
  }
  
  render() {
    let { parts } = this.props;
    let { mounted } = this.state;
    
    if (mounted) {
      this.hideParts(parts);
    }

    return (
      <div className="Hangman">

        <div className="gallows">
          <div className="upper">
            <div className="beam one" data-part="2"></div>
            <div className="beam two" data-part="4"></div>
            <div className="beam three" data-part="3"></div>
            <div className="beam four" data-part="5"></div>
          </div>
          <div className="beam floor" data-part="1"></div>
        </div>

        <div className="man">
          <div className="head" data-part="6"></div>
          <div className="body">
            <div className="part left" data-part="8"></div>
            <div className="part torso" data-part="7"></div>
            <div className="part right" data-part="9"></div>
          </div>
          <div className="legs">
            <div className="part left" data-part="10"></div>
            <div className="part right" data-part="11"></div>
          </div>
        </div>

      </div>
    );
  }
  
}

export default Hangman;