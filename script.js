// Переменные
// ==========
const headerBtn = document.querySelectorAll(".nav_title");
const gallery = document.querySelectorAll(".gallery_image");
const radiobtn = document.querySelectorAll(".gallery_list");
let items = document.querySelectorAll(".slider_blocks");
let currentItem = 0;
let isEnabled = true;

//
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
// Хедер
// =====
chooseBtn(headerBtn, "activeList");
document.addEventListener("scroll", anchor);
function anchor(event) {
  event.preventDefault();
  const curPos = window.scrollY;
  const sections = document.querySelectorAll(".section");
  const anchors = document.querySelectorAll(".nav_title");

  sections.forEach(elem => {
    if (
      elem.offsetTop <= curPos &&
      elem.offsetTop + elem.offsetHeight > curPos
    ) {
      anchors.forEach(a => {
        a.classList.remove("activeList");
        if (elem.getAttribute("id") === a.getAttribute("href").substr(1)) {
          a.classList.add("activeList");
        }
      });
    }
  });
}
//  Cлайдер
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
const buttonPhone = document.querySelectorAll(".home_button");

buttonPhone.forEach(e => {
  e.addEventListener("click", function screenOn() {
    let [vertical, horizontal, screenV, screenH] = [
      document.querySelector(".vertical"),
      document.querySelector(".horizontal"),
      document.querySelector(".screen_v"),
      document.querySelector(".screen_h")
    ];
    if (vertical.contains(e)) {
      screenV.hidden = !screenV.hidden;
    }
    if (horizontal.contains(e)) {
      screenH.hidden = !screenH.hidden;
    }
  });
});

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

//Кнопка Send
// =========
let messageBox = document.querySelector(".message_container");
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
      messageBox.style.display = "block";
      messageCard.className = "message";
      messageBox.prepend(messageCard);
      messageCard.innerHTML = `<h3 class="message_title">Письмо отправлено</h3>
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
        messageBox.style.display = "none";
        isEnabled = true;
      });

    setTimeout(function() {
      isEnabled = true;
      if (document.querySelector(".message")) {
        document.querySelector(".message").remove();
      }

      messageBox.style.display = "none";
    }, 5000);
  });

// Бургер Меню
// ===========

const burger = document.querySelector(".burger_nav");
const navigation = document.querySelector(".header_nav");
const background = document.querySelector(".background_mobile");

burger.addEventListener("click", function burgerTogle() {
  burger.classList.toggle("rotate");
  navigation.classList.toggle("mobile_sidebar");
  background.classList.toggle("active");
  navigation.classList.toggle("header_nav");
});
