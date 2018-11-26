# hangman-website

	• Features
		○ play hangman with a randomly generated word
		○ login to keep track of your personal score
		○ shows scoreboard of the top users and their scores
	• Pages:
		○ Main page:
			§ has top 10 scores, current user's score (to compare), and logo at the top
	• How to calculate standings:
		○ when a user finishes a game, the number of letters in the word gets added to the user's total_score
		○ the number of missed guesses gets subtracted from the user's total_score.
		○ Then the total_score is divided by the number of words (or games) the user has played; that number becomes the user's word_score, and that is what is displayed on the leaderboard.
	• Minimum Viable Product:
		○ Thing	Points
		Full CRUD (see below)	10
		Foreign Key & Join	10
		MVP plan	10
		Presentation	10
		Redux	10
		Sass	10
		Hosted by Digital Ocean	10
		API (wordsAPI)	10
		total	80
	• API endpoints
		○ User
		○ GET	"/api/users/:quantity"	if ':quantity' = 10, gets the top 10 users (based on score) from the database; if quantity = -1, gets all the scores
		GET	"/api/user/:id"	gets user with matching id
		POST	"/api/user"	makes new user; data passed into body
		○ Scores
		GET	"/api/scores/:quantity"	same as user above
		GET	"/api/score/:id"	gets score with given id
		POST	"/api/score"	adds new score; data passed into body
		PUT	"/api/score/:id"	edits score; data passed into body
		DELETE	"/api/score/:id"	deletes score of given id
	• database schema
		○ Tables:
			§ hangman_user
				□ first_name	last_name	user_id	is_admin
				varchar	varchar	integer primary key	boolean
				
			§ score
				□ user_id	total_score	word_score	games_played
				integer foreign key	integer	decimal (precision of 2)	integer
	• Questions for the mentor / instructor:
		○ Do you think it is worth hosting it if I don't register a domain name?
			§ What is the difference between the two?
		○ Is my timeline realistic?
		○ For this idea to work, do I need to create a login, or are cookies sufficient?
			if (new session) {
			  - ask for user's first / last name
			  - create new user
			  - store info in the database, and the primary key on the cookie
			} else {
			  - load data associated with id stored on the cookie
			}
