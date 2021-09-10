let Url = "https://serene-sea-89440.herokuapp.com/show-products/";
let productspg = document.querySelector(".products");

function getProducts(url) {
  fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `jwt ${window.localStorage["jwt-token"]}`,
    },
  })
    .then((results) => results.json())
    .then((data) => {
      console.log(data);
      products = data.products;
      productspg.innerHTML = "";
      products.forEach((product) => {
        productspg.innerHTML += `<div class="item" id="${product[0]}">
                                    <img class="productimg" src="${product[3]}" alt="">
                                    <h3 class="productname">${product[2]}</h3>
                                    <p class="productprice">R${product[6]}</p>
                                    <button class="addbtn">Add to cart</button>
                                    <div>`;
        document.querySelectorAll(".addbtn").forEach((btn) => {
          btn.addEventListener("click", (e) => {
            if (!window.localStorage["jwt-token"]) {
              window.location.href = "./signup.html";
            } else {
              item = e.currentTarget.parentElement;
              addToCart(
                item.querySelector(".productname").innerHTML,
                item.querySelector(".productprice").innerHTML,
                item.querySelector(".productimg").src
              );
            }
          });
        });
      });
    });
}

getProducts(Url);

cart = JSON.parse(window.localStorage["cart"]);

function showCart(cart) {
  console.log(cart);
  var total = 0;
  document.querySelector(".innerpc").innerHTML = "";
  cart.forEach((item) => {
    document.querySelector(".innerpc").innerHTML += `<div class="items">
      <img class="pimg" src="${item.img}" alt="" />
      <div class="infoContainer">
        <div class="namePriceContainer">
          <h3>${item.name}</h3>
          <p>${item.price}</p>
        </div>
        <div class="qtyRemoveContainer">
          <button class="removeButton" id="${item.name}"  onclick="removeFromCart(this.id)">Remove</button>
        </div>
      </div>
    </div>`;

    price = item.price.split("");

    total += parseInt(price.splice(1, price.length).join(""));
  });
  document.querySelector(".innerpc").innerHTML += ` <div class="totalContainer">
                                                  <p class="totalHeading">Total: </p><p class="total">R${total}</p>    
                                              </div>`;
}

showCart(cart);

function removeFromCart(itemName) {
  console.log(itemName);
  for (let x in cart) {
    if (itemName == cart[x].name) {
      cart.splice(x, 1);
      console.log(cart);
      window.localStorage["cart"] = JSON.stringify(cart);
    }
  }

  showCart(cart);
}
