// Переменные
// ==========
const headerBtn = document.querySelectorAll(".nav_title");
const gallery = document.querySelectorAll(".gallery_image");
const radiobtn = document.querySelectorAll(".gallery_list");
let items = document.querySelectorAll(".slider_blocks");
let currentItem = 0;
let isEnabled = true;

// const galleryNav = document.querySelector(".gallery_ul");
// Общая функция для хедера и галереи
// ==================================
const chooseBtn = (element, style) => {
  for (let elem of element) {
    elem.addEventListener("click", function(event) {
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

// for (let anchor of headerBtn) {
//   anchor.addEventListener("click", function(e) {
//     // e.preventDefault();

//     const block = anchor.getAttribute("href").substr(1);
//     if (block === "home_section") {
//       document.body.scrollIntoView({
//         behavior: "smooth"
//       });
//     } else {
//       document.querySelector(`.${block}`).scrollIntoView({
//         behavior: "smooth",
//         block: "start"
//       });
//     }
//   });
// }

document.addEventListener("scroll", anchor);
function anchor(event) {
  event.preventDefault();
  const curPos = window.scrollY;
  const sections = document.querySelectorAll(".section");
  const links = document.querySelectorAll(".nav_title");

  sections.forEach(elem => {
    if (
      elem.offsetTop <= curPos &&
      elem.offsetTop + elem.offsetHeight > curPos
    ) {
      links.forEach(a => {
        a.classList.remove("activeList");
        if (elem.getAttribute("id") === a.getAttribute("href").substr(1)) {
          a.classList.add("activeList");
        }
      });
    }
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
  hideItem("to-right");
  changeCurrentItem(n - 1);
  showItem("from-left");
  isbackground();
};

const nextItem = n => {
  hideItem("to-left");
  changeCurrentItem(n + 1);
  showItem("from-right");
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

// Блок с навигацией и галлерей
// ============================
for (let el of radiobtn) {
  el.addEventListener("click", function() {
    radiobtn.forEach(el => {
      if (el.classList.contains("choosen")) el.classList.remove("choosen");
      if (!el.classList.contains("choosen"))
        event.target.classList.add("choosen");
    });
    if (el.classList.contains("choosen")) {
      document.querySelectorAll(".gallery_block").forEach(elem => {
        elem.style.order = Math.floor(
          1 + Math.random() * document.querySelectorAll(".gallery_block").length
        );
      });
    }
  });
}
chooseBtn(gallery, "highlight");

//Кнопка send
// =========
let messageCard = document.createElement("div");
document
  .querySelector(".information_form")
  .addEventListener("submit", function auth(event) {
    event.preventDefault();

    let messageAbout = document.querySelector(".subject_input").value;
    let messageDescr = document.querySelector(".information_textarea").value;
    let name = document.querySelector(".title_input").value;
    let email = document.querySelector(".email_input").value;
    if (isEnabled && name && email) {
      messageCard.className = "message";
      document.querySelector(".information_form").after(messageCard);
      messageCard.innerHTML = `                           <h3 class="message_title">Письмо отправлено</h3>
    <h5 class="message_theme">${
      messageAbout === "" ? "Без темы" : `Тема: ${messageAbout}`
    }</h5>
    <h5 class="message_about">${
      messageDescr === ""
        ? "Без описания"
        : `Описание: " ${messageDescr.substr(0, 5)}`
    }</h5>
    <button class="message_button">OK</button>`;
      isEnabled = false;
      document.querySelector(".information_form").reset();
    }
    document
      .querySelector(".message_button")
      .addEventListener("click", function removeMess() {
        document.querySelector(".message").remove();
        isEnabled = true;
      });

    setTimeout(function() {
      isEnabled = true;
      document.querySelector(".message").remove();
    }, 5000);
  });
if (messageCard) {
}
