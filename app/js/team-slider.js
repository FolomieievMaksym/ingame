if (qs(".team-block__swiper")) {
   const swiperTable = new Swiper(".team-block__swiper", {
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
         el: ".team-block-slide-pagination",
         clickable: true,
      },
      navigation: {
         nextEl: ".team-block-slide-next",
         prevEl: ".team-block-slide-prev",
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
         1400: {
            grid: {
               rows: 2,
            },
            slidesPerView: 4,
            slidesPerColumn: 4,
         },
      },
   });

   window.addEventListener("resize", changeTeamSlideHeight);
   changeTeamSlideHeight();
   function changeTeamSlideHeight(e) {
      qa(".team-block__swiper .swiper-slide").forEach((el) => {
         el.style.height = qs(".team-block-slide").scrollHeight + "px";
      });
      if (window.innerWidth < 743) {
         qs(".team-block__swiper.swiper").style.height =
            qs(".team-block__swiper .swiper-slide").scrollHeight * 3 + 40 + "px";
      } else if (window.innerWidth > 743) {
         qs(".team-block__swiper.swiper").style.height =
            qs(".team-block__swiper .swiper-slide").scrollHeight * 2 + 20 + "px";
      }
   }
}
