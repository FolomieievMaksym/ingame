function qs(element) {
   let newEl = document.querySelector(element);
   if (newEl) return newEl;
}
function qa(element) {
   let newEl = document.querySelectorAll(element);
   if (newEl) return newEl;
}
// ! Home => Hero
if (qs("body.home .cards__swiper")) {
   const swiperCards = new Swiper(".cards__swiper", {
      speed: 500,
      slidesPerView: 1,
      initialSlide: 1,
      simulateTouch: true,
      spaceBetween: 20,
      thumbs: {
         swiper: {
            el: ".hero__swiper-cards",
            slidesPerView: 3,
         },
      },
   });
}
