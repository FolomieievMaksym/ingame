function qs(element) {
   let newEl = document.querySelector(element);
   if (newEl) return newEl;
}
function qa(element) {
   let newEl = document.querySelectorAll(element);
   if (newEl) return newEl;
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
