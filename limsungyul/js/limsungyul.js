//NAV FIXED EFFECT
const toggleBtn = document.querySelector(".toggleBtn");
const menu = document.querySelector(".menu");
const header = document.querySelector("header");
let lastScrollHeight = 0;
toggleBtn.addEventListener("click", onToggle)

function onToggle() {
  menu.classList.toggle("onToggle");
  Array.from(menu.childNodes).forEach((node) => {
    if (node.tagName === "LI") node.classList.toggle("onToggle");
  });
  Array.from(toggleBtn.childNodes).forEach((node) => {
    if (node.tagName === "DIV") node.classList.toggle("onToggle");
  });
}

window.addEventListener(
  "scroll",
  throttle((event) => {
    if (window.scrollY > lastScrollHeight) {
      header.classList.add("onScroll");
      lastScrollHeight = window.scrollY;
    } else {
      header.classList.remove("onScroll");
      lastScrollHeight = window.scrollY;
    }
  }, 100)
);
//SCROLL THROTTLE
function throttle(callback, limit) {
  let wait = false;
  return function () {
    //CLOSURE
    if (!wait) {
      callback();
      wait = true;
      setTimeout(function () {
        wait = false;
      }, limit);
    }
  };
}
//NAV SCROLL ON BTN CLICKED
const navBtns = document.querySelectorAll(".menu a");
const sections = document.querySelectorAll("main > section");

navBtns.forEach((btn, index) => {
  btn.addEventListener("click", () => {
    const headerHeight = parseInt(getComputedStyle(header)
    .getPropertyValue("height")
    .slice(0, -2));

    window.scrollTo(0, sections[index].getBoundingClientRect().top + window.scrollY - headerHeight);
    onToggle();
  });
});

//SLIDES
const slides = document.querySelector(".slides");
const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");
const slidesToArray = [...slides.children];

slidesToArray.forEach((slide, index) => {
  const src = `https://picsum.photos/${(index + 1) * 200}/${(index + 1) * 200}`;
  const img = new Image();
  img.addEventListener("load", () => {
    slide.style.backgroundImage = `url('${src}')`;
    slide.classList.remove("loading");
  });
  img.src = src;
  slide.style.left = `${index * 100}%`;
});

let count = 0;

prevBtn.addEventListener("click", () => {
  count--;
  translateSlides();
});
nextBtn.addEventListener("click", () => {
  count++;
  translateSlides();
});

function translateSlides() {
  if (count === 0) {
    prevBtn.style.visibility = "hidden";
  } else if (count > 0 && count < slidesToArray.length) {
    prevBtn.style.visibility = "visible";
  } else {
    count = 0;
    prevBtn.style.visibility = "hidden";
  }
  slidesToArray.forEach((slide) => {
    slide.style.transform = `translateX(${count * -100}%)`;
  });
}

if (count === 0) {
  prevBtn.style.visibility = "hidden";
}

//HANGMAN
const alphabets = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];

const wordBtns = document.querySelector(".wordBtns");
const answers = [
  { answer: "ARRAY",
    hint : "storing a collection of multiple items under a single variable name, and has members" },
  { answer: "PROTOTYPE",
    hint : "the mechanism by which JavaScript objects inherit features from one another" },
  { answer: "HTML",
    hint : "Hypertext Markup Language" },
  { answer: "JAVASCRIPT",
    hint : "a programming language that is one of the core technologies of the World Wide Web, alongside HTML and CSS" },
];

let curAnswer;
let guessArr;
let life = 7;

const answer = document.querySelector(".answer");
const hint = document.querySelector(".hint")

renderWordBtns();
setAnswer();
renderGuess();

function renderWordBtns() {
  alphabets.forEach((alphabet) => {
    const alphabetBtn = document.createElement("button");
    alphabetBtn.classList.add("wordBtn");
    alphabetBtn.textContent = alphabet.toUpperCase();
    alphabetBtn.addEventListener("click", onAlphabetBtnClicked);
    wordBtns.append(alphabetBtn);
  });
}

hint.addEventListener('click', onHintClicked, {once: true}) 

function onHintClicked() {
  hint.textContent = curAnswer.hint
}

function setAnswer() {
  curAnswer = answers[Math.floor(Math.random() * answers.length)]
  guessArr = new Array(curAnswer.answer.length).fill(false)
}

function renderGuess() {
  answer.textContent = ""
  guessArr.forEach((guess, index) => {
    answer.append( guess ? curAnswer.answer[index] : " _")
  })
}

function onAlphabetBtnClicked(event) {

  if (life > 0) {
    checkGuess(event.target.textContent)
    event.target.disabled = true;
  }
  else {
    alert("game over")
  }
}

function checkGuess(guess) {
  let hit
  Array.from(curAnswer.answer).forEach((letter, index) => {
    if ( letter === guess.toUpperCase() ) {
      guessArr[index] = true
      hit = true;
    }
  })
  renderGuess();
  if(!hit) {
    life < 7 ? drawNext() : drawScaffold();
    life--;
  }
}

function startGame() {
  displayHidden();
  renderWordBtns();
}

//Draw Hangman using canvas
let canvas = document.querySelector(".hangman-canvas");
let ctx = canvas.getContext("2d");
ctx.scale(0.3, 0.3);
ctx.lineWidth = 9

// Draw the hangman scaffold
function drawScaffold() {
  ctx.beginPath();
  ctx.moveTo(50, 450);
  ctx.lineTo(50, 50);
  ctx.lineTo(400, 50);
  ctx.lineTo(400, 75);
  ctx.stroke();
}

// Draw the hangman head
function drawHead() {
  ctx.beginPath();
  ctx.arc(400, 125, 50, 0, 2 * Math.PI);
  ctx.stroke();
}

// Draw the hangman body
function drawBody() {
  ctx.beginPath();
  ctx.moveTo(400, 175);
  ctx.lineTo(400, 350);
  ctx.stroke();
}

// Draw the hangman left arm
function drawLeftArm() {
  ctx.beginPath();
  ctx.moveTo(400, 225);
  ctx.lineTo(350, 250);
  ctx.stroke();
}

// Draw the hangman right arm
function drawRightArm() {
  ctx.beginPath();
  ctx.moveTo(400, 225);
  ctx.lineTo(450, 250);
  ctx.stroke();
}

// Draw the hangman left leg
function drawLeftLeg() {
  ctx.beginPath();
  ctx.moveTo(400, 350);
  ctx.lineTo(350, 400);
  ctx.stroke();
}

// Draw the hangman right leg
function drawRightLeg() {
  ctx.beginPath();
  ctx.moveTo(400, 350);
  ctx.lineTo(450, 400);
  ctx.stroke();
}

// Draw the next part of the hangman
function drawNext() {
  switch (life) {
    case 6:
      drawHead();
      break;
    case 5:
      drawBody();
      break;
    case 4:
      drawLeftArm();
      break;
    case 3:
      drawRightArm();
      break;
    case 2:
      drawLeftLeg();
      break;
    case 1:
      drawRightLeg();
      break;
  }
}





