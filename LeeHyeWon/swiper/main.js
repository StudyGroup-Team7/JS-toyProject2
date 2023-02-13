const innerHead = document.querySelector(".inner_head");
const innerHeadHeight = innerHead.getBoundingClientRect().height;
const navLink = document.querySelectorAll(".nav-link");
window.addEventListener("scroll", () => {
  if (window.scrollY > 114) {
    innerHead.classList.add("show");
    showBlackNavLink();
  } else {
    innerHead.classList.remove("show");
    showWhiteNavLink();
  }
});
function showBlackNavLink() {
  navLink.forEach((item) => {
    item.classList.add("show");
  });
}

function showWhiteNavLink() {
  navLink.forEach((item) => {
    item.classList.remove("show");
  });
}
const profileLink = document.getElementById("profile-link");
const profile = document.getElementById("profile");
const imgLink = document.getElementById("img-link");
const img = document.getElementById("img");
profileLink.addEventListener("click", () => {
  window.scrollTo({
    top: profile.offsetTop - innerHeadHeight,
  });
});
imgLink.addEventListener("click", () => {
  window.scrollTo({
    top: img.offsetTop - innerHeadHeight,
  });
});

const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const imgList = document.querySelectorAll(".img-slide img");
let count = 0;
imgList.forEach((slide, index) => {
  slide.style.left = `${index * 100}%`;
});

prevBtn.addEventListener("click", () => {
  count--;
  carousel();
});

nextBtn.addEventListener("click", () => {
  count++;
  carousel();
});
function carousel() {
  imgList.forEach((slide) => {
    slide.style.transform = `translateX(-${count * 100}%)`;
  });
}

const year = document.querySelector(".year");
year.innerHTML = new Date().getFullYear();
