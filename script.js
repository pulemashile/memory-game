
const gameBoard = document.querySelector('#game-board');


const letters = ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H'];

function shuffleCards() {
  for (let i = letters.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [letters[i], letters[j]] = [letters[j], letters[i]];
  }
}


function createCards() {
  shuffleCards();

  let cardH = '';
  for (const letter of letters) {
    cardH += `
      <div class="card">
        <div class="card-front"></div>
        <div class="card-back">${letter}</div>
      </div>
    `;
  }

  gameBoard.innerHTML = cardH;

  const cards = document.querySelectorAll('.card');
  cards.forEach((card) => {
    card.addEventListener('click', flipCard);
  });
}

// Flip a card
let firstCard = null;
let secondCard = null;
let isLocked = false;

function flipCard() {
  if (isLocked) return;
  this.classList.add('flipped');

  if (!firstCard) {
    firstCard = this;
  } else {
    secondCard = this;
    isLocked = true;

    checkMatch();
  }
}


function checkMatch() {
  if (firstCard.querySelector('.card-back').textContent === secondCard.querySelector('.card-back').textContent) {
    
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetCards();
  } else {
  
    setTimeout(() => {
      firstCard.classList.remove('flipped');
      secondCard.classList.remove('flipped');
      resetCards();
    }, 1000);
  }
}

function resetCards() {
  [firstCard, secondCard] = [null, null];
  isLocked = false;
}


createCards();