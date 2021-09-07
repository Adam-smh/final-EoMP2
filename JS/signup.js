/* the idea behind this file is to allow users to view
the site without loging in or registering. I did this using
active classes to show the sign up option if there was no
token found. If there is a token the option wont appear. */

// checking for token
function check() {
  let other = document.querySelector(".li");
  let user = window.localStorage.username;
  let ok = document.querySelector(".su");
  if (window.localStorage["jwt-token"]) {
    ok.classList.toggle("active");
    other.classList.toggle("active");
    document.getElementById("li").innerHTML = user;
  }
}

check();

/* If there isnt a token, the cart will redirect you to 
a register page */
function carto() {
  if (window.localStorage["jwt-token"]) {
    document.querySelector(".cartContainer").classList.toggle("active");
  } else {
    window.location.href = "./signup.html";
  }
}

document.querySelector(".cart_icon").addEventListener("click", () => {
  carto();
});
document.querySelector(".close").addEventListener("click", () => {
  carto();
});

let signup = document.querySelector(".su");

/* sign in button (if token is not found) will allow you
to be redirected to signup page */
function sign() {
  console.log("hoe");
  if (window.localStorage["jwt-token"]) {
    signup.classList.toggle("active");
    console.log("hoe");
  } else {
    window.location.href = "./signup.html";
  }
}

document.querySelector(".su").addEventListener("click", () => {
  carto();
  sign();
});
