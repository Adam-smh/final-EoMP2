function open() {
  document.querySelector(".opennav").classList.toggle("active");
}
document.querySelector(".nav").addEventListener("click", () => {
  open();
});
document.querySelectorAll(".ref").forEach((btn) => {
  btn.addEventListener("click", open);
});
