// woo lee auth0 example

passport.use( new Auth0Strategy({
  domain: process.env.AUTH_DOMAIN,
  clientID: process.env.AUTH_CLIENT_ID,
  clientSecret: process.env.AUTH_CLIENT_SECRET,
  callbackURL: process.env.AUTH_CALLBACK
},
function(accessToken, refreshToken, extraParams, profile, done){
  const db = app.get('db');
  console.log('initial looking for user')
  db.get_user([profile.identities[0].user_id]).then(user=>{
      if(user[0]){
          console.log("found user")
          done(null, user[0].id)
      }
      else{
          console.log("create user")
         
          db.create_user([profile.displayName, profile.emails[0].value, profile.picture, profile.identities[0].user_id ]).then(
             user=>{ done(null, user[0].id)
             }
          )
      }
  })
}))
// var transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//         user: 'schoolbookbroker@gmail.com',
//         pass: process.env.EMAIL_PASSWORD
//     }
// });

passport.serializeUser(function(userID, done){
  done(null, userID)
})

passport.deserializeUser(function(userID, done){
  app.get('db').current_user([userID]).then(user=>{
      done(null, user[0])
  })
  
})

app.use(passport.initialize())
app.use(passport.session()) 