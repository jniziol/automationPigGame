const rollBtn = document.querySelector('.btn-roll');
const holdBtn = document.querySelector('.btn-hold');
const newBtn = document.querySelector('.btn-new');
const PIG_NUMBER = 1;

let currentRoundScore = 0;
let currentPlayer = 0;
let player1Total = 0;
let player2Total = 0;

function getRandomInt(min, max) {
  // Don't worry about how this works, just trust that it
  // generates an integer between min and max.
  return Math.floor(Math.random() * (max + 1 - min)) + min;
}

function reset() {
  currentPlayer = 0;
  player1Total = 0;
  player2Total = 0;
  currentRoundScore = 0;

  const player1Panel = document.querySelector(".player-0-panel");
  const player2Panel = document.querySelector(".player-1-panel");

  player1Panel.classList.add('active');
  player2Panel.classList.remove('active');

  document.querySelector(".active .player-score").textContent = player1Total;
  document.querySelector(".active .player-score").textContent = player2Total;
}

function swapPlayer() {
  const currentPlayerRoundScore = document.getElementById(`current-${currentPlayer}`);

  currentRoundScore = 0;
  currentPlayerRoundScore.textContent = currentRoundScore;

  const player1Panel = document.querySelector(".player-0-panel");
  const player2Panel = document.querySelector(".player-1-panel");

  player1Panel.classList.toggle('active');
  player2Panel.classList.toggle('active');

  currentPlayer = currentPlayer === 0 ? 1 : 0;  
}

newBtn.addEventListener('click', reset);

holdBtn.addEventListener('click', function() {
  if (currentPlayer === 0) {
    player1Total += currentRoundScore;
    document.querySelector(".active .player-score").textContent = player1Total;

  } else {
    player2Total += currentRoundScore;
    document.querySelector(".active .player-score").textContent = player2Total;
  }

  swapPlayer();

  if (player1Total >= 100) {
    alert("Player 1 Wins!");
    reset();
  } else if (player2Total >= 100) {
    alert("Player 2 Wins!");
    reset();
  } 
});

rollBtn.addEventListener('click', function() {
  const die1Ele = document.getElementById('dice1');
  const die2Ele = document.getElementById('dice2');
  const currentPlayerRoundScore = document.getElementById(`current-${currentPlayer}`);

  let diceRoll1 = getRandomInt(1, 6);
  let diceRoll2 = getRandomInt(1, 6);

  if (diceRoll1 === PIG_NUMBER || diceRoll2 === PIG_NUMBER) {
    alert("You rolled a 1!");
    swapPlayer();
  } else {
    currentRoundScore += diceRoll1 + diceRoll2;
  }

  die1Ele.src = `images/dice-${diceRoll1}.png`;
  die2Ele.src = `images/dice-${diceRoll2}.png`;
  currentPlayerRoundScore.textContent = currentRoundScore;
});
