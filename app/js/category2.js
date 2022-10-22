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

   // ! Category2
   if (qs(".hero__spoiler")) {
      if (e.target.closest(".hero__spoiler + .hero__button")) {
         e.target.closest(".hero__button").parentElement.children[1].classList.toggle("opened");
         let spoilerWrapper = e.target.closest(".hero__button").parentElement.children[1].children[1];
         if (!e.target.closest(".hero__button").parentElement.children[1].classList.contains("opened")) {
            if (window.innerWidth < 743) {
               e.target.closest(".hero__button").parentElement.children[1].style.maxHeight = "154px";
            } else if (window.innerWidth < 999) {
               e.target.closest(".hero__button").parentElement.children[1].style.maxHeight = "110px";
            } else if (window.innerWidth > 999) {
               e.target.closest(".hero__button").parentElement.children[1].style.maxHeight = "88px";
            }
            spoilerWrapper.style.height = null;
            e.target.closest(".hero__button").textContent = "Дивитись більше";
         } else {
            e.target.closest(".hero__button").parentElement.children[1].style.maxHeight =
               e.target.closest(".hero__button").parentElement.children[1].scrollHeight +
               spoilerWrapper.scrollHeight +
               "px";
            spoilerWrapper.style.height = spoilerWrapper.scrollHeight + "px";
            e.target.closest(".hero__button").textContent = "Згорнути";
         }
      }
   }

   // ! Video-block
   if (qs(".video-block")) {
      if (e.target.closest(".video-block__video")) {
         if (window.innerWidth < 769 && qs(".video-block__video iframe").classList.contains("first-view")) {
            if (document.fullscreenEnabled) {
               qs(".video-block__video iframe").requestFullscreen();
               qs(".video-block__video iframe").classList.remove("first-view");
            }
         }
         e.preventDefault();
         e.target.closest(".video-block__video").firstElementChild.style.display = "none";
         let src = e.target.closest(".video-block__preview").nextElementSibling.getAttribute("data-src");
         e.target.closest(".video-block__preview").nextElementSibling.setAttribute("src", `${src}?rel=0&autoplay=1`);
      }
   }

   // ! CEO
   if (e.target.closest(".ceo__preview") || e.target.closest(".ceo__btn")) {
      e.target.closest(".ceo").classList.toggle("opened");
      let ceoWrapper = qs(".ceo__preview").nextElementSibling;
      if (!e.target.closest(".ceo").classList.contains("opened")) {
         ceoWrapper.style.height = null;
         qs(".ceo__btn").textContent = "Дивитись більше";
      } else {
         qs(".ceo__btn").textContent = "Сховати";
         ceoWrapper.style.height = ceoWrapper.scrollHeight + "px";
      }
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

// ! Reviews
qs(".reviews").addEventListener("click", clickReviews);

const popupReviews = qs(".reviews-popup");
const reviewsPopupImg = qs(".reviews-popup__item--img");
const reviewsPopupText = qs(".reviews-popup__item--text");
const reviewsPopupVideo = qs(".reviews-popup__item--video");
function clickReviews(e) {
   if (e.target.closest(".reviews__feedback")) {
      qs(".feedback-popup").classList.add("active");
      body.classList.add("lock");
   } else if (e.target.closest(".reviews__slide .reviews__img")) {
      popupReviews.classList.add("active");
      body.classList.add("lock");
      reviewsPopupImg.classList.add("active");
   } else if (e.target.closest(".reviews__slide .reviews__body--video")) {
      popupReviews.classList.add("active");
      body.classList.add("lock");
      reviewsPopupVideo.classList.add("active");
   } else if (e.target.closest(".reviews__slide .reviews__footer-btn")) {
      popupReviews.classList.add("active");
      body.classList.add("lock");
      reviewsPopupText.classList.add("active");
   }
}
qs(".reviews-popup").addEventListener("click", clickReviewsPopup);

function clickReviewsPopup(e) {
   if (e.target.closest(".reviews-popup__close")) {
      popupReviews.classList.remove("active");
      body.classList.remove("lock");
      if (reviewsPopupVideo.classList.contains("active")) {
         let src = e.target.closest(".reviews-popup__close").nextElementSibling.children[0].getAttribute("data-src");
         e.target
            .closest(".reviews-popup__close")
            .nextElementSibling.children[0].setAttribute("src", `${src}?rel=0&autoplay=0`);
      }

      if (
         reviewsPopupImg.classList.contains("active") ||
         reviewsPopupText.classList.contains("active") ||
         reviewsPopupVideo.classList.contains("active")
      ) {
         reviewsPopupImg.classList.remove("active");
         reviewsPopupText.classList.remove("active");
         reviewsPopupVideo.classList.remove("active");
      }
   } else if (
      !e.target.closest(".reviews-popup__wrapper") &&
      e.target.closest(".reviews-popup").classList.contains("active")
   ) {
      popupReviews.classList.remove("active");
      body.classList.remove("lock");
      if (reviewsPopupVideo.classList.contains("active")) {
         // 3.child[1] /.fi
         let src = e.target
            .closest(".reviews-popup")
            .firstElementChild.firstElementChild.firstElementChild.firstElementChild.children[1].firstElementChild.getAttribute(
               "data-src"
            );
         e.target
            .closest(".reviews-popup")
            .firstElementChild.firstElementChild.firstElementChild.firstElementChild.children[1].firstElementChild.setAttribute(
               "src",
               `${src}?rel=0&autoplay=0`
            );
      }

      if (
         reviewsPopupImg.classList.contains("active") ||
         reviewsPopupText.classList.contains("active") ||
         reviewsPopupVideo.classList.contains("active")
      ) {
         reviewsPopupImg.classList.remove("active");
         reviewsPopupText.classList.remove("active");
         reviewsPopupVideo.classList.remove("active");
      }
   }
}

// ! Reviews video
// reviews-popup__video
qs(".reviews-popup__video").addEventListener("click", clickReviewsVideo);
function clickReviewsVideo(e) {
   if (e.target.closest(".reviews-popup__video") || e.target.closest(".reviews-popup__video svg")) {
      if (window.innerWidth < 769 && qs(".reviews-popup__video iframe").classList.contains("first-view")) {
         if (document.fullscreenEnabled) {
            qs(".reviews-popup__video iframe").requestFullscreen();
            qs(".reviews-popup__video iframe").classList.remove("first-view");
         }
      }
      e.target.closest(".reviews-popup__video").children[1].style.display = "none";
      e.target.closest(".reviews-popup__video").children[2].style.display = "none";
      let src = e.target.closest(".reviews-popup__video").children[0].getAttribute("data-src");
      e.target.closest(".reviews-popup__video").children[0].setAttribute("src", `${src}?rel=0&autoplay=1`);
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

// ! Cards
if (qs(".cards")) {
   let cardsPreview = qa(".cards .card .card__preview");
   let cardsPreviewHeight = [];
   cardsPreview.forEach((el) => {
      cardsPreviewHeight.push(el.scrollHeight);
   });

   // Узнаем макисмальную высоту превьюшки карточки квеста
   let maxPreviewHeight = Math.max(...cardsPreviewHeight);
   //
   // Задаем базовую высоту превьюшке
   cardsPreview.forEach((el) => {
      el.style.height = maxPreviewHeight + "px";
   });
}

//! Reviews slider
if (qs(".reviews__slider")) {
   const swiperReviews = new Swiper(".reviews__slider", {
      loop: true,
      speed: 500,
      slidesPerView: 1,
      initialSlide: 0,
      simulateTouch: true,
      centeredSlides: true,
      slideToClickedSlide: true,
      spaceBetween: 24,
      pagination: {
         el: ".reviews__pagination",
         clickable: true,
      },
      navigation: {
         nextEl: ".reviews__next",
         prevEl: ".reviews__prev",
      },
      breakpoints: {
         568: {
            slidesPerView: 1.5,
         },
         700: {
            slidesPerView: 1.9299,
         },
         900: {
            slidesPerView: 2,
         },
         1200: {
            slidesPerView: 3,
            spaceBetween: 20,
            initialSlide: 1,
         },
      },
   });
}
// }, 200);
