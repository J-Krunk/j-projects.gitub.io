'use strict';

const diceImg = document.querySelector('.dice');
const btnHold = document.querySelector('.btn--hold');
const btnRollDice = document.querySelector('.btn--roll');
const bntNewGame = document.querySelector('.btn--new');
const playerName0 = document.querySelector('#name--0');
const playerName1 = document.querySelector('#name--1');

let score = [0, 0];
let current = [0, 0];
let playturn = 0;
let endgame = false;
let locked = false;
diceImg.classList.add('hidden');

const refreshScreen = function (dice) {
  if (dice) diceImg.src = `dice-${dice}.png`;
  for (let i = 0; i < 2; i++) {
    document.querySelector(`#score--${i}`).textContent = score[i];
    document.querySelector(`#current--${i}`).textContent = current[i];
  }
  document
    .querySelector(`.player--${playturn}`)
    .classList.add('player--active');
  document
    .querySelector(`.player--${playturn === 0 ? 1 : 0}`)
    .classList.remove('player--active');
};

const fnRollDice = function () {
  if (endgame || locked) return;
  const diceRoll = Math.trunc(Math.random() * 6 + 1);
  if (diceImg.classList.contains('hidden')) diceImg.classList.remove('hidden');
  if (diceRoll === 1) {
    current[playturn] = 0;
    swapPlayer();
  } else {
    current[playturn] += diceRoll;
  }
  refreshScreen(diceRoll);
};

const fnHold = function () {
  if (endgame || locked || current[playturn] === 0) return;
  score[playturn] += current[playturn];
  current[playturn] = 0;
  refreshScreen();
  if (score[playturn] >= 40) {
    document
      .querySelector(`.player--${playturn}`)
      .classList.add('player--winner');
    endgame = true;
  }
  if (!endgame) {
    swapPlayer();
  }
};

const fnReset = function () {
  document
    .querySelector(`.player--${playturn}`)
    .classList.remove('player--winner');
  score = [0, 0];
  current = [0, 0];
  playturn = 0;
  endgame = false;
  refreshScreen();
};

const swapPlayer = function () {
  playturn = playturn === 0 ? 1 : 0;
  refreshScreen();
  fnLock();
  setTimeout(() => {
    fnUnlock();
  }, 2000);
};
const fnLock = function () {
  locked = true;
  diceImg.classList.toggle('dice--locked');
};
const fnUnlock = function () {
  locked = false;
  diceImg.classList.toggle('dice--locked');
};
refreshScreen();
btnRollDice.addEventListener('click', fnRollDice);
btnHold.addEventListener('click', fnHold);
bntNewGame.addEventListener('click', fnReset);
playerName0.addEventListener('click', function () {
  playerName0.textContent = prompt('Give a new name');
});
playerName1.addEventListener('click', function () {
  playerName1.textContent = prompt('Give a new name');
});
