const playerGuess = document.querySelector(".guessed-letters"); //player's guessed letters
const button = document.querySelector(".guess"); //button with Guess! in it
const playerInput = document.querySelector(".letter"); //text input box
const inProgress = document.querySelector(".word-in-progress"); //word in progress
const remainingGuess = document.querySelector(".remaining"); //remaining letters paragraph
const remainingGuessSpan = document.querySelector(".remaining span"); //remaining letters span
const message = document.querySelector(".message"); //where messages appear
const playAgain = document.querySelector(".play-again"); //the play again button
const word = "magnolia"; //test word
const guessedLetters = [];

const placeholder = function(word) {
  const placeholderLetters = [];
  for (const letter of word) {
    console.log(letter);
    placeholderLetters.push("●");
  }
  inProgress.innerText = placeholderLetters.join("");
};

placeholder(word);

button.addEventListener("click", function (e){
  e.preventDefault();
  const guess = playerInput.value;
  playerInput.value = "";
  const goodGuess = validateInput(guess);
  console.log(goodGuess);
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
    console.log(guessedLetters);
  }
};
