function File(preview, input) {
  const file = input.files[0];
  const reader = new FileReader();
  reader.addEventListener(
    "load",
    function () {
      preview.src = reader.result;
    },
    false
  );

  if (file) {
    reader.readAsDataURL(file);
  }
}

function fetchProducts(url) {
  fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `jwt ${window.localStorage["jwt-token"]}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      products = data.products;
      let container = document.querySelector(".productcontainer");
      container.innerHTML = "";
      products.forEach((product) => {
        container.innerHTML += `<div class="product" id="${product[0]}">
                                          <img class="fu" src="${product[3]}" alt="">
                                          <h6 class="productName">${product[2]}</h6>
                                          <p class="price">R${product[6]}</p>
                                          <div class="buttonContainer">
                                          <button class="ugh" onclick="deleteP(this)">Delete</button>
                                          </div>
                                        </div>`;
      });
      let productElements = document.querySelectorAll(".product");
      productElements.forEach((product) => {
        product.addEventListener("click", (e) => {
          toggleModal();
          fetch(
            `https://serene-sea-89440.herokuapp.com/view-product/${e.currentTarget.id}`
          )
            .then((res) => res.json())
            .then((data) => {
              console.log(data);
              product = data.product;
              console.log(product[2]);
              document.querySelector(".modal").id = product[0];
              document.querySelector(".modal").innerHTML = `
                  <button class="closeM" onclick="location.reload()">X</button>
                  <img class="mImg" src="${product[3]}" alt="">
                  <div class="modalstuff">
                    <div class="info">
                      <h3>Name</h3>
                      <input class="mProductName" type="text" placeholder="Name" value="${product[2]}"/>
                      <h3>Category</h3>
                      <input class="mProductCategory" type="text" placeholder="Category" value="${product[4]}"/>
                      <h3>Description</h3>
                      <input class="mProductDescription" type="message" placeholder="Description" value="${product[5]}"/>
                      
                      <h3>Price</h3>
                      <input class="mProductPrice" type="number" placeholder="Price" value="${product[6]}"/>
                      
                      <h3>Image</h3>
                      <input class="mProductImage" type="file" onchange="File(document.querySelector('.mImg'), document.querySelector(".mProductImage))" />
                      <button class="submitEdit" onclick="edit(document.querySelector('.modal'))">Save Changes</button>
                    </div>
                  </div>
                  `;
            });
        });
      });
    });
}

fetchProducts(
  `https://serene-sea-89440.herokuapp.com/get-user-products/${window.localStorage["user_id"]}`
);

function toggleModal() {
  document.querySelector(".modalouter").classList.toggle("active");
}

function edit(e) {
  let product_id = parseInt(e.id);
  let name = document.querySelector(".mProductName").value;
  let cat = document.querySelector(".mProductCategory").value;
  let desc = document.querySelector(".mProductDescription").value;
  let price = document.querySelector(".mProductPrice").value;
  let img = document.querySelector(".mImg").src;

  console.log(name, cat, desc, price, img, product_id);

  fetch(
    `https://serene-sea-89440.herokuapp.com/edit-product/${product_id}/`,

    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `jwt ${window.localStorage["jwt-token"]}`,
      },
      body: JSON.stringify({
        product_name: name,
        product_image: img,
        product_category: cat,
        product_description: desc,
        product_price: price,
      }),
    }
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      location.reload();
    });
}

function deleteP(e) {
  fetch(
    `https://serene-sea-89440.herokuapp.com/delete-product/${e.parentElement.parentElement.id}/`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `jwt ${window.localStorage["jwt-token"]}`,
      },
    }
  )
    .then((res) => res.json())
    .then((data) => console.log(data));
}

function add() {
  let name = document.querySelector(".iName").value;
  let img = document.querySelector(".dImg").src;
  let cat = document.querySelector(".iCategory").value;
  let desc = document.querySelector(".iDescription").value;
  let price = document.querySelector(".iPrice").value;

  console.log(name, cat, desc, price, img);

  if (!name || !img || !cat || !desc || !price) {
    alert("please enter all fields");
    return;
  }
  fetch(
    `https://serene-sea-89440.herokuapp.com/add-product/${parseInt(
      window.localStorage["user-id"]
    )}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `jwt ${window.localStorage["jwt-token"]}`,
      },
      body: JSON.stringify({
        product_name: name,
        product_image: img,
        product_category: cat,
        product_description: desc,
        product_price: price,
      }),
    }
  )
    .then((res) => {
      res.json();
    })
    .then((data) => {
      console.log(data);
      // if (data.status_code != 200) {
      //   alert(data.message);
      // }
    });
}
let form = document.querySelector(".idk");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  add();
});
