# hangman-website

### Screenshots

#### Mobile
Login

![mobile login][mobile-login]

Main

![mobile main][mobile-main]

Game

![mobile game][mobile-game]

Profile

![mobile profile][mobile-profile]


#### Desktop
Main

![desktop main][desktop-main]

Game

![desktop game][desktop-game]


### Features
- play hangman with a randomly generated word
- login to keep track of your personal score
- shows scoreboard of the top users and their scores
### Pages:
- Main page:
	- has top 10 scores, current user's score (to compare), and logo at the top
### How to calculate standings:
- when a user finishes a game, the number of letters in the word gets added to the user's total_score
- the number of missed guesses gets subtracted from the user's total_score.
- Then the total_score is divided by the number of words (or games) the user has played; that number becomes the user's word_score, and that is what is displayed on the leaderboard.
### Minimum Viable Product:
- | Thing                   | Points |
	| ----------------------- | ------:|
	| Full CRUD (see below)   |     10 |
	| Foreign Key & Join      |     10 |
	| MVP plan                |     10 |
	| Presentation            |     10 |
	| Redux                   |     10 |
	| Sass                    |     10 |
	| Hosted by Digital Ocean |     10 |
	| API (wordsAPI)          |     10 |
	| **total**               | **80** |
### API endpoints
- User
	- | Method 	| url 										| description |
		| ------- | ----------------------- | ----------- |
		| GET 		| "/api/users/:quantity" 	| if ':quantity' = 10, gets the top 10 users (based on score) from the database; if quantity = -1, gets all the scores |
		| GET 		| "/api/user/:id"					| gets user with matching id |
		| POST 		| "/api/user"							| makes new user; data passed into body |
- Scores
	- | Method 	| url 										| description														|
		| ------- | ----------------------- | ------------------------------------- |
		| GET			| "/api/scores/:quantity"	| same as user above										|
		| GET			| "/api/score/:id"				| gets score with given id							|
		| POST		| "/api/score"						| adds new score; data passed into body	|
		| PUT			| "/api/score/:id"				| edits score; data passed into body		|
		| DELETE	| "/api/score/:id"				| deletes score of given id							|
### database schema
- Tables:
	- hangman_user
		- | first_name	| varchar							|
			| ----------- | -------------------	|
			| last_name		| varchar							|
			| user_id			| integer 						|
			| is_admin		| primary key boolean	|
	- score
		- | user_id				| integer							|
			| ------------- | -------------------	|
			| total_score		| foreign key					|
			| worde_score		| integer decimal(2)	|
			| games_played	| integer							|


[mobile-login]: https://raw.githubusercontent.com/Deraj21/hangman-website/master/screenshots/hangman-phone-login.PNG "mobile login"
[mobile-main]: https://raw.githubusercontent.com/Deraj21/hangman-website/master/screenshots/hangman-phone-main.PNG "mobile main"
[mobile-game]: https://raw.githubusercontent.com/Deraj21/hangman-website/master/screenshots/hangman-phone-game.PNG "mobile game"
[mobile-profile]: https://raw.githubusercontent.com/Deraj21/hangman-website/master/screenshots/hangman-tablet-profile.PNG "mobile profile"
[desktop-main]: https://raw.githubusercontent.com/Deraj21/hangman-website/master/screenshots/hangman-laptop-main.PNG "desktop main"
[desktop-game]: https://raw.githubusercontent.com/Deraj21/hangman-website/master/screenshots/hangman-laptop-game.PNG "desktop game"