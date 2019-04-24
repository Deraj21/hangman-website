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
### Future Todos:
- [ ] update to support https (secure)
- [ ] add expanation of what the app is for / where the code is on login screen
- [ ] update style
  - [ ] get rid of black circle behind user kitten picture


[mobile-login]: https://raw.githubusercontent.com/Deraj21/hangman-website/master/screenshots/hangman-phone-login.PNG "mobile login"
[mobile-main]: https://raw.githubusercontent.com/Deraj21/hangman-website/master/screenshots/hangman-phone-main.PNG "mobile main"
[mobile-game]: https://raw.githubusercontent.com/Deraj21/hangman-website/master/screenshots/hangman-phone-game.PNG "mobile game"
[mobile-profile]: https://raw.githubusercontent.com/Deraj21/hangman-website/master/screenshots/hangman-tablet-profile.PNG "mobile profile"
[desktop-main]: https://raw.githubusercontent.com/Deraj21/hangman-website/master/screenshots/hangman-laptop-main.PNG "desktop main"
[desktop-game]: https://raw.githubusercontent.com/Deraj21/hangman-website/master/screenshots/hangman-laptop-game.PNG "desktop game"