// =======
// Переменные

const vert = document.querySelector(".vertical");
const hory = document.querySelector(".horizontal");
const headerBtn = document.querySelectorAll(".nav_title");
let x = document.querySelector(".screen");
let screen = document.createElement("div");
const gallery = document.querySelector(".gallery_blocks");
const radiobtn = document.querySelector(".gallery_ul");
let selectedImg;
let selectedRadio;
// Функции
// =======

// хедер
for (let i = 0; i < headerBtn.length; i++) {
  headerBtn[i].addEventListener("click", function(event) {
    // console.log('Привет')})}
    headerBtn.forEach((element, e) => {
      if (headerBtn[e].classList.contains("active"))
        headerBtn[e].classList.remove("active");
      if (!headerBtn[e].classList.contains("active")) {
        event.target.classList.add("active");
      }
    });
  });
}
//  слайдер

// Радиобатн
radiobtn.onclick = event => {
  let target = event.target;
  while (target != this) {
    if (target.tagName == "LI") {
      console.log(target.tagName)
      choosenRadio(target);
      return;
    }
    target = target.parentNode;
  }
};
const choosenRadio = node => {
  console.log("click");
  if (selectedRadio) {
    selectedRadio.classList.remove("choosen");
  }
  selectedRadio = node;

  selectedRadio.classList.add("choosen");
};
// Галерея
gallery.onclick = event => {
  let target = event.target;
  console.log(target.tagName);
  while (target != this) {
    if (target.tagName == "IMG") {
      highlight(target);
      return;
    }

    target = target.parentNode;
    console.log(target);
  }
};
const highlight = node => {
  if (selectedImg) {
    selectedImg.classList.remove("highlight");
  }
  selectedImg = node;
  selectedImg.classList.add("highlight");
};

// Слушатели
// =========

