function openpr() {
  document.querySelector(".admin").classList.toggle("active");
}
document.querySelector(".li").addEventListener("click", () => {
  openpr();
});

function gotoadmin() {
  window.location.href = "./admin.html";
}
document.querySelector(".ap").addEventListener("click", () => {
  gotoadmin();
});
