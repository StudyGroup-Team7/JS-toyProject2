const $navButtonList = document.querySelectorAll('.nav-list button')

$navButtonList.forEach((button) => {
  button.addEventListener('click', scrollToTabPanel)
})

function scrollToTabPanel() {
  const tabPanelId = this.parentNode.getAttribute('aria-labelledby')
  const tabPanel = document.querySelector(`#${tabPanelId}`)

  const scrollAmount = tabPanel.getBoundingClientRect().top
  window.scrollBy({ top: scrollAmount - 74, behavior: 'smooth' })
}

let move = 0
const sliderList = document.querySelector('.slider-list')
const buttonList = document.querySelectorAll('.btn-group .btn')
const itemCount = sliderList.childElementCount
const movePercent = 100 / itemCount // 증감값 25

buttonList.forEach((button) => {
  button.addEventListener('click', function () {
    if (button.classList.contains('btn-prev')) {
      move += movePercent
      if (move > 0) move = 0
      sliderList.style.transform = `translateX(${move}%)`
    }

    if (button.classList.contains('btn-next')) {
      move -= movePercent
      if (move < -75) move = -75
      sliderList.style.transform = `translateX(${move}%)`
    }
  })
})

// Word list
const words = ['javascript', 'hangman', 'computer', 'programming']

// Choose a random word from the list
let word = words[Math.floor(Math.random() * words.length)]

// Create an array to store the letters guessed by the player
let guessedLetters = []

// Create an array to store the incorrect guesses
let incorrectGuesses = []

// Display the word as underscores
let displayWord = ''
for (let i = 0; i < word.length; i++) {
  displayWord += '_'
}

// Function to update the display word with correctly guessed letters
function updateDisplayWord() {
  let newDisplayWord = ''
  for (let i = 0; i < word.length; i++) {
    if (guessedLetters.includes(word[i])) {
      newDisplayWord += word[i]
    } else {
      newDisplayWord += '_'
    }
  }
  displayWord = newDisplayWord
  document.getElementById('word').textContent = displayWord
}

// Function to handle player's guess
function guessLetter() {
  document.getElementById('guess').focus()
  let guess = document.getElementById('guess').value.toLowerCase()
  document.getElementById('guess').value = ''
  if (guessedLetters.includes(guess) || incorrectGuesses.includes(guess)) {
    // Do nothing if the letter has already been guessed
  } else if (word.includes(guess)) {
    guessedLetters.push(guess)
    updateDisplayWord()
    if (displayWord === word) {
      alert('You win!')
    }
  } else {
    incorrectGuesses.push(guess)
    document.getElementById('wrong-guesses').innerHTML =
      incorrectGuesses.join(' ')
    if (incorrectGuesses.length === 6) {
      alert('You lose! The word was ' + word + '.')
    }
  }
}

// Display the initial state of the game
updateDisplayWord()
