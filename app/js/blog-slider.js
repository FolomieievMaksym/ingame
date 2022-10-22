if (qs(".hero__blog-swiper")) {
   const swiperTable = new Swiper(".hero__blog-swiper", {
      speed: 500,
      initialSlide: 0,
      simulateTouch: true,
      spaceBetween: 20,
      autoHeight: false,
      // watchOverflow: true,
      grid: {
         rows: 3,
      },
      pagination: {
         el: ".hero__blog-pagination",
         clickable: true,
      },
      navigation: {
         nextEl: ".hero__blog-next",
         prevEl: ".hero__blog-prev",
      },
      breakpoints: {
         744: {
            grid: {
               rows: 2,
            },
            slidesPerView: 2,
            slidesPerColumn: 2,
         },
         1000: {
            grid: {
               rows: 2,
            },
            slidesPerView: 3,
            slidesPerColumn: 3,
         },
      },
   });

   window.addEventListener("resize", changeSlideHeight);
   changeSlideHeight();
   function changeSlideHeight(e) {
      qa(".hero__blog-swiper .swiper-slide").forEach((el) => {
         el.style.height = qs(".blog-slide").scrollHeight + "px";
      });
      if (window.innerWidth < 743) {
         qs(".hero__blog-swiper.swiper").style.height =
            qs(".hero__blog-swiper .swiper-slide").scrollHeight * 3 + 40 + "px";
      } else if (window.innerWidth > 743) {
         qs(".hero__blog-swiper.swiper").style.height =
            qs(".hero__blog-swiper .swiper-slide").scrollHeight * 2 + 20 + "px";
      }
   }
}
