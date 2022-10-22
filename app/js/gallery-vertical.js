function qs(element) {
   let newEl = document.querySelector(element);
   if (newEl) return newEl;
}
function qa(element) {
   let newEl = document.querySelectorAll(element);
   if (newEl) return newEl;
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
