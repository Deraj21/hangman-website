select hu.id, hu.first_name, hu.last_name, hu.is_admin, us.word_score, us.total_score, us.games_played from user_score us
    join hangman_user hu on hu.id = us.id
    order by us.word_score desc limit $1;