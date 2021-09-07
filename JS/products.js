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
