function qs(element) {
   let newEl = document.querySelector(element);
   if (newEl) return newEl;
}
function qa(element) {
   let newEl = document.querySelectorAll(element);
   if (newEl) return newEl;
}

//! Table swiper (step 3)
if (qs(".step3__swiper")) {
   const swiperTable = new Swiper(".step3__swiper", {
      speed: 500,
      slidesPerView: 3,
      slidesPerGroup: 3,
      initialSlide: 0,
      simulateTouch: true,
      spaceBetween: 20,
      pagination: {
         el: ".step3__pagination",
         clickable: true,
      },
      navigation: {
         nextEl: ".slider__next",
         prevEl: ".slider__prev",
      },
      breakpoints: {
         500: {
            slidesPerView: 4,
            slidesPerGroup: 4,
         },
         620: {
            slidesPerView: 5,
            slidesPerGroup: 5,
         },
         740: {
            slidesPerView: 7,
            slidesPerGroup: 7,
         },
         1000: {
            slidesPerView: 7,
            slidesPerGroup: 7,
            pagination: {
               el: ".step3__pagination",
               clickable: true,
            },
            navigation: {
               nextEl: ".step3__next",
               prevEl: ".step3__prev",
            },
         },
      },
      navigation: {
         nextEl: ".step3__btn-right",
         prevEl: ".step3__btn-left",
      },
   });
}
