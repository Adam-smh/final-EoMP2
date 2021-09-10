/* function used to toggle between the
admin menu active class using the username as a button*/

function openpr() {
  document.querySelector(".admin").classList.toggle("active");
}
document.querySelector(".li").addEventListener("click", () => {
  openpr();
});

/* a function allowing the button to the admin page*/

function gotoadmin() {
  window.location.href = "./admin.html";
}
document.querySelector(".ap").addEventListener("click", () => {
  gotoadmin();
});
