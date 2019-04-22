update user_score
  set total_score = $2, word_score = $3, games_played = $4
    where id = $1;