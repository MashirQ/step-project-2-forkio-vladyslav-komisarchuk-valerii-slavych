"use strict"

const button = document.querySelector('.header__nav-burger');
const menu = document.querySelector(".header__nav-list");
const burgerSpan = document.querySelector(".header__nav-burger--span");



button.addEventListener("click", (event) => {
    button.classList.toggle("header__nav-burger--active");
    menu.classList.toggle("header__nav-list--active");
    burgerSpan.classList.toggle("header__nav-burger--span--active");
});



document.addEventListener('click', e => {
    let target = e.target;
    let its_menu = target == menu || menu.contains(target);
    let its_button = target == button;
    let its_burger_span = target == burgerSpan;
    let menu_is_active = menu.classList.contains("header__nav-list--active");

    
    if (!its_menu && !its_burger_span && !its_button && menu_is_active) {
      button.classList.toggle("header__nav-burger--active");
      menu.classList.toggle("header__nav-list--active");
      burgerSpan.classList.toggle("header__nav-burger--span--active");
    }
  })