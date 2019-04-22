const Auth0Strategy = require('passport-auth0');
require('dotenv').config();
let { DOMAIN, CLIENT_ID, CLIENT_SECRET } = process.env;

module.exports = new Auth0Strategy({
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
);


// const DOMAIN = "deraj21.auth0.com";
// const CLIENT_ID = "D-Tt-Hac5HtAHjZRIhFwUXJRIV6Pp9hy";
// const CLIENT_SECRET = "jTw8Jy_34xuFzLYpRqIbw4wAX3ANChOdAWwdSznsCenPjltPOZZC5latY7i-COkk";