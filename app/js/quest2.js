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

   // ! Step 2
   if (e.target.closest(".step2__preview")) {
      e.target.closest(".step2__spoiler").classList.toggle("opened");
      let spoilerWrapper = e.target.closest(".step2__preview").nextElementSibling;
      if (!e.target.closest(".step2__spoiler").classList.contains("opened")) {
         spoilerWrapper.style.height = null;
      } else {
         spoilerWrapper.style.height = spoilerWrapper.scrollHeight + "px";
      }
   }
   if (e.target.closest(".select__label")) {
      qs(".select__current").textContent = e.target.closest(".select__label").textContent;
      e.target.closest(".select__label").parentElement.parentElement.parentElement.classList.remove("opened");
      e.target.closest(".select__label").parentElement.parentElement.style.height = null;
   }

   // ! Order pop-up
   if (e.target.closest(".table-column__book") || e.target.closest(".order-quest-show")) {
      qs(".order-quest-pop-up").classList.add("active");
      body.classList.add("lock");
   } else if (
      e.target.closest(".order-quest-pop-up__btn-close") ||
      e.target.closest(".order-quest-pop-up__close-button") ||
      (!e.target.closest(".order-quest-pop-up__container") && qs(".order-quest-pop-up").classList.contains("active"))
   ) {
      qs(".order-quest-pop-up").classList.remove("active");
      body.classList.remove("lock");
   }
   // ! Product pop-up

   if (e.target.closest(".order-quest-pop-up .card")) {
      qs(".product-pop-up").classList.add("active");
   } else if (
      e.target.closest(".product-pop-up__close-icon") ||
      e.target.closest(".product-pop-up__close") ||
      (!e.target.closest(".product-pop-up__container") && qs(".product-pop-up").classList.contains("active"))
   ) {
      qs(".product-pop-up").classList.remove("active");
      qs(".order-quest-pop-up").classList.add("active");
   }

   // ! Gallery
   if (window.innerWidth >= 1000) {
      // ? Horizontal-gallery-pop-up
      if (qs(".horizontal-gallery")) {
         if (
            qs(".horizontal-gallery-pop-up").classList.contains("active") &&
            (e.target.closest(".horizontal-gallery-pop-up__icon-wrapper") ||
               !e.target.closest(".horizontal-gallery-pop-up__body"))
         ) {
            qs(".horizontal-gallery-pop-up").classList.remove("active");
            body.classList.remove("lock");
         } else if (e.target.closest(".horizontal-gallery__swiper-big img")) {
            qs(".horizontal-gallery-pop-up").classList.add("active");
            body.classList.add("lock");
         }
      }
      // ? Vertical-gallery-pop-up
      if (qs(".vertical-gallery")) {
         if (
            qs(".vertical-gallery-pop-up").classList.contains("active") &&
            (e.target.closest(".vertical-gallery-pop-up__icon-wrapper") ||
               !e.target.closest(".vertical-gallery-pop-up__body"))
         ) {
            qs(".vertical-gallery-pop-up").classList.remove("active");
            body.classList.remove("lock");
         } else if (e.target.closest(".vertical-gallery__swiper-big img")) {
            qs(".vertical-gallery-pop-up").classList.add("active");
            body.classList.add("lock");
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

   // ! Accordeon
   if (qs(".faq__spoiler")) {
      if (e.target.closest(".faq__spoiler")) {
         if (e.target.closest(".faq__spoiler").classList.contains("opened")) {
            e.target.closest(".faq__spoiler").classList.remove("opened");
            e.target.closest(".faq__preview").nextElementSibling.style.height = null;
         } else if (e.target.closest(".faq__spoiler")) {
            qa(".faq__spoiler").forEach(function (el) {
               el.classList.remove("opened");
            });
            qa(".faq__wrapper").forEach(function (el) {
               el.style.height = null;
            });
            e.target.closest(".faq__spoiler").classList.toggle("opened");
            e.target.closest(".faq__preview").nextElementSibling.style.height =
               e.target.closest(".faq__preview").nextElementSibling.scrollHeight + "px";
         }
      }
   }

   // ! Select order-quest-pop-up
   if (qs(".order-quest-pop-up__select-header")) {
      if (e.target.closest(".order-quest-pop-up__select-header")) {
         if (e.target.closest(".order-quest-pop-up__select").classList.contains("opened")) {
            e.target.closest(".order-quest-pop-up__select").classList.remove("opened");
            e.target.closest(".order-quest-pop-up__select-header").nextElementSibling.style.height = null;
         } else if (e.target.closest(".order-quest-pop-up__select")) {
            qa(".order-quest-pop-up__select").forEach(function (el) {
               el.classList.remove("opened");
            });
            qa(".order-quest-pop-up__select-wrapper").forEach(function (el) {
               el.style.height = null;
            });
            e.target.closest(".order-quest-pop-up__select").classList.toggle("opened");
            e.target.closest(".order-quest-pop-up__select-header").nextElementSibling.style.height =
               e.target.closest(".order-quest-pop-up__select-header").nextElementSibling.scrollHeight + "px";
         }
      }
      if (e.target.closest(".order-quest-pop-up__item")) {
         e.target.closest(
            ".order-quest-pop-up__item"
         ).parentElement.parentElement.parentElement.firstElementChild.firstElementChild.textContent =
            e.target.closest(".order-quest-pop-up__item").textContent;
         e.target.closest(".order-quest-pop-up__select").classList.remove("opened");
         e.target.closest(".order-quest-pop-up__select-wrapper").style.height = null;
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

// ! Select order-quest-pop-up
qs(".order-quest-pop-up__select-header").addEventListener("click", clickSelect);
function clickSelect() {
   if (e.target.closest(".order-quest-pop-up__select-header")) {
      if (e.target.closest(".order-quest-pop-up__select").classList.contains("opened")) {
         e.target.closest(".order-quest-pop-up__select").classList.remove("opened");
         e.target.closest(".order-quest-pop-up__select-header").nextElementSibling.style.height = null;
      } else if (e.target.closest(".order-quest-pop-up__select")) {
         qa(".order-quest-pop-up__select").forEach(function (el) {
            el.classList.remove("opened");
         });
         qa(".order-quest-pop-up__select-wrapper").forEach(function (el) {
            el.style.height = null;
         });
         e.target.closest(".order-quest-pop-up__select").classList.toggle("opened");
         e.target.closest(".order-quest-pop-up__select-header").nextElementSibling.style.height =
            e.target.closest(".order-quest-pop-up__select-header").nextElementSibling.scrollHeight + "px";
      }
   }
   if (e.target.closest(".order-quest-pop-up__item")) {
      e.target.closest(
         ".order-quest-pop-up__item"
      ).parentElement.parentElement.parentElement.firstElementChild.firstElementChild.textContent =
         e.target.closest(".order-quest-pop-up__item").textContent;
      e.target.closest(".order-quest-pop-up__select").classList.remove("opened");
      e.target.closest(".order-quest-pop-up__select-wrapper").style.height = null;
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

qs(".feedback-popup").addEventListener("click", clickFeedbackPopup);

function clickFeedbackPopup(e) {
   if (
      e.target.closest(".feedback-popup__close") ||
      (!e.target.closest(".feedback-popup__body") && qs(".feedback-popup").classList.contains("active"))
   ) {
      qs(".feedback-popup").classList.remove("active");
      body.classList.remove("lock");
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

// ! Gallery-horizontal
if (qs(".horizontal-gallery__swiper-big")) {
   const swiperHorizontalBig = new Swiper(".horizontal-gallery__swiper-big", {
      speed: 500,
      slidesPerView: 1,
      simulateTouch: true,
      spaceBetween: 12,
      sliderPerColumn: 1,
      pagination: {
         el: ".horizontal-gallery__pagination",
         clickable: true,
      },
      navigation: {
         nextEl: ".horizontal-gallery__next",
         prevEl: ".horizontal-gallery__prev",
      },
      breakpoints: {
         1000: {
            spaceBetween: 20,
         },
      },
      thumbs: {
         swiper: {
            el: ".horizontal-gallery__swiper-small",
            slidesPerView: 3,
            spaceBetween: 12,
            breakpoints: {
               500: {
                  slidesPerView: 4,
                  spaceBetween: 10,
               },
               600: {
                  slidesPerView: 5,
               },
               700: {
                  slidesPerView: 6,
               },
               1000: {
                  spaceBetween: 20,
                  slidesPerView: 6,
                  direction: "vertical",
               },
            },
         },
      },
   });
   if (window.innerWidth >= 1000) {
      const swiperHorizontalBigPopUp = new Swiper(".horizontal-gallery__swiper-big-pop-up", {
         speed: 500,
         slidesPerView: 1,
         simulateTouch: true,
         spaceBetween: 20,
         sliderPerColumn: 1,
         pagination: {
            el: ".horizontal-gallery__pagination-pop-up",
            clickable: true,
         },
         navigation: {
            nextEl: ".horizontal-gallery__next-pop-up",
            prevEl: ".horizontal-gallery__prev-pop-up",
         },
         thumbs: {
            swiper: {
               el: ".horizontal-gallery__swiper-small-pop-up",
               spaceBetween: 20,
               slidesPerView: 6,
               direction: "vertical",
            },
         },
      });
      swiperHorizontalBigPopUp.controller.control = swiperHorizontalBig; // Закомментировать, если не надо прокручивать слайды вне поп-апа
      swiperHorizontalBig.controller.control = swiperHorizontalBigPopUp;
   }
   window.addEventListener("resize", fixSlider);
   fixSlider();
   function fixSlider() {
      if (window.innerWidth >= 1000) {
         let bugSlider1 = qs(".horizontal-gallery__small-wrap");
         let normalSlider1 = qs(".horizontal-gallery__image-big").getBoundingClientRect().height;
         bugSlider1.style.maxHeight = normalSlider1 + "px";

         let bugSlider2 = qs(".horizontal-gallery__small-wrap-pop-up");
         let normalSlider2 = qs(".horizontal-gallery__image-big-pop-up").getBoundingClientRect().height;
         bugSlider2.style.maxHeight = normalSlider2 + "px";
      }
   }
}

// ! Gallery-product
if (qs(".product-gallery__swiper-big")) {
   const swiperProductBig = new Swiper(".product-gallery__swiper-big", {
      speed: 500,
      slidesPerView: 1,
      simulateTouch: true,
      spaceBetween: 12,
      sliderPerColumn: 1,
      pagination: {
         el: ".product-gallery__pagination",
         clickable: true,
      },
      navigation: {
         nextEl: ".product-gallery__next",
         prevEl: ".product-gallery__prev",
      },
      breakpoints: {
         1000: {
            spaceBetween: 20,
         },
      },
      thumbs: {
         swiper: {
            el: ".product-gallery__swiper-small",
            slidesPerView: 3,
            spaceBetween: 12,
            breakpoints: {
               500: {
                  slidesPerView: 4,
                  spaceBetween: 10,
               },
               600: {
                  slidesPerView: 5,
               },
               700: {
                  slidesPerView: 6,
               },
               1000: {
                  spaceBetween: 20,
                  slidesPerView: 6,
                  direction: "vertical",
               },
            },
         },
      },
   });

   window.addEventListener("resize", fixSlider);
   fixSlider();
   function fixSlider() {
      if (window.innerWidth >= 1000) {
         let bugSlider1 = qs(".product-gallery__small-wrap");
         let normalSlider1 = qs(".product-gallery__image-big").getBoundingClientRect().height;
         bugSlider1.style.maxHeight = normalSlider1 + "px";
         console.log("s");
         // let bugSlider2 = qs(".product-gallery__small-wrap-pop-up");
         // let normalSlider2 = qs(".product-gallery__image-big-pop-up").getBoundingClientRect().height;
         // bugSlider2.style.maxHeight = normalSlider2 + "px";
      }
   }
}

// ! Gallery-vertical
if (qs(".vertical-gallery__swiper-big")) {
   const swiperVerticalBig = new Swiper(".vertical-gallery__swiper-big", {
      speed: 500,
      slidesPerView: 1,
      initialSlide: 0,
      simulateTouch: true,
      spaceBetween: 12,
      pagination: {
         el: ".vertical-gallery__pagination",
         clickable: true,
      },
      navigation: {
         nextEl: ".vertical-gallery__next",
         prevEl: ".vertical-gallery__prev",
      },
      thumbs: {
         swiper: {
            el: ".vertical-gallery__swiper-small",
            slidesPerView: 3,
            spaceBetween: 12,
            breakpoints: {
               600: {
                  slidesPerView: 4,
                  spaceBetween: 14,
               },
               1000: {
                  spaceBetween: 20,
                  slidesPerView: 5,
               },
               1200: {
                  slidesPerView: 6,
               },
            },
         },
      },
   });

   if (window.innerWidth >= 1000) {
      const swiperVerticalBigPopUp = new Swiper(".vertical-gallery__swiper-big-pop-up", {
         speed: 500,
         slidesPerView: 1,
         simulateTouch: true,
         spaceBetween: 12,
         sliderPerColumn: 1,
         pagination: {
            el: ".vertical-gallery__pagination-pop-up",
            clickable: true,
         },
         navigation: {
            nextEl: ".vertical-gallery__next-pop-up",
            prevEl: ".vertical-gallery__prev-pop-up",
         },
         thumbs: {
            swiper: {
               el: ".vertical-gallery__swiper-small-pop-up",
               spaceBetween: 20,
               slidesPerView: 5,
               breakpoints: {
                  1200: {
                     slidesPerView: 6,
                  },
               },
            },
         },
      });
      swiperVerticalBigPopUp.controller.control = swiperVerticalBig; // Закомментировать, если не надо прокручивать слайды вне поп-апа
      swiperVerticalBig.controller.control = swiperVerticalBigPopUp;
   }
}

// ! Order-quest-pop-up
if (qs(".order-quest-pop-up__swiper")) {
   const swiperCardsPopUp = new Swiper(".order-quest-pop-up__swiper", {
      speed: 500,
      slidesPerView: 1,
      initialSlide: 2,
      simulateTouch: true,
      spaceBetween: 20,
      pagination: {
         el: ".order-quest-pop-up__pagination",
         clickable: true,
      },
      navigation: {
         nextEl: ".order-quest-pop-up__next",
         prevEl: ".order-quest-pop-up__prev",
      },
   });
}

// ! Step 1 slider
if (qs(".step1__swiper")) {
   const packSlider = new Swiper(".step1__swiper", {
      speed: 500,
      slidesPerView: 1,
      initialSlide: 1,
      simulateTouch: true,
      centeredSlides: true,
      slideToClickedSlide: true,
      spaceBetween: 24,
      pagination: {
         el: ".step1__pagination",
         clickable: true,
      },
      navigation: {
         nextEl: ".step1__next",
         prevEl: ".step1__prev",
      },
      breakpoints: {
         568: {
            slidesPerView: 1.5,
         },
         700: {
            slidesPerView: 2.048,
         },
         900: {
            slidesPerView: 2.2,
         },
         1200: {
            slidesPerView: 2.5,
            spaceBetween: 20,
         },
         1400: {
            slidesPerView: 3,
         },
      },
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
