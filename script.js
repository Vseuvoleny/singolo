// Переменные
// ==========
const headerBtn = document.querySelectorAll(".nav_title");
const gallery = document.querySelectorAll(".gallery_image");
const radiobtn = document.querySelectorAll(".gallery_list");
let items = document.querySelectorAll(".slider_blocks");

let currentItem = 0;
let isEnabled = true;
// Общая функция для хедера и галереи
// =======
const chooseBtn = (element, style) => {
  for (let i = 0; i < element.length; i++) {
    element[i].addEventListener("click", function(event) {
      element.forEach(el => {
        if (el.classList.contains(style)) el.classList.remove(style);
        if (!el.classList.contains(style)) {
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
    if (block === "home_section") {
      document.body.scrollIntoView({
        behavior: "smooth"
      });
    } else {
      document.querySelector(`.${block}`).scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  });
}

// document.addEventListener("scroll", anchor);
// function anchor(event) {
//   event.preventDefault();
//   const curPos = window.scrollY;
//   const sections = document.querySelectorAll(".section");
//   const links = document.querySelectorAll(".nav_title");

//   sections.forEach(elem => {
//     console.log('тоже')
//     if (elem.offsetTop <= curPos && elem.offsetTop + elem.offsetHeight > curPos) {
//       links.forEach(a => {
//         console.log('тоже работает')
//         a.classList.remove("activeList");
//         if (elem.getAttribute("id") === a.getAttribute("href")) {
//           console.log('работает')
//           a.classList.add("activeList");
//         }
//       });
//     }
//   });
// }
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
// Скрины
// ======
let phones = document.querySelectorAll(".slide_img1");
let isScreenOn = false;
let darkscreen = document.createElement("div");
darkscreen.className = "screen";
phones.forEach = elem => {
  elem.addEventListener("click", function() {
    if (elem) {
      document.querySelector(".vertical").append(darkscreen);
      darkscreen.style.cssText = `
      width:188px;
      height:333px;
      left: 161px;
      bottom: 88px;`;
      isScreenOn = true;
    }

    if (elem) {
      document.querySelector(".horizontal").append(darkscreen);
      darkscreen.style.cssText = `
      width:333px;
      height:188px;
      top: 195px;
      right: 239px;`;
      isScreenOn = true;
    }
  });
};
// for (let phone of phones) {
//   phone.addEventListener("click", function() {
//     if (
//       document.querySelector(".vertical").lastChild ===
//       document.querySelector(".screen")
//     ) {
//       console.log("Сработала вторая функция");
//     }
//     if (
//       document.querySelector(".horizontal").lastChild ===
//       document.querySelector(".screen")
//     ) {
//       console.log("Сработала вторая функция");
//     }
//   });
// }

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
document.querySelector(".button").onclick = function auth(event) {
  event.preventDefault();
  let messageCard = document.createElement("div");
  let messageAbout = document.querySelector(".subject_input").value;
  let messageDescr = document.querySelector(".information_textarea").value;
  let name = document.querySelector(".title_input").value;
  let email = document.querySelector(".email_input").value;
  if (isEnabled && name && email) {
    messageCard.className = "message";
    document.querySelector(".information_form").after(messageCard);
    messageCard.innerHTML = `                           <h3 class="message_title">Письмо отправлено</h3>
    <h5 class="message_theme">${
      messageAbout === "" ? "Без темы" : "Тема: " + messageAbout
    }</h5>
    <h5 class="message_about">${
      messageDescr === ""
        ? "Без описания"
        : "Описание: " + messageDescr.substr(0, 5)
    }</h5>
    <button class="message_button">OK</button>`;
    isEnabled = false;
    document.querySelector(".information_form").reset();
  }

  document.querySelector(".message_button").onclick = function messOff() {
    document.querySelector(".message").remove();
    isEnabled = true;
  };
  setTimeout(function() {
    messageCard.remove();
    isEnabled = true;
  }, 6000);
};
