function qs(element) {
   let newEl = document.querySelector(element);
   if (newEl) return newEl;
}
function qa(element) {
   let newEl = document.querySelectorAll(element);
   if (newEl) return newEl;
}

if (qs(".hero-left-item")) {
   let cartItems = qa(".hero-left-item");
   let cartItemsHeight = cartItems[0].scrollHeight + cartItems[1].scrollHeight + cartItems[2].scrollHeight;
   console.log(cartItemsHeight);
   qs(".hero__left-items").style.maxHeight = cartItemsHeight + "px";
}
