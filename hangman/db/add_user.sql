insert into hangman_user (first_name, last_name, is_admin)
  values ($1, $2, $3);

insert into user_score (id, total_score, word_score, games_played)
  values ((
    select max(id) from hangman_user
  ), 0, 0, 0);

select max(id) from hangman_user;