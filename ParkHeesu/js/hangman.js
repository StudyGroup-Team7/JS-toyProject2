const cards = document.querySelector(".cards")
const clearEl = document.querySelector(".show-clear")

let guesses = []
let randWord;
let lifes;
let count;
let space;

// 알파벳 초기화
const playAgain = function(){
  for (let i = 97; i <= 122; i++) {
    const liEl = document.createElement("li")
    const word = String.fromCharCode(i)
    liEl.textContent = `${word}`
    cards.append(liEl)
    liEl.addEventListener("click",function(e){
      check(e)
      e.target.classList.add("active")
    })
  }
  play()
}

// 페이지 LOAD
window.addEventListener('load',playAgain)

// play again 버튼을 누르면 알파벳 초기화
const playBtn = document.querySelector('.play')
playBtn.addEventListener('click',function(){
  cards.innerHTML=""
  playAgain()
})

// 행맨 단어
const word = document.querySelector(".my-word")
const category = document.querySelector(".category")
const clue = document.querySelector(".clue")

// 게임 시작
const play = function(){
  // 랜덤 단어 선택
  let categories = words[Math.floor(Math.random()*words.length)]
  randWord = categories[Math.floor(Math.random()*categories.length)]

  // 초기화
  clearEl.innerHTML=""
  word.innerHTML=""
  clue.innerHTML = ""
  guesses = []
  lifes = 10
  count = 0
  space = 0
  life()

  // 단어 숨기기
  for(let i = 0; i < randWord.length; i++){
    const liEl = document.createElement("li")
    liEl.classList.add("guess")
    if(randWord[i]==="-"){
      liEl.textContent = "-"
      space+=1
    }else{
      liEl.textContent = "_"
    }

    // 숨긴 단어 집어넣기
    guesses.push(liEl)
    word.append(liEl)
  }
  
  // 문제 카테고리 표시
  if(categories === words[0]){
    category.innerHTML=""
    category.textContent="문제: 자료구조"
  }else{
    category.innerHTML=""
    category.textContent="문제: 디저트 브랜드"
  }

  // 힌트
  const hintBtn = document.querySelector(".hint")
  // 해당 단어의 힌트 위치
  let categoriesIndex = words.indexOf(categories)
  let hintIndex = categories.indexOf(randWord)
  // 힌트 버튼
  hintBtn.addEventListener("click",()=>{
  const hint =  hints[categoriesIndex][hintIndex]
  clue.textContent = hint
  })
  
}
// 카드 선택
const check = function(e){
  const guess = e.target.textContent.toUpperCase()
  if(e.target.className != "active"){
    for(let i = 0; i < randWord.length; i++){
      if(randWord[i]===guess){
        guesses[i].innerHTML = guess
        count+=1
      }
    }
    // 잘못된 카드 선택시 목숨 -1
    if(randWord.indexOf(guess)===-1){
      lifes-=1
    }
  }
  life()
}
// 목숨
const lifeEl = document.querySelector(".life")
const life = function(){ // 패배
  lifeEl.textContent=`LIFE: ${lifes}`
  if(lifes < 1){
    clearEl.textContent="...YOU LOSE..."
    gameOver()
  }else{ // 승리
    for(let i=0; i < guesses.length; i++){
      if(count + space === guesses.length){
        clearEl.textContent="!!!YOU WIN!!!"
        gameOver()
      }
    }
  }
}

const gameOver = function(){
  const card = document.querySelectorAll(".cards li")
  for(let i of card){
    i.classList.add("active")
  }
}


// 단어 모음
const words = [
  ["STACK","QUEUE","STACK-OVERFLOW","HEAP","EVENT-LOOP","ARRAY",
  "LINKED-LIST","TREE","HASHING","SET","MAP","RECURSION","MEMOIZATION"],
  ["STARBUCKS","EDIYA COFFEE","MEGA-COFFEE","A-TWOSOME-PLACE","PARISBAGUETTE",
  "BASKINROBBINS","TOUS-LES-JOURS","HAAGENDAZS"]
]
// 힌트 모음
const hints = [
  [
    "후입선출의 자료구조",
    "입력한 순서대로 처리하는 자료구조",
    "STACK 영역의 지정된 메모리가 넘치는 현상",
    "이진 트리 구조",
    "스레드 안에서 스케줄링과 실행의 역할",
    "연관된 데이터를 모아서 관리하기 위한 자료구조",
    "각 노드가 데이터와 포인터를 가지고 한 줄로 연결되어 있는 자료구조",
    "계층적인 자료를 표현하는 데 이용되는 자료구조",
    "키와 값으로 매핑되는 과정",
    "중복된 데이터가 들어갈 수 없고 순서가 없는 집합",
    "Key와 Value의 한쌍으로 이루어지는 데이터의 집합",
    "함수 안에서 다시 자신을 호출",
    "이전에 계산한 값을 메모리에 저장함으로써 동일한 계산의 반복 수행을 제거하여 프로그램 실행 속도를 빠르게 하는 기술"
  ],
  [
    "허먼 멜빌의 유명한 소설 모비 딕에 등장하는 포경선 피쿼드 호의 일등항해사 이름에서 가져온 커피 브랜드",
    "에티오피아의 부족명인 동시에 대륙의 유일한 황제라는 뜻을 갖고 있는 커피 브랜드",
    "대용량 사이즈로 유명한 커프 브랜드",
    "'혼자 또는 둘이서 또는 셋 이상'이서도 즐길 수 있다는 뜻의 커피 브랜드",
    "프랑스 정통 베이커리를 지향하는 고급 베이커리 브랜드",
    "한 달 내내 매일 한 가지씩 맛볼 수 있는 아이스크림 브랜드",
    "프랑스어로 '매일매일' 이라는 뜻을 가지고 있는 베이커리 브랜드",
    "편의점 고오급 아이스크림"
  ]
]