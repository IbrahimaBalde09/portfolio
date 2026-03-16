console.log("Portfolio chargé avec succès.");

/* Animation au scroll */
const revealElements = document.querySelectorAll(".reveal");

const revealOnScroll = () => {
    revealElements.forEach((element) => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const visibleOffset = 100;

        if (elementTop < windowHeight - visibleOffset) {
            element.classList.add("visible");
        }
    });
};

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);

/* Carousel dashboard */
const carousels = document.querySelectorAll("[data-carousel]");

carousels.forEach((carousel) => {
    const slides = carousel.querySelectorAll("[data-carousel-slide]");
    const prevBtn = carousel.querySelector("[data-carousel-prev]");
    const nextBtn = carousel.querySelector("[data-carousel-next]");
    const dotsContainer = carousel.parentElement.querySelector(".carousel-dots");
    const dots = dotsContainer ? dotsContainer.querySelectorAll("[data-carousel-dot]") : [];

    let currentIndex = 0;

    const updateCarousel = (index) => {
        slides.forEach((slide, i) => {
            slide.classList.toggle("active", i === index);
        });

        dots.forEach((dot, i) => {
            dot.classList.toggle("active", i === index);
        });

        currentIndex = index;
    };

    if (prevBtn) {
        prevBtn.addEventListener("click", () => {
            const newIndex = currentIndex === 0 ? slides.length - 1 : currentIndex - 1;
            updateCarousel(newIndex);
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener("click", () => {
            const newIndex = currentIndex === slides.length - 1 ? 0 : currentIndex + 1;
            updateCarousel(newIndex);
        });
    }

    dots.forEach((dot) => {
        dot.addEventListener("click", () => {
            const index = Number(dot.dataset.index);
            updateCarousel(index);
        });
    });

    updateCarousel(0);
});