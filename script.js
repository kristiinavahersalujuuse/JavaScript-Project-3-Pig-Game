'use strict';

// <---------- Variables ---------->
// Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1'); // that is another way of selecting an ID. Usually use querySelector.
const current0El = document.querySelector('#current--0');
const current1El = document.getElementById('current--1');

const diceImgEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let totalScores, currentScore, activePlayer, playing;

// <---------- Functions ---------->

const init = function () {
  totalScores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceImgEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};

init();

const switchPlayer = function () {
  // 1. for activePlayer the score should go to 0, because he rolled nr 1
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  // 2. then reset the current score for the new activePlayer
  currentScore = 0;
  // 3. then switch to other player
  activePlayer = activePlayer === 0 ? 1 : 0;
  // 4. now we have to switch the background to ligth for the activePlayer too
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// <---------- The Code ---------->

// Rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1. Start generating a random dice roll
    const randomDiceNr = Math.trunc(Math.random() * 6) + 1;
    console.log(randomDiceNr);

    // 2. Display the dice. We need to remove the hidden class. And we have to show the dice img according to the random number we get.
    diceImgEl.classList.remove('hidden');
    diceImgEl.src = `dice-${randomDiceNr}.png`;

    // 3. Check for rolled 1, if true, then next player. And add rolled dice nr to the current score.
    if (randomDiceNr !== 1) {
      // Add dice to cuurent score
      currentScore += randomDiceNr;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

// Saving the scores
btnHold.addEventListener('click', function () {
  if (playing) {
    // 1. add current score to the score of the acive player
    totalScores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      totalScores[activePlayer];
    // 2. check score is already at least 100. if so then finish the game, and if not then switch to the next player.
    if (totalScores[activePlayer] >= 100) {
      playing = false;
      diceImgEl.classList.add('hidden');
      // Finish the game
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      switchPlayer();
    }
  }
});

// Start a new Game
btnNew.addEventListener('click', function () {
  // reset the game
  // all the initial conditions must be set back to the game
  init();
});
