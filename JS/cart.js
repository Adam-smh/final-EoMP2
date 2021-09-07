var cart = [];

if (window.localStorage["cart"]) {
  cart = JSON.parse(window.localStorage["cart"]);
}

function addToCart(name, price, img) {
  let item = { name: name, price: price, img: img };
  for (let x in cart) {
    if (item.name == cart[x].name) {
      return;
    }
  }
  cart.push(item);
  window.localStorage["cart"] = JSON.stringify(cart);
  console.log(JSON.parse(window.localStorage["cart"]));
}
