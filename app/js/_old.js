"use strict";

window.addEventListener("load", () => {
   function qs(element) {
      let newEl = document.querySelector(element);
      if (newEl) return newEl;
   }
   function qa(element) {
      let newEl = document.querySelectorAll(element);
      if (newEl) return newEl;
   }

   const burger = qs(".burger"),
      header = qs(".header"),
      body = qs("body"),
      menu = qs(".header-menu");

   // let srcIframePopUp = qs(".reviews-popup__video").children[0].getAttribute("src");
   let srcIframePopUp = "https://www.youtube.com/embed/z-99see1eKw";

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

      // ! Reviews
      if (qs(".reviews")) {
         const popupReviews = qs(".reviews-popup");
         const reviewsPopupImg = qs(".reviews-popup__item--img");
         const reviewsPopupText = qs(".reviews-popup__item--text");
         const reviewsPopupVideo = qs(".reviews-popup__item--video");

         if (e.target.closest(".reviews__feedback")) {
            qs(".feedback-popup").classList.add("active");
            // setTimeout(() => {
            body.classList.add("lock");
            // }, 300);
         } else if (e.target.closest(".feedback-popup__close")) {
            qs(".feedback-popup").classList.remove("active");
            body.classList.remove("lock");
         }

         if (e.target.closest(".reviews__slide .reviews__img")) {
            popupReviews.classList.add("active");
            body.classList.add("lock");
            reviewsPopupImg.classList.add("active");
         }
         if (e.target.closest(".reviews__slide .reviews__body--video")) {
            popupReviews.classList.add("active");
            body.classList.add("lock");
            reviewsPopupVideo.classList.add("active");
         }
         if (e.target.closest(".reviews__slide .reviews__footer-btn")) {
            popupReviews.classList.add("active");
            body.classList.add("lock");
            reviewsPopupText.classList.add("active");
         }
         if (e.target.closest(".reviews-popup__close")) {
            popupReviews.classList.remove("active");
            body.classList.remove("lock");
            // e.target.closest(".reviews-popup__close").nextElementSibling.children[0].pause();
            if (reviewsPopupVideo.classList.contains("active")) {
               e.target
                  .closest(".reviews-popup__close")
                  .nextElementSibling.children[0].setAttribute("src", `${srcIframePopUp}?rel=0&autoplay=0`);
               console.log(reviewsPopupText);
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
      if (qs(".reviews-popup__video")) {
         if (e.target.closest(".reviews-popup__video") || e.target.closest(".reviews-popup__video svg")) {
            if (window.innerWidth < 769 && qs(".reviews-popup__video iframe").classList.contains("first-view")) {
               if (document.fullscreenEnabled) {
                  qs(".reviews-popup__video iframe").requestFullscreen();
                  qs(".reviews-popup__video iframe").classList.remove("first-view");
               }
            }
            e.target.closest(".reviews-popup__video").children[1].style.display = "none";
            e.target.closest(".reviews-popup__video").children[2].style.display = "none";
            // e.target.closest(".reviews-popup__video").children[0].play();
            // let src = e.target.closest(".reviews-popup__video").children[0].getAttribute("src");
            e.target
               .closest(".reviews-popup__video")
               .children[0].setAttribute("src", `${srcIframePopUp}?rel=0&autoplay=1`);
         }
      }
      // todo <iframe>
      if (qs(".video-block")) {
         // ! Video-block {
         if (e.target.closest(".video-block__video")) {
            if (window.innerWidth < 769 && qs(".video-block__video iframe").classList.contains("first-view")) {
               if (document.fullscreenEnabled) {
                  qs(".video-block__video iframe").requestFullscreen();
                  qs(".video-block__video iframe").classList.remove("first-view");
               }
            }
            e.preventDefault();
            e.target.closest(".video-block__video").firstElementChild.style.display = "none";
            // let src = e.target.closest(".video-block__preview").nextElementSibling.getAttribute("src");
            e.target
               .closest(".video-block__preview")
               .nextElementSibling.setAttribute("src", `${srcIframePopUp}?rel=0&autoplay=1`);
         }
      }
      // todo <video>
      // if (qs(".video-block")) {
      //    // ! Video-block {
      //    if (e.target.closest(".video-block__preview")) {
      //       if (window.innerWidth < 769 && qs(".video-block__video video").classList.contains("first-view")) {
      //          if (document.fullscreenEnabled) {
      //             qs(".video-block__video video").requestFullscreen();
      //             qs(".video-block__video video").classList.remove("first-view");
      //          }
      //       }
      //       e.target.closest(".video-block__preview").style.display = "none";
      //       e.target.closest(".video-block__preview").nextElementSibling.style.zIndex = "5";
      //       e.target.closest(".video-block__preview").nextElementSibling.play();
      //    }
      // }

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

      // ! Choose City
      if (qs(".pop-up-city__btn")) {
         if (e.target.closest("#city-1 .pop-up-city__btn")) {
            qs("#city-1.pop-up-city").classList.remove("active");
         } else if (e.target.closest("#city-2 .pop-up-city__btn")) {
            qs("#city-2.pop-up-city").classList.remove("active");
         }
      }

      // ! Order pop-up
      if (e.target.closest(".table-column__book") || e.target.closest(".order-quest-show")) {
         qs(".order-quest-pop-up").classList.add("active");
         body.classList.add("lock");
      }
      if (e.target.closest(".order-quest-pop-up__btn-close") || e.target.closest(".order-quest-pop-up__close-button")) {
         qs(".order-quest-pop-up").classList.remove("active");
         body.classList.remove("lock");
      }

      // ! Сertificate pop-up
      if (e.target.closest(".propose-form__btn") || e.target.closest(".prize__btn")) {
         qs(".certificate-popup").classList.add("active");
         body.classList.add("lock");
      }
      //  (!e.target.closest(".certificate-popup__body") && qs(".certificate-popup").classList.contains("active"))
      if (
         e.target.closest(".certificate-popup__btn-close-wrap") ||
         e.target.closest(".certificate-popup__close-button")
      ) {
         qs(".certificate-popup").classList.remove("active");
         body.classList.remove("lock");
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

      // ! Cart
      if (qs(".hero-left-item__buttons")) {
         if (
            e.target.closest(".hero-left-item__minus") &&
            e.target.closest(".hero-left-item__minus").nextElementSibling.textContent > 0
         ) {
            let number = e.target.closest(".hero-left-item__minus").nextElementSibling.textContent;
            e.target.closest(".hero-left-item__minus").nextElementSibling.textContent = --number;
         } else if (e.target.closest(".hero-left-item__plus")) {
            let number = e.target.closest(".hero-left-item__plus").previousElementSibling.textContent;
            e.target.closest(".hero-left-item__plus").previousElementSibling.textContent = ++number;
         } else if (e.target.closest(".hero-left-item__trash")) {
            e.target.closest(".hero-left-item").remove();
         } else if (e.target.closest(".tabs__spoiler-preview")) {
            if (e.target.closest(".tabs__spoiler").classList.contains("opened")) {
               e.target.closest(".tabs__spoiler").classList.remove("opened");
               e.target.closest(".tabs__spoiler-preview").nextElementSibling.style.height = null;
            } else if (e.target.closest(".tabs__spoiler")) {
               qa(".tabs__spoiler").forEach(function (el) {
                  el.classList.remove("opened");
                  el.style.zIndex = "0";
               });
               qa(".tabs__spoiler-wrapper").forEach(function (el) {
                  el.style.height = null;
               });
               e.target.closest(".tabs__spoiler").classList.toggle("opened");
               e.target.closest(".tabs__spoiler").style.zIndex = "5";
               e.target.closest(".tabs__spoiler-preview").nextElementSibling.style.height =
                  e.target.closest(".tabs__spoiler-preview").nextElementSibling.scrollHeight + "px";
            }
         } else if (e.target.closest(".tabs__next-button")) {
            if (
               // e.target.closest(".tabs__container").firstElementChild.children[0].getAttribute("data-step") == 1 &&
               e.target.closest(".tabs__container").firstElementChild.children[0].classList.contains("active")
            ) {
               e.target.closest(".tabs__container").firstElementChild.children[0].classList.remove("active");
               e.target.closest(".tabs__container").firstElementChild.children[1].classList.add("active");
               e.target.closest(".tabs__next-button").previousElementSibling.classList.remove("disabled");
               qa(".hero__steps li")[0].classList.remove("active");
               qa(".hero__steps li")[1].classList.add("active");
            } else if (
               e.target.closest(".tabs__container").firstElementChild.children[1].classList.contains("active")
            ) {
               e.target.closest(".tabs__container").firstElementChild.children[1].classList.remove("active");
               e.target.closest(".tabs__container").firstElementChild.children[2].classList.add("active");
               qa(".hero__steps li")[1].classList.remove("active");
               qa(".hero__steps li")[2].classList.add("active");
            } else if (
               e.target.closest(".tabs__container").firstElementChild.children[2].classList.contains("active")
            ) {
               e.target.closest(".tabs__container").firstElementChild.children[2].classList.remove("active");
               e.target.closest(".tabs__container").firstElementChild.children[3].classList.add("active");
               e.target.closest(".tabs__next-button").textContent = "Оформити замовлення";
               qa(".hero__steps li")[2].classList.remove("active");
               qa(".hero__steps li")[3].classList.add("active");
            } else if (
               e.target.closest(".tabs__container").firstElementChild.children[3].classList.contains("active")
            ) {
               qs("main").classList.add("hide-content");
            }
         } else if (e.target.closest(".tabs__back-button")) {
            if (e.target.closest(".tabs__container").firstElementChild.children[3].classList.contains("active")) {
               e.target.closest(".tabs__container").firstElementChild.children[3].classList.remove("active");
               e.target.closest(".tabs__container").firstElementChild.children[2].classList.add("active");
               e.target.closest(".tabs__back-button").nextElementSibling.textContent = "Далі";
               qa(".hero__steps li")[3].classList.remove("active");
               qa(".hero__steps li")[2].classList.add("active");
            } else if (
               e.target.closest(".tabs__container").firstElementChild.children[2].classList.contains("active")
            ) {
               e.target.closest(".tabs__container").firstElementChild.children[2].classList.remove("active");
               e.target.closest(".tabs__container").firstElementChild.children[1].classList.add("active");
               qa(".hero__steps li")[2].classList.remove("active");
               qa(".hero__steps li")[1].classList.add("active");
            } else if (
               e.target.closest(".tabs__container").firstElementChild.children[1].classList.contains("active")
            ) {
               e.target.closest(".tabs__container").firstElementChild.children[1].classList.remove("active");
               e.target.closest(".tabs__container").firstElementChild.children[0].classList.add("active");
               e.target.closest(".tabs__back-button").classList.add("disabled");
               qa(".hero__steps li")[1].classList.remove("active");
               qa(".hero__steps li")[0].classList.add("active");
            }
         } else if (e.target.closest(".tabs__spoiler-list li")) {
            e.target.closest(
               ".tabs__spoiler-list li"
            ).parentElement.parentElement.parentElement.previousElementSibling.firstElementChild.textContent =
               e.target.closest(".tabs__spoiler-list li").textContent;
            e.target.closest(".tabs__spoiler-list li").parentElement.parentElement.parentElement.style.height = null;
         }
      }

      // ! Category
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

      // ! Team
      if (qs("body.team")) {
         if (e.target.closest(".hero__text + .hero__button")) {
            e.target.closest(".hero__button").previousElementSibling.classList.toggle("opened");
            // let spoilerWrapper = e.target.closest(".hero__button").parentElement.children[1].children[1];
            if (!e.target.closest(".hero__button").previousElementSibling.classList.contains("opened")) {
               if (window.innerWidth < 561) {
                  e.target.closest(".hero__button").previousElementSibling.style.maxHeight = "318px";
               }
               e.target.closest(".hero__button").textContent = "Дивитись більше";
            } else {
               e.target.closest(".hero__button").previousElementSibling.style.maxHeight =
                  e.target.closest(".hero__button").previousElementSibling.scrollHeight + "px";
               e.target.closest(".hero__button").textContent = "Згорнути";
            }
         } else if (e.target.closest(".team-block-slide__button")) {
            qs(".person-pop-up").classList.add("active");
         } else if (e.target.closest(".person-pop-up__close-icon")) {
            qs(".person-pop-up").classList.remove("active");
            qs(".person-pop-up iframe").setAttribute("src", `${srcIframePopUp}?rel=0&autoplay=0`);
         }
      }

      // ! Contacts
      if (qs(".hero-spoiler")) {
         if (e.target.closest(".hero-spoiler")) {
            if (e.target.closest(".hero-spoiler").classList.contains("opened")) {
               e.target.closest(".hero-spoiler").classList.remove("opened");
               e.target.closest(".hero-spoiler__preview").nextElementSibling.style.height = null;
            } else if (e.target.closest(".hero-spoiler")) {
               qa(".hero-spoiler").forEach(function (el) {
                  el.classList.remove("opened");
               });
               qa(".hero-spoiler__wrapper").forEach(function (el) {
                  el.style.height = null;
               });
               e.target.closest(".hero-spoiler").classList.toggle("opened");
               e.target.closest(".hero-spoiler__preview").nextElementSibling.style.height =
                  e.target.closest(".hero-spoiler__preview").nextElementSibling.scrollHeight + "px";
            }
         }
      }

      // todo ПРИ КЛИКЕ НА ПРЕВЬЮ КАРТОЧКИ В ПОП_АП_ОРДЕР_КВЕСТ
      // ! Product pop-up
      if (qs(".product-pop-up")) {
         if (e.target.closest(".product-pop-up__close-icon")) {
            qs(".product-pop-up").classList.remove("active");
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

   if (qs(".hero-spoiler")) {
      if (qs(".hero-spoiler").classList.contains("opened")) {
         let spoilerWrapper = qa(".hero-spoiler__wrapper")[0];
         spoilerWrapper.style.height = spoilerWrapper.scrollHeight + "px";
      }
   }
});
