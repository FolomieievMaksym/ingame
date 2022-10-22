function qs(element) {
   let newEl = document.querySelector(element);
   if (newEl) return newEl;
}
function qa(element) {
   let newEl = document.querySelectorAll(element);
   if (newEl) return newEl;
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
