/* NAVBAR */

window.addEventListener("scroll", () => {

    const navbar =
        document.querySelector(".navbar");

    if(window.scrollY > 50){

        navbar.style.background = "#000";

    }else{

        navbar.style.background =
        "linear-gradient(to bottom, rgba(0,0,0,0.9), transparent)";

    }

});

/* AUTOPLAY SLIDER */

const slider =
    document.getElementById("movieSlider");

let scrollAmount = 0;

setInterval(() => {

    if(slider){

        scrollAmount += 320;

        if(
            scrollAmount >=
            slider.scrollWidth -
            slider.clientWidth
        ){
            scrollAmount = 0;
        }

        slider.scrollTo({
            left: scrollAmount,
            behavior: "smooth"
        });

    }

}, 3000);

/* SEARCH */

const searchInput =
document.getElementById("searchInput");

if(searchInput){

    searchInput.addEventListener("keyup", () => {

        const value =
        searchInput.value.toLowerCase();

        const cards =
        document.querySelectorAll(".movie-card");

        cards.forEach(card => {

            const title =
            card.querySelector("h3")
            .innerText
            .toLowerCase();

            if(title.includes(value)){

                card.style.display = "block";

            }else{

                card.style.display = "none";

            }

        });

    });

}
const heroImages = [
    "banner1.jpg",
    "banner2.jpg",
    "banner3.jpg"
];