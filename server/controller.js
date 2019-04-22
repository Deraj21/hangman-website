const isHosted = false;

module.exports = {
  // GET isHosted
  get_is_hosted: (req,res) => {
    res.status(200).send(isHosted);
  },
  // user POST "/api/user" makes new user and creates blank score for it; data passed into body
  add_user: (req, res, next) => {
    const db = req.app.get('db');
    let { first_name, last_name, is_admin } = req.body;

    db.add_user([first_name, last_name, is_admin])
      .then( user => res.status(200).send(user) )
      .catch( err => console.log(err.message) );
  },
  // GET "/api/currentUser" gets user on session
  get_current_user: (req, res, next) => {
    if (req.session.passport.user) {
      res.status(200).send(req.session.passport.user);
    } else {
      console.log(`user not found: ${JSON.stringify(req.session)}`);
      res.status(200).send(req.session);
    }
  },
  // GET "/api/user/:id" gets user with matching id
  get_user: (req, res, next) => {
    const db = req.app.get('db');
    let { id } = req.params;
    db.get_user([id])
      .then( user => res.status(200).send(user) )
      .catch( err => console.log(err.message) );
  },
  // GET "/api/userscores/:quantity" joins user and score
  get_top_scores: (req, res, next) => {
    const db = req.app.get('db');
    let { quantity } = req.params;
    db.get_top_scores([quantity])
      .then(scores => res.status(200).send(scores))
      .catch(err => console.log(err.message));
  },
  // score  GET "/api/score" gets score of user on session
  get_score: (req, res, next) => {
    const db = req.app.get('db');
    let { id } = req.session.passport.user;
    db.get_score([id])
      .then(score => res.status(200).send(score))
      .catch(err => console.log(err.message));
  },
  // score PUT "/api/score" edits score of user on session; data passed into body
  update_score: (req, res, next) => {
    const db = req.app.get('db');
    let { total_score, word_score, games_played } = req.body;
    let { id } = req.session.passport.user;
    db.update_score([id, total_score, word_score, games_played])
      .then( () => res.status(200).send() )
      .catch( err => console.log(err.message) );
  },
  // score DELETE "/api/score/:id" deletes score of given id
  delete_score: (req, res, next) => {
    const db = req.app.get('db');
    let { id } = req.params;
    db.delete_score([id])
      .then( () => res.status(200).send() )
      .catch( err => consolg.log(err.message) );
  }
}


/*
  // (just in case I still need it)
  // score POST "/api/score" adds new score; data passed into body
  add_score: (req, res, next) => {
    const db = req.app.get('db');

    // need to change to auto_increment!!!

    let { id } = req.params;
    let { total_score, word_score, games_played } = req.body;
    db.add_score([id, total_score, word_score, games_played])
      .then( () => res.status(200))
      .catch( err => console.log(err.message) );
  },

*/