/* the idea behind this file is to allow users to view
the site without loging in or registering. I did this using
active classes to show the sign up option if there was no
token found. If there is a token the option wont appear. */

// checking for token
function check() {
  let ok = document.querySelector(".su");
  if (window.localStorage["jwt-token"]) {
    ok.classList.toggle("active");
  }
}

check();

/* If there isnt a token, the cart will redirect you to 
a register page */
function cart() {
  if (window.localStorage["jwt-token"]) {
    console.log("teabag");
  } else {
    window.location.href = "./signup.html";
  }
}

document.querySelector(".cart_icon").addEventListener("click", () => {
  cart();
});

let signup = document.querySelector(".su");

/* sign in button (if token is not found) will allow you
to be redirected to signup page */
function sign() {
  if (window.localStorage["jwt-token"]) {
    signup.classList.toggle(".active");
    console.log("hoe");
  } else {
    window.location.href = "./signup.html";
  }
}

document.querySelector(".su").addEventListener("click", () => {
  cart();
});
