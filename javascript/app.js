const qwerty = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
let missed   = 0;

const resetButton = document.querySelector('.btn__reset');

// Hide the start screen overlay
resetButton.addEventListener('click', function() {
  const overlay = document.getElementById('overlay');
  overlay.style.display = 'none';
  resetPhrase();
});

// Create array use only letters
const phrases = [
  'Fish out of water',
  'Bird in the hand',
  'Grass is greener',
  'A dime a dozen',
  'Penny for your thoughts'
];

// Generate random randomNumber
function getRandomNumber(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

// Randomly choose a phrase from the phrases array and split that phrase into a new array of characters.
function getRandomPhraseArray(arr) {
  const randomNumber = getRandomNumber(0, arr.length);
  return arr[randomNumber].split('');
};

function addPhraseToDisplay(arr) {
  // Loops through an array of characters and store them in a list item.
  for (let i = 0; i < arr.length; i += 1) {
    const ul = phrase.getElementsByTagName('ul')[0];
    const li = document.createElement('li');
    li.textContent = arr[i];
    if (arr[i] != ' ') {
      li.className = 'letter';
    } else {
      li.className = 'space';
    }
    ul.appendChild(li);
  }
}

function checkLetter(button) {
  const letters = phrase.querySelectorAll('.letter');
  let matching = null;

  for (let i = 0; i < letters.length; i += 1) {
    const letter = letters[i].innerText.toUpperCase();

    if (button.toUpperCase() === letter) {
      letters[i].classList.add('show');
      matching = letters[i].innerText;
    }
  }
  return matching;
}
//if letter not found remove a heart img .tries class
qwerty.addEventListener('click', function(e) {
  if (e.target.tagName === 'BUTTON') {
    const letter = e.target;
    letter.classList.add('chosen');
    letter.disabled = true; // disable button state
    const letterFound = checkLetter(e.target.textContent);
    if (letterFound === null) {
      const tries = scoreboard.querySelectorAll('.tries')[0];
      tries.parentNode.removeChild(tries);
      missed += 1;
    }
    checkWin();
  }
});

function checkWin() {
  const show = document.querySelectorAll('.show');
  const letter = document.querySelectorAll('.letter');
  const overlay = document.getElementById('overlay');
  const title = overlay.querySelector('.title');
  if (show.length === letter.length) {
    title.innerText = 'Winner!';
    overlay.setAttribute('class', 'win');
    overlay.style.display = '';
  } else if (missed >= 5) {
    title.innerText = 'You lost better luck next time';
    overlay.setAttribute('class', 'lose');
    overlay.style.display = '';
  }
}

function resetPhrase() {
  // Clear qwerty (the letters)
  const letters = qwerty.querySelectorAll('.chosen');
  for (let i = 0; i < letters.length; i += 1) {
    letters[i].setAttribute('class', '');
    letters[i].removeAttribute('disabled');
  }

  // Clear phrase
  const ul = phrase.getElementsByTagName('ul')[0];
  ul.innerHTML = '';

  // Get new phrase
  const phraseArray = getRandomPhraseArray(phrases);
  addPhraseToDisplay(phraseArray);

  // Reset tries <ol> = heart image-append heart img each time through loop if missed i < missed
  //.tries is the list item class
  const tries = scoreboard.querySelectorAll('.tries');
  if (tries.length < 5) {
    for (let i = 0; i < missed; i += 1) {
      const ul = scoreboard.getElementsByTagName('ol')[0];
      const li = document.createElement('li');
      const img = document.createElement('img');
      li.className = 'tries';
      img.src = 'images/liveHeart.png';
      img.height = '35';
      img.width = '30';
      li.appendChild(img);
      ul.appendChild(li);
    }
  }
  missed = 0;
}
