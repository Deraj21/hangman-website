const express = require('express');
const bodyParser = require('body-parser');
const massive = require('massive');
const passport = require('passport');
const Auth0Strategy = require('passport-auth0');
const session = require('express-session');
const controller = require('./controller');
require('dotenv').config();
let { SECRET, PORT, CONNECTION_STRING, DOMAIN, CLIENT_ID, CLIENT_SECRET, LOCAL_APP, HOSTED_APP } = process.env;
const IS_HOSTED = false;

const app = express();
app.use(bodyParser.json());
app.use(express.static( `${__dirname}/../build` ));

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
    const db = app.get('db');
    let { id, name, nickname } = profile;
    db.get_user(id)
      .then( user => {
        if (user[0]){
          return done(null, profile);
        } else {
          console.log('making new user');
          if (!name.givenName) {
            givenName = nickname;
          }
          if (!name.familyName) {
            familyName = '';
          }
                    // id, first_name,     last_name,       is_admin
          db.add_user([id, name.givenName, name.familyName, false])
            .then( respose => {
              return done(null, profile);
            } )
            .catch( err => `db err: ${err.message}`);
        }
      })
      .catch( err => console.log(`db err: ${err.message}`));
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

// 'production' mode
if(process.env.NODE_ENV === 'production') {
  app.use(express.static( `${__dirname}/../build` ));
  //
  app.get('*', (req, res) => {
    res.sendfile( `${__dirname}/../build/index.html` );
  })
}
// 'building' mode
app.get('*', (req, res) => {
  res.sendFile( `${__dirname}/../public/index.html` );
})


// isHosted
app.get('/api/app/isHosted', controller.get_is_hosted);

// user
app.get('/api/currentUser', controller.get_current_user);
app.get('/api/user/:id', controller.get_user);
app.post('/api/user', controller.add_user);

// topscores
app.get('/api/topscores/:quantity', controller.get_top_scores);

// score
app.get('/api/score', controller.get_score);
app.put('/api/score', controller.update_score);
app.delete('/api/score/:id', controller.delete_score);

// login
const loginConfig = { successRedirect: `${IS_HOSTED ? HOSTED_APP : LOCAL_APP}/#/main`, failureRedirect: '/login', failureFlash: true };
app.get('/login', passport.authenticate('auth0', loginConfig) );
app.get('/me', (req, res, next) => {
  if (req.user) {
    req.session.user = Object.assign({}, req.user);
    res.status(200).send(req.user);
  } else {
    res.redirect('/login');
  }
});

// logout here
app.get('/logout', (req, res) =>{
  req.session.destroy(err => {
    if (err){
      console.log(err.message);
    } else {
      console.log('user logged out');
      res.redirect(`${IS_HOSTED ? HOSTED_APP : LOCAL_APP}/#/`);
    }
  });
});

// from https://medium.freecodecamp.org/i-built-this-now-what-how-to-deploy-a-react-app-on-a-digitalocean-droplet-662de0fe3f48
const path = require('path');
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build/index.html'));
})

const port = PORT || 4000;
app.listen(port, () => console.log(`Server listening on port ${port}`));
