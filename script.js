// Переменные
// ==========
const headerBtn = document.querySelectorAll(".nav_title");
const gallery = document.querySelectorAll(".gallery_image");
const radiobtn = document.querySelectorAll(".gallery_list");
let items = document.querySelectorAll(".slider_blocks");
let currentItem = 0;
let isEnabled = true;
// Функции
// =======
const chooseBtn = (element, style) => {
  for (let i = 0; i < element.length; i++) {
    element[i].addEventListener("click", function(event) {
      element.forEach((el, e) => {
        if (element[e].classList.contains(style))
          element[e].classList.remove(style);
        if (!element[e].classList.contains(style)) {
          event.target.classList.add(style);
        }
      });
    });
  }
};
// хедер
// =====
chooseBtn(headerBtn, "activeList");

for (let anchor of headerBtn) {
  anchor.addEventListener("click", function(e) {
    e.preventDefault();

    const block = anchor.getAttribute("href");

    document.querySelector("." + block).scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  });
}
//  слайдер
// ========
const isbackground = () => {
  if (items[currentItem].classList.contains("slide2")) {
    document.querySelector(".slider_section").style.cssText = `
    background: #648BF0;
    border-color:#648BF0;
    `;
  }
  if (!items[currentItem].classList.contains("slide2")) {
    document.querySelector(".slider_section").style.cssText = `
    background: #f06c64;
    border-color:#ea676b;
    `;
  }
};
const changeCurrentItem = n => {
  currentItem = (n + items.length) % items.length;
};

const hideItem = direction => {
  isEnabled = false;
  items[currentItem].classList.add(direction);
  items[currentItem].addEventListener("animationend", function() {
    this.classList.remove("active", direction);
  });
};

const showItem = direction => {
  items[currentItem].classList.add("next", direction);
  items[currentItem].addEventListener("animationend", function() {
    this.classList.remove("next", direction);
    this.classList.add("active");
    isEnabled = true;
  });
};

const previousItem = n => {
  hideItem("to-left");
  changeCurrentItem(n - 1);
  showItem("from-right");
  isbackground();
};

const nextItem = n => {
  hideItem("to-right");
  changeCurrentItem(n + 1);
  showItem("from-left");
  isbackground();
};

document.querySelector(".togle.left").addEventListener("click", function() {
  if (isEnabled) {
    previousItem(currentItem);
  }
});

document.querySelector(".togle.right").addEventListener("click", function() {
  if (isEnabled) {
    nextItem(currentItem);
  }
});

// Радиобатн
chooseBtn(radiobtn, "choosen");

const reGallery = (targetStyle, imgStyle) => {
  let target = document.querySelector("." + targetStyle);
  let picture = document.querySelectorAll(".gallery_block");
  if (target.classList.contains(targetStyle)) {
    for (let i = 0; i < picture.length; i++) {
      if (!picture[i].classList.contains(imgStyle)) {
        picture[i].style.display = "none";
      }
      if (picture[i].classList.contains(imgStyle)) {
        picture[i].style.display = "";
      }
    }
  }
  if (target.classList.contains("all_btn")) {
    for (let i = 0; i < picture.length; i++) {
      picture[i].style.display = "";
    }
  }
};

document.querySelector(".web_btn").onclick = function() {
  reGallery("web_btn", "web");
};
document.querySelector(".artwork_btn").onclick = function() {
  reGallery("artwork_btn", "artwork");
};
document.querySelector(".graphic_btn").onclick = function() {
  reGallery("graphic_btn", "graphic");
};
document.querySelector(".all_btn").onclick = function() {
  reGallery("all_btn");
};
// Галерея
chooseBtn(gallery, "highlight");

//Кнопка send
// =========
document.querySelector(".button").onclick = function auth() {
  let messageCard = document.createElement("div");
  let messageAbout = document.querySelector(".title_input").value;
  let messageDescr = document.querySelector(".information_textarea").value;
  if (isEnabled) {
    messageCard.className = "message";
    document.querySelector(".information_form").after(messageCard);
    messageCard.innerHTML = `                           <h3 class="message_title">Письмо отправлено</h3>
    <h5 class="message_theme">${
      messageAbout === ''
        ? messageAbout === "Без темы"
        : "Тема: " + messageAbout
    }</h5>
    <h5 class="message_about">${
      messageDescr === undefined
        ? messageDescr === "Без описания"
        : "Описание: " + messageDescr
    }</h5>
    <button class="message_button">OK</button>`;
    isEnabled = false;
  }
  document.querySelector(".message_button").onclick = function messOff() {
    messageCard.remove();
    isEnabled = true;
  };
  // setTimeout(function() {
  //   messageCard.remove();
  //   isEnabled = true;
  // }, 6000);
};
