const burger = document.querySelector(".nav-burger");
const nav = document.querySelector(".header__nav");
const closeButton = document.querySelector(".nav-close-button");
burger.addEventListener("click", function () {
    nav.style.display = "block";
});
closeButton.addEventListener("click", function () {
    nav.style.display = "none";
});