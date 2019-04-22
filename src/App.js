import React, { Component } from 'react';
import './style.css';
import routes from './routes';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router';

class App extends Component {

  renderRedirect(){ // from https://medium.com/@anneeb/redirecting-in-react-4de5e517354a
    if (this.props.redirect){
      return <Redirect to="/" />
    }
  }

  render() {
    return (
      <div className="App">
        {this.renderRedirect()}
        { routes }
      </div>
    );
  }
}

function mapStateTopProps(state) {
  let { redirect } = state;
  return { redirect };
}

export default withRouter(connect( mapStateTopProps )( App ));
