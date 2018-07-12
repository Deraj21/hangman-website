import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './components/Login';
import Main from './components/Main';
import Profile from './components/Profile';
import Game from './components/Game';

export default (
  <div>
    <Route exact path="/" component={Login} />
    <Route path="/main" component={Main} />
    <Route path="/profile/:id" component={Profile} />
    <Route path="/game" component={Game} />
  </div>
)