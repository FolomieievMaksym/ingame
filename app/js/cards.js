function qs(element) {
   let newEl = document.querySelector(element);
   if (newEl) return newEl;
}
function qa(element) {
   let newEl = document.querySelectorAll(element);
   if (newEl) return newEl;
}
// ! Cards
if (qs(".cards")) {
   let cards = qa(".cards .card");
   let cardContent = qa(".cards .card__content");

   let cardsPreview = qa(".cards .card .card__preview");
   let cardsPreviewHeight = [];
   cardsPreview.forEach((el) => {
      cardsPreviewHeight.push(el.scrollHeight);
   });

   // Узнаем макисмальную высоту превьюшки карточки квеста
   let maxPreviewHeight = Math.max(...cardsPreviewHeight);

   let cardBody = qa(".cards .card__body");
   let cardsBodyHeight = [];
   cardBody.forEach((el) => {
      cardsBodyHeight.push(el.scrollHeight);
   });
   // Узнаем макисмальную высоту спрятанной части карточки квеста
   let maxBodyHeight = Math.max(...cardsBodyHeight);

   // В эту переменную передадим высоту превьюшки после увелечения шрифта
   let finalHeight = maxPreviewHeight;
   function resizeLayout(e) {
      if (e.target.closest(".card")) {
         let newPreviewHeight = e.target.closest(".card").children[2].firstElementChild.scrollHeight;
         // Проверяем стала ли высота превьюшки больше чем любая другая на странице
         if (newPreviewHeight > finalHeight) {
            cards.forEach((el) => {
               let maxHeight = newPreviewHeight + maxBodyHeight;
               finalHeight = newPreviewHeight;
               // Если стала - увеличиваем все превьюшки до одного размера
               el.style.height = maxHeight + "px";
            });
         }
      }
   }
   //
   // Задаем базовую высоту карточке
   cards.forEach((el) => {
      el.style.height = maxPreviewHeight + maxBodyHeight + "px";
   });
   document.body.addEventListener("pointerover", resizeLayout);
   // Возвращаем превьюшку(а точнее все тело, но ненужную его часть не видно) в область видимости карточки (в самый её низ)
   cardContent.forEach((el) => {
      el.style.top = `calc(100% - ${maxPreviewHeight}px)`;
   });
}
