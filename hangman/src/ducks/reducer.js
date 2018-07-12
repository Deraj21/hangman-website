import Axios from 'axios';

let initialState = {
  topScores: [],
  currentUser: {
    name: {
      givenName: '',
      familyName: ''
    },
    id: '',
    nickname: ''
  },
  score: {
    total_score: 0,
    word_score: 0,
    games_played: 0
  }
}

const UPDATE_CURRENT_USER = "UPDATE_CURRENT_USER";
const UPDATE_TOP_SCORES = "UPDATE_TOP_SCORES";
const UPDATE_SCORE = "UPDATE_SCORE";

function reducer(state = initialState, action) {

  switch(action.type){
    case UPDATE_CURRENT_USER:
      return Object.assign({}, state, { currentUser: action.payload });
    case UPDATE_TOP_SCORES:
      return Object.assign({}, state, { topScores: action.payload });
    case UPDATE_SCORE:
      return Object.assign({}, state, { score: action.payload });
    default:
      return state;
  }
}

export function updateCurrentUser(user){
  return {
    type: UPDATE_CURRENT_USER,
    payload: user
  }
}
export function updateTopScores(scores){
  return {
    type: UPDATE_TOP_SCORES,
    payload: scores
  };
}
export function updateScore(score){
  let { total_score, word_score, games_played } = score;
  Axios.put('/api/score', { total_score, word_score, games_played })
    .then( console.log('score updated') )
    .catch( err => console.log(`axios err: ${err.message}`) );

  return {
    type: UPDATE_SCORE,
    payload: score
  };
}

export default reducer;
