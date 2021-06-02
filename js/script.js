const guessedLettersElement = document.querySelector(".guessed-letters"); //player's guessed letters
const button = document.querySelector(".guess"); //button with Guess! in it
const playerInput = document.querySelector(".letter"); //text input box
const inProgress = document.querySelector(".word-in-progress"); //word in progress
const remainingGuessElement = document.querySelector(".remaining"); //remaining letters paragraph
const remainingGuessSpan = document.querySelector(".remaining span"); //remaining letters span
const message = document.querySelector(".message"); //where messages appear
const playAgain = document.querySelector(".play-again"); //the play again button

//let word = "magnolia";
let guessedLetters = [];
let remainingGuesses = 8;

const getWord = async function() {
  const request = await fetch ("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
  const data = await request.text();
  // console.log(data);
  const wordArray = data.split("\n");
  const randomIndex = Math.floor(Math.random() * wordArray.length);
  word = wordArray[randomIndex].trim();
  placeholder(word);
};

getWord();

const placeholder = function(word) {
  const placeholderLetters = [];
  for (const letter of word) {
    // console.log(letter);
    placeholderLetters.push("●");
  }
  inProgress.innerText = placeholderLetters.join("");
};

button.addEventListener("click", function (e) {
  e.preventDefault();
  const guess = playerInput.value;
  playerInput.value = "";
  const goodGuess = validateInput(guess);
  // console.log(goodGuess);
  if (goodGuess) {
    makeGuess(guess);
  }
});

const validateInput = function (input) {
  const acceptedLetter = /[a-zA-Z]/;
  if (input.length === 0) {
    message.innerText = `Please enter a letter.`;
  } else if (input.length > 1) {
    message.innerText = `Please enter only one letter.`;
  } else if (!input.match(acceptedLetter)) {
    message.innerText = `Please enter a letter from A to Z.`;
  } else {
    return input;
  }
};

const makeGuess = function(guess) {
  guess = guess.toUpperCase();
  if (guessedLetters.includes(guess)){
    message.innerText = `That letter has already been guessed. Try again.`;
  } else {
    guessedLetters.push(guess);
    // console.log(guessedLetters);
    showGuessedLetters();
    updateRemainingGuesses(guess);
    updateInProgress(guessedLetters);
  }
};

const showGuessedLetters = function() {
  guessedLettersElement.innerHTML = "";
  for (const letter of guessedLetters) {
    const li = document.createElement("li")
    li.innerText = letter;
    guessedLettersElement.append(li);
  }
};

const updateInProgress = function(guessedLetters) {
  const wordUpper = word.toUpperCase();
  const wordArray = wordUpper.split("");
  const revealArray = []
  for (const letter of wordArray){
    if (guessedLetters.includes(letter)) {
      revealArray.push(letter.toUpperCase());
    } else {
      revealArray.push("●");
    }
  }
  // console.log(revealArray);
  inProgress.innerText = revealArray.join("");
  checkIfWon();

};

const updateRemainingGuesses = function(guess) {
  const upperWord = word.toUpperCase();
  if (!upperWord.includes(guess)) {
    message.innerHTML = `Sorry, the word doesn't have ${guess}`;
    remainingGuesses -= 1;
  } else {
    message.innerText = `Good guess! The word has the letter ${guess}.`;
  }
  if (remainingGuesses === 0) {
    message.innerHTML = `So sorry, you're out of guesses. The word is <span class="highlight">${word}</span>.`;
    startOver();
  } else if (remainingGuesses === 1) {
    remainingGuessSpan.innerText = `${remainingGuesses} guess`;
  } else {
    remainingGuessSpan.innerText = `${remainingGuesses} guesses`;
  }

};

const checkIfWon = function() {
  if (word.toUpperCase() === inProgress.innerText) {
    message.classList.add("win");
    message.innerHTML = `<p class-"highlight">Congratulations! You've guessed the correct word!</p>`;
    startOver();
  }
};

const startOver = function() {
  button.classList.add("hide");
  guessedLettersElement.classList.add("hide");
  remainingGuessElement.classList.add("hide");
  playAgain.classList.remove("hide");
};

playAgain.addEventListener("click", function() {
  message.classList.remove("win");
  guessedLetters = [];
  remainingGuesses = 8;
  remainingGuessSpan.innerText = `${remainingGuesses} guesses`;
  guessedLettersElement.innerHTML = "";
  message.innerText = "";
  getWord();

  button.classList.remove("hide");
  playAgain.classList.add("hide");
  guessedLettersElement.classList.remove("hide");
  remainingGuessElement.classList.remove("hide");
});
