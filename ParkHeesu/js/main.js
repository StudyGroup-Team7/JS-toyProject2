// SCROLL
const slide = document.querySelector('#slide')
const hangman = document.querySelector('#hangman')

slide.addEventListener('click',function(){
  window.scrollTo(0,0)
})
hangman.addEventListener('click',function(){
  window.scrollTo(0,730)
})



// SLIDE
const slideEl = document.querySelectorAll(".slide")
const prev = document.querySelector(".prev")
const next = document.querySelector(".next")
const slides = [...slideEl]

let count = 0

prev.addEventListener("click",function(){
  if(count>0){
    count -= 1
  }
  sliding()
})

next.addEventListener("click",function(){
  if(count<slides.length-1){
    count += 1
  }
  sliding()
})

function sliding(){
  if(count>=0&&count<slides.length)
  slideEl.forEach(function(slide){
    slide.style.transform = `translateX(${-count*100}%)`
  })
}
