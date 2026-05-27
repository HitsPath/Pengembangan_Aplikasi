// HAMBURGER
const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("navMenu");

hamburger.addEventListener("click", () => {
    navMenu.classList.toggle("active");
});

// SMOOTH SCROLL
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", function(e){
        e.preventDefault();
        document.querySelector(this.getAttribute("href"))
        .scrollIntoView({behavior:"smooth"});
    });
});

// ANIMASI SCROLL
const fades = document.querySelectorAll(".fade");

function showOnScroll() {
    fades.forEach(el => {
        const top = el.getBoundingClientRect().top;
        if(top < window.innerHeight - 100){
            el.classList.add("show");
        }
    });
}

window.addEventListener("scroll", showOnScroll);
showOnScroll();