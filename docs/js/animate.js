function qs(element) {
   let newEl = document.querySelector(element);
   if (newEl) return newEl;
}
function qa(element) {
   let newEl = document.querySelectorAll(element);
   if (newEl) return newEl;
}
// ! Animate hidden items

let viewportHeight = document.documentElement.clientHeight;

const itemsToAnimate = document.querySelectorAll("[data-animate]");

// ? Базовые стили для анимируемых элементов
itemsToAnimate.forEach((el) => {
   el.parentElement.style.overflow = "hidden";
   el.style.opacity = "0";
   el.style.transform = "translateY(-120%)";
   el.style.transitionProperty = "transform, opacity";
   el.style.transitionDuration = "1s, 2s";
   el.style.transitionDelay = "0s, 0s";
   el.style.transitionTimingFunction = "ease, ease";
});

// // ? Задержка для анимируемых элементов каждого последующего слайда
// if (qs(".step3__swiper")) {
//    const ster3Slides = qs(".step3__swiper .swiper-wrapper").children;
//    let transitionDelay = 0;
//    for (let i = 0; i < ster3Slides.length; i++) {
//       let myLi = ster3Slides[i].firstElementChild.children[1].children;
//       for (let j = 0; j < myLi.length; j++) {
//          myLi[j].style.transitionDelay = `${transitionDelay}ms`;
//       }
//       transitionDelay += 200;
//    }
// }

// ? Анимация
window.addEventListener("scroll", showAnimatedItems);
function showAnimatedItems(e) {
   itemsToAnimate.forEach((el) => {
      if (el.getBoundingClientRect().top <= viewportHeight / 1.3) {
         el.style.transform = "translateX(0)";
         el.style.opacity = "1";
      }
   });
}
