
const toggleBtn = document.querySelector('.toggleBtn')
const menu = document.querySelector('.menu')
const header = document.querySelector('header')
let lastScrollHeight = 0;
toggleBtn.addEventListener('click', event => {
  menu.classList.toggle('onToggle')
  Array.from(menu.childNodes).forEach(node => {
    if(node.tagName === 'LI') node.classList.toggle('onToggle')

  })
  Array.from(toggleBtn.childNodes).forEach(node => {
    if(node.tagName === "DIV") node.classList.toggle('onToggle')
  })
})

window.addEventListener('scroll', event => {

  if ( window.scrollY > lastScrollHeight) {
    header.classList.add('onScroll')
    lastScrollHeight = window.scrollY

  }
  else {
    header.classList.remove('onScroll')
    lastScrollHeight = window.scrollY

  }
})

const slides = document.querySelector('.slides')
const prevBtn = document.querySelector('.prev-btn')
const nextBtn = document.querySelector('.next-btn')
const slidesToArray = [...slides.children]


slidesToArray.forEach( (slide, index) => {
  const src = `https://picsum.photos/${(index + 1 )* 200}/${(index + 1 )* 200}`
  const img = new Image();
  img.addEventListener('load', () => {
    slide.style.backgroundImage = `url('${src}')`;
    slide.classList.remove('loading')
  })
  img.src = src;
  slide.style.left = `${index * 100}%`

})

let count = 0;

prevBtn.addEventListener( 'click', () => {
  count--;
  translateSlides();
})
nextBtn.addEventListener( 'click', () => {
  count++;
  translateSlides();
})


function translateSlides () {
  if (count === 0) {
    prevBtn.style.visibility = 'hidden'
  }
  else if (count > 0 && count < slidesToArray.length) {
    prevBtn.style.visibility = 'visible'
  }
  else {
    count = 0;
  }
 slidesToArray.forEach( slide => {
    slide.style.transform = `translateX(${count * -100}%)`
  })
}


if (count === 0) {
  prevBtn.style.visibility = 'hidden'
}

const navBtns = document.querySelectorAll('.menu a')
const sections = document.querySelectorAll('main > section')

navBtns.forEach( (btn, index) => {
  btn.addEventListener('click', () => {
    window.scrollTo(0, sections[index].getBoundingClientRect().top)
  })
})
