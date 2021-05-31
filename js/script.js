const playerGuess = document.querySelector(".guessed-letters"); //player's guessed letters
const button = document.querySelector(".guess"); //button with Guess! in it
const playerInput = document.querySelector(".letter"); //text input box
const inProgress = document.querySelector(".word-in-progress"); //word in progress
const remainingGuess = document.querySelector(".remaining"); //remaining letters paragraph
const remainingGuessSpan = document.querySelector(".remaining span"); //remaining letters span
const message = document.querySelector(".message"); //where messages appear
const playAgain = document.querySelector(".play-again"); //the play again button
const word = "magnolia"; //test word

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
  console.log(guess);
  playerInput.value = "";
});
