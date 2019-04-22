insert into hangman_user (id, first_name, last_name, is_admin)
  values ($1, $2, $3, $4);

insert into user_score (id, total_score, word_score, games_played)
  values ($1, 0, 0, 0);
