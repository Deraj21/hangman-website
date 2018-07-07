const express = require('express');
const bodyParser = require('body-parser');
const massive = require('massive');
const passport = require('passport');
const Auth0Strategy = require('passport-auth0');
const session = require('express-session');
const controller = require('./controller');
require('dotenv').config();
let { SECRET, PORT, CONNECTION_STRING, DOMAIN, CLIENT_ID, CLIENT_SECRET } = process.env;

const app = express();
app.use(bodyParser.json());
app.use(express.static( __dirname + '/../build'));

app.use( session({
  secret: SECRET,
  resave: false,
  saveUninitialized: false,
}) );

passport.use( module.exports = new Auth0Strategy({
  domain:       DOMAIN,
  clientID:     CLIENT_ID,
  clientSecret: CLIENT_SECRET,
  callbackURL:  '/login',
  scope: 'openid email profile'
  },
  function(accessToken, refreshToken, extraParams, profile, done) {
    // accessToken is the token to call Auth0 API (not needed in the most cases)
    // extraParams.id_token has the JSON Web Token
    // profile has all the information from the user
    return done(null, profile);
  }
) );

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

app.use( passport.initialize() );
app.use( passport.session() );

massive(CONNECTION_STRING)
  .then( db => {
    app.set('db', db);
    console.log("connected to db");
  })
  .catch( err => {
    console.log("unable to connect to db")
  });

// user
app.get('/api/user', controller.get_user);
app.post('/api/user', controller.add_user);

// topscores
app.get('/api/topscores/:quantity', controller.get_top_scores);

// score
app.get('/api/score/:id', controller.get_score);
app.put('/api/score/:id', controller.update_score);
app.delete('/api/score/:id', controller.delete_score);

// login
const config = { successRedirect: 'http://localhost:3000/#/main', failureRedirect: '/login', failureFlash: true };
app.get('/login', passport.authenticate('auth0', config) );
app.get('/me', (req, res, next) => {
  if (req.user) {
    req.session.user = Object.assign({}, req.user);
    res.status(200).send(req.user);
  } else {
    res.redirect('/login');
  }
});

const port = PORT || 4000;
app.listen(port, () => console.log(`Server listening on port ${port}`));
//  `http://localhost:4000/api`
