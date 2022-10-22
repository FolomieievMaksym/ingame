"use strict";

function qs(element) {
   let newEl = document.querySelector(element);
   if (newEl) return newEl;
}
function qa(element) {
   let newEl = document.querySelectorAll(element);
   if (newEl) return newEl;
}

// setTimeout(() => {
qs(".preloader").style.opacity = "0";
qs("body").classList.remove("lock");
const burger = qs(".burger"),
   header = qs(".header"),
   body = qs("body"),
   menu = qs(".header-menu");

body.addEventListener("click", clickListeners);
function clickListeners(e) {
   // ! Burger
   if (e.target.closest(".burger")) {
      if (burger.classList.contains("active")) {
         burger.classList.remove("active");
         header.classList.remove("active");
         menu.classList.remove("active");
         body.classList.remove("lock");
         if (window.pageYOffset > qs(".header").scrollHeight / 2) {
            setTimeout(() => {
               qs(".header-top__lists").style.height = "0px";
               qs(".header-top__lists").style.overflow = "hidden";
               qs(".header-top__phone").style.height = "0px";
               qs(".header-top__phone").style.overflow = "hidden";
               qs(".header-bottom").style.height = "0px";
               qs(".header-bottom").style.overflow = "hidden";
            }, 800);
         }
      } else {
         burger.classList.add("active");
         header.classList.add("active");
         body.classList.add("lock");
         menu.classList.add("active");
         qs(".header-top__lists").style.height = qs(".header-top__lists").scrollHeight + "px";
         qs(".header-top__lists").style.overflow = "visible";
         qs(".header-top__phone").style.height = qs(".header-top__phone").scrollHeight + "px";
         qs(".header-top__phone").style.overflow = "visible";
         qs(".header-bottom").style.height = qs(".header-bottom").scrollHeight + "px";
         qs(".header-bottom").style.overflow = "visible";
         window.addEventListener("scroll", closeBurger); // Закрывает бургер при скролле в том случае, когда для Body не задан класс 'lock'
      }
   } else if (
      !e.target.closest(".burger") &&
      !e.target.closest(".header-menu__container") &&
      qs(".burger").classList.contains("active")
   ) {
      burger.classList.remove("active");
      header.classList.remove("active");
      menu.classList.remove("active");
      body.classList.remove("lock");
      window.removeEventListener("scroll", closeBurger);
   } else if (e.target.closest(".header-menu__container a")) {
      burger.classList.remove("active");
      header.classList.remove("active");
      menu.classList.remove("active");
      body.classList.remove("lock");
      window.removeEventListener("scroll", closeBurger);
   }

   // ! Filters
   if (e.target.closest(".hero__filter-block .hero__filter-btn-styles")) {
      qa(".hero__filter-btn-styles").forEach((el) => {
         console.log("remove");
         el.classList.remove("active1");
      });
      e.target.closest(".hero__filter-btn-styles").classList.add("active1");
   } else if (e.target.closest(".hero__filter-block-second .hero__filter-btn-styles")) {
      qa(".hero__filter-btn-styles").forEach((el) => {
         el.classList.remove("active2");
      });
      e.target.closest(".hero__filter-btn-styles").classList.add("active2");
   }
}
function closeBurger() {
   //Необязательная дополнительная проверка
   if (burger.classList.contains("active")) {
      burger.classList.remove("active");
      menu.classList.remove("active");
      header.classList.remove("active");
      body.classList.remove("lock");
      window.removeEventListener("scroll", closeBurger);
   }
}

if (qs(".hero__blog-swiper")) {
   const swiperTable = new Swiper(".hero__blog-swiper", {
      speed: 500,
      initialSlide: 0,
      simulateTouch: true,
      spaceBetween: 20,
      autoHeight: false,
      // watchOverflow: true,
      grid: {
         rows: 3,
      },
      pagination: {
         el: ".hero__blog-pagination",
         clickable: true,
      },
      navigation: {
         nextEl: ".hero__blog-next",
         prevEl: ".hero__blog-prev",
      },
      breakpoints: {
         744: {
            grid: {
               rows: 2,
            },
            slidesPerView: 2,
            slidesPerColumn: 2,
         },
         1000: {
            grid: {
               rows: 2,
            },
            slidesPerView: 3,
            slidesPerColumn: 3,
         },
      },
   });

   window.addEventListener("resize", changeSlideHeight);
   changeSlideHeight();
   function changeSlideHeight(e) {
      qa(".hero__blog-swiper .swiper-slide").forEach((el) => {
         el.style.height = qs(".blog-slide").scrollHeight + "px";
      });
      if (window.innerWidth < 743) {
         qs(".hero__blog-swiper.swiper").style.height =
            qs(".hero__blog-swiper .swiper-slide").scrollHeight * 3 + 40 + "px";
      } else if (window.innerWidth > 743) {
         qs(".hero__blog-swiper.swiper").style.height =
            qs(".hero__blog-swiper .swiper-slide").scrollHeight * 2 + 20 + "px";
      }
   }
}

// ! <main></main>
qs("main").style.paddingTop = qs(".header").scrollHeight + "px";

// ! Header
// window.addEventListener("resize", moveCart); // todo написать не при ресайзе, а при перевороте мобилки в другое положение (горизонталь\вертикаль)
moveCart();
function moveCart() {
   if (window.innerWidth < 1000) {
      qs(".header-top__buttons").prepend(qs("#cart"));
   } else {
      qs(".header-menu__container").append(qs("#cart"));
   }
}

//fixed header
if (window.innerWidth < 1000) {
   qs(".header-menu__container").style.paddingTop =
      qs(".header-top").scrollHeight + qs(".header-bottom").scrollHeight + 20 + "px";
   window.addEventListener("scroll", () => {
      if (window.pageYOffset > qs(".header").scrollHeight / 2) {
         // alert("more");
         qs(".header-top__lists").style.height = "0px";
         qs(".header-top__lists").style.overflow = "hidden";
         qs(".header-top__phone").style.height = "0px";
         qs(".header-top__phone").style.overflow = "hidden";
         qs(".header-bottom").style.height = "0px";
         qs(".header-bottom").style.overflow = "hidden";
         // header.style.opacity = "0.8";
      } else if (window.pageYOffset < qs(".header").scrollHeight) {
         // header.style.opacity = "1";
         qs(".header-top__lists").style.height = qs(".header-top__lists").scrollHeight + "px";
         qs(".header-top__lists").style.overflow = "visible";
         qs(".header-top__phone").style.height = qs(".header-top__phone").scrollHeight + "px";
         qs(".header-top__phone").style.overflow = "visible";
         qs(".header-bottom").style.height = qs(".header-bottom").scrollHeight + "px";
         qs(".header-bottom").style.overflow = "visible";
      }
   });
} else {
   window.addEventListener("scroll", () => {
      // console.log("scroll = " + window.pageYOffset);
      // if (window.pageYOffset > qs(".header").scrollHeight / 2) {
      if (window.pageYOffset > 100) {
         qs(".header-top").style.height = "0px";
         qs(".header-top").style.overflow = "hidden";
         qs(".header-bottom").style.height = "0px";
         qs(".header-bottom").style.overflow = "hidden";
         // } else if (window.pageYOffset < qs(".header").scrollHeight) {
      } else if (window.pageYOffset < 100) {
         qs(".header-top").style.height = qs(".header-top").scrollHeight + "px";
         qs(".header-top").style.overflow = "visible";
         qs(".header-bottom").style.height = qs(".header-bottom").scrollHeight + "px";
         qs(".header-bottom").style.overflow = "visible";
      }
   });
}

// ! Footer
// Telegram hover
document.body.addEventListener("pointerover", changeTelegramColor);
function changeTelegramColor(e) {
   if (e.type == "pointerdown") {
      if (e.target.closest(".footer-top__subscribe a")) {
         e.preventDefault();
         qa(".footer-top__subscribe .not")[0].classList.remove("hover");
         qa(".footer-top__subscribe .not")[1].classList.remove("hover");
         qa(".footer-top__subscribe .not")[0].classList.add("clicked");
         qa(".footer-top__subscribe .not")[1].classList.add("clicked");
         document.body.addEventListener("pointerup", removeStylesUp);
      }
   } else if (e.type == "pointerover") {
      if (e.target.closest(".footer-top__subscribe a")) {
         qa(".footer-top__subscribe .not")[0].classList.add("hover");
         qa(".footer-top__subscribe .not")[1].classList.add("hover");
         document.body.addEventListener("pointerdown", changeTelegramColor);
         document.body.addEventListener("pointerout", removeStylesOut);
      }
   }
}
function removeStylesUp(e) {
   console.log("up");
   qa(".footer-top__subscribe .not")[0].classList.remove("clicked");
   qa(".footer-top__subscribe .not")[1].classList.remove("clicked");
   document.body.removeEventListener("pointerdown", changeTelegramColor);
   document.body.removeEventListener("pointerup", removeStylesUp);
   document.body.removeEventListener("pointerout", removeStylesOut);
}
function removeStylesOut(e) {
   qa(".footer-top__subscribe .not")[0].classList.remove("hover");
   qa(".footer-top__subscribe .not")[1].classList.remove("hover");
   document.body.removeEventListener("pointerdown", changeTelegramColor);
   // document.body.removeEventListener("pointerup", removeStylesUp);
   document.body.removeEventListener("pointerout", removeStylesOut);
}
// }, 200);
