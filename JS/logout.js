function lo() {
  window.localStorage.clear();
  location.reload();
}
document.querySelector(".lo").addEventListener("click", () => {
  lo();
});
