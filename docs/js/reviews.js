function qs(element) {
   let newEl = document.querySelector(element);
   if (newEl) return newEl;
}
function qa(element) {
   let newEl = document.querySelectorAll(element);
   if (newEl) return newEl;
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
