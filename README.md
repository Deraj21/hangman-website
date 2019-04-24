# hangman-website

This project is hosted with Heroku:
_[Try it out here](https://mysterious-waters-17864.herokuapp.com/#/)_
1. Play hangman with a randomly generated word
2. Login to keep track of your personal score
3. Shows scoreboard of the top users and their scores

## Mobile

<div align="center">
  <img src="https://raw.githubusercontent.com/Deraj21/hangman-website/master/screenshots/hangman-phone-login.PNG" alt="mobile login" />
</div>

<div align="center">
  <img src="https://raw.githubusercontent.com/Deraj21/hangman-website/master/screenshots/hangman-phone-main.PNG" alt="mobile main" />
</div>

<div align="center">
  <img src="https://raw.githubusercontent.com/Deraj21/hangman-website/master/screenshots/hangman-phone-game.PNG" alt="mobile game" />
</div>


## Desktop
<div align="center">
  <img src="https://raw.githubusercontent.com/Deraj21/hangman-website/master/screenshots/hangman-tablet-profile.PNG" alt="mobile profile" />
</div>

<div class="pictures" align="center">
  <img src="https://raw.githubusercontent.com/Deraj21/hangman-website/master/screenshots/hangman-laptop-main.PNG" alt="desktop main" />
</div>

<div class="pictures" align="center">
  <img src="https://raw.githubusercontent.com/Deraj21/hangman-website/master/screenshots/hangman-laptop-game.PNG" alt="desktop game" />
</div>


## How it calculates the standings:
- When a user finishes a game, the number of letters in the word gets added to the user's total_score.
- The number of missed guesses gets subtracted from the user's total_score.
- Then the total_score is divided by the number of words (or games) the user has played; that number becomes the user's word_score, and that is what is displayed on the leaderboard.

## Future Todos:
- [ ] update to support https (secure)
- [ ] add expanation of what the app is for / where the code is on login screen
- [ ] update style
  - [ ] get rid of black circle behind user kitten picture


