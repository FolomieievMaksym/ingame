function qs(element) {
   let newEl = document.querySelector(element);
   if (newEl) return newEl;
}
function qa(element) {
   let newEl = document.querySelectorAll(element);
   if (newEl) return newEl;
}
// ! Product cards

if (qs(".text-cards")) {
   const swiperCards = new Swiper(".text-cards__swiper-body", {
      speed: 500,
      slidesPerView: 1,
      initialSlide: 1,
      simulateTouch: true,
      spaceBetween: 25,
      thumbs: {
         swiper: {
            el: ".text-cards__swiper-head",
            slidesPerView: 3,
         },
      },
   });
}
