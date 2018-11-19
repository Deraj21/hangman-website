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
    hangman.style.setProperty('--hangman-size', size)
    hangman.style.setProperty('--background-color', backgroundColor);

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
    let { color, size, parts } = this.props;
    let { mounted } = this.state;

    if (mounted) {
      this.hideParts(parts);
    }

    return (
      <div class="Hangman">

        <div class="gallows">
          <div class="upper">
            <div class="beam one" data-part="2"></div>
            <div class="beam two" data-part="4"></div>
            <div class="beam three" data-part="3"></div>
            <div class="beam four" data-part="5"></div>
          </div>
          <div class="beam floor" data-part="1"></div>
        </div>

        <div class="man">
          <div class="head" data-part="6"></div>
          <div class="body">
            <div class="part left" data-part="8"></div>
            <div class="part torso" data-part="7"></div>
            <div class="part right" data-part="9"></div>
          </div>
          <div class="legs">
            <div class="part left" data-part="10"></div>
            <div class="part right" data-part="11"></div>
          </div>
        </div>

      </div>
    );
  }
  
}

export default Hangman;