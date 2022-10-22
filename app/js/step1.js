function qs(element) {
   let newEl = document.querySelector(element);
   if (newEl) return newEl;
}
function qa(element) {
   let newEl = document.querySelectorAll(element);
   if (newEl) return newEl;
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
