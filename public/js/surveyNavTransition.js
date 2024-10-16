// JS for Navbar scroll animation
document.addEventListener("DOMContentLoaded", function () {
const navbar = document.getElementById("navbar");

window.addEventListener("scroll", function () {
  if (window.scrollY > 500) { // Adjust the scroll distance as needed
    navbar.style.backdropFilter = "blur(50px)";
    navbar.classList.add("scrolled");
  } else {
    navbar.style.backdropFilter = "blur(3.5px)";
    navbar.classList.remove("scrolled");
  }
});
})