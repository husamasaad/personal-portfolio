const words = [
  "Hello",
  "Programming",
  "Code",
  "Javascript",
  "Town",
  "Country",
  "Testing",
  "Youtube",
  "Linkedin",
  "Twitter",
  "Github",
  "Leetcode",
  "Internet",
  "Python",
  "Scala",
  "Destructuring",
  "Paradigm",
  "Styling",
  "Cascade",
  "Documentation",
  "Coding",
  "Funny",
  "Working",
  "Dependencies",
  "Task",
  "Runner",
  "Roles",
  "Test",
  "Rust",
  "Playing"
];

// Setting Levels
const lvls = {
  "Easy": 5,
  "Normal": 3,
  "Hard": 2
};

// Default Level
let defaultLevelName = "Easy"; // Change Level From Here
let defaultLevelSeconds = lvls[defaultLevelName];

// Catch Selectors
let startButton = document.querySelector(".start");
let lvlNameSpan = document.querySelector(".message .lvl");
let secondsSpan = document.querySelector(".message .seconds");
let theWord = document.querySelector(".the-word");
let upcomingWords = document.querySelector(".upcoming-words");
let input = document.querySelector(".input");
let timeLeftSpan = document.querySelector(".time span");
let scoreGot = document.querySelector(".score .got");
let scoreTotal = document.querySelector(".score .total");
let finishMessage = document.querySelector(".finish");

// Setting Level name + seconds + score

lvlNameSpan.innerHTML = defaultLevelName;
secondsSpan.innerHTML = defaultLevelSeconds;
timeLeftSpan.innerHTML = defaultLevelSeconds;
scoreTotal.innerHTML = words.length;

// disable paste event
input.onpaste = function () {
  return false
}

//start game
startButton.onclick = function() {
  this.remove();
  input.focus();
  // generate word function
  genwords();

}

function genwords() {
  // get random word form array
  let randomWord = words[Math.floor(Math.random() * words.length)];
  // get word index
  let wordIndex = words.indexOf(randomWord);
  // remove word from array
  words.splice(wordIndex, 1);
  // show the random word
  theWord.innerHTML = randomWord;
  // empty Upcoming Word
  upcomingWords.innerHTML = '';
  // generate upcomin words
  for (let i =0; i < words.length; i++) {
    // create Div Element
    let div = document.createElement('div');
    let txt = document.createTextNode(words[i]);
    div.appendChild(txt);
    upcomingWords.appendChild(div);
  }
  // start play function
  startPlay()
}

function startPlay() {
  timeLeftSpan.innerHTML = defaultLevelSeconds;
  let start = setInterval(() => {
    timeLeftSpan.innerHTML--;
    if (timeLeftSpan.innerHTML === "0") {
      clearInterval(start)
      // compare words
      if (theWord.innerHTML.toLowerCase() === input.value.toLowerCase()) {
        // empty input field
        input.value = "";
        // increase Score
        scoreGot.innerHTML++;
        if (words.length > 0) {
          // call generate word function
          genwords();
        } else {
          let span = document.createElement('span');
          span.className = 'good';
          let spanText = document.createTextNode('Horaaai');
          finishMessage.appendChild(span);
          // remove Upcoming word box
          upcomingWords.remove();
        }
      } else {
        let span = document.createElement('span');
        span.className = 'bad';
        let spanText = document.createTextNode('Game Over');
        span.appendChild(spanText);
        finishMessage.appendChild(span)
      }
    }
  }, 1000);
}
