import React, { Component } from 'react';
import './style.css';
import routes from './routes';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

class App extends Component {

  render() {
    return (
      <div className="App">
        { routes }
      </div>
    );
  }
}

function mapStateTopProps(state) { return state; }

export default withRouter(connect( mapStateTopProps )( App ));
