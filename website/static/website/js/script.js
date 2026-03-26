console.log("Portfolio chargé avec succès.");

/* Animation au scroll */
const revealElements = document.querySelectorAll(".reveal");

const revealOnScroll = () => {
    revealElements.forEach((element) => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const visibleOffset = 110;

        if (elementTop < windowHeight - visibleOffset) {
            element.classList.add("visible");
        }
    });
};

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);

/* Navbar au scroll */
const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {
    if (!navbar) return;

    if (window.scrollY > 24) {
        navbar.classList.add("navbar-scrolled");
    } else {
        navbar.classList.remove("navbar-scrolled");
    }
});

/* Barre de progression */
const scrollProgress = document.getElementById("scrollProgress");

const updateScrollProgress = () => {
    if (!scrollProgress) return;

    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

    scrollProgress.style.width = `${progress}%`;
};

window.addEventListener("scroll", updateScrollProgress);
window.addEventListener("load", updateScrollProgress);

/* Back to top */
const backToTop = document.getElementById("backToTop");

const toggleBackToTop = () => {
    if (!backToTop) return;

    if (window.scrollY > 450) {
        backToTop.classList.add("visible");
    } else {
        backToTop.classList.remove("visible");
    }
};

window.addEventListener("scroll", toggleBackToTop);
window.addEventListener("load", toggleBackToTop);

if (backToTop) {
    backToTop.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}

/* Curseur glow */
const cursorGlow = document.getElementById("cursorGlow");

window.addEventListener("mousemove", (e) => {
    if (!cursorGlow || window.innerWidth <= 760) return;

    cursorGlow.style.opacity = "1";
    cursorGlow.style.left = `${e.clientX}px`;
    cursorGlow.style.top = `${e.clientY}px`;
});

window.addEventListener("mouseleave", () => {
    if (!cursorGlow) return;
    cursorGlow.style.opacity = "0";
});

/* Effet tilt sur les cartes */
const cards = document.querySelectorAll(".tilt-card");

cards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
        if (window.innerWidth <= 900) return;

        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -4;
        const rotateY = ((x - centerX) / centerX) * 4;

        card.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
    });

    card.addEventListener("mouseleave", () => {
        card.style.transform = "perspective(1200px) rotateX(0deg) rotateY(0deg) translateY(0)";
    });
});

/* Compteurs */
const counters = document.querySelectorAll(".counter");
let countersStarted = false;

const animateCounters = () => {
    if (countersStarted) return;

    const heroStats = document.querySelector(".hero-stats");
    if (!heroStats) return;

    const rect = heroStats.getBoundingClientRect();
    if (rect.top > window.innerHeight - 120) return;

    counters.forEach((counter) => {
        const target = Number(counter.dataset.target || 0);
        const duration = 1200;
        const startTime = performance.now();

        const updateCount = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const value = Math.round(target * eased);

            counter.textContent = value;

            if (progress < 1) {
                requestAnimationFrame(updateCount);
            } else {
                counter.textContent = target;
            }
        };

        requestAnimationFrame(updateCount);
    });

    countersStarted = true;
};

window.addEventListener("scroll", animateCounters);
window.addEventListener("load", animateCounters);

/* Navigation active selon section */
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-links a");

const updateActiveNav = () => {
    let current = "";

    sections.forEach((section) => {
        const sectionTop = section.offsetTop - 140;
        const sectionHeight = section.offsetHeight;

        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach((link) => {
        link.classList.remove("active");
        const href = link.getAttribute("href");

        if (href === `#${current}`) {
            link.classList.add("active");
        }
    });
};

window.addEventListener("scroll", updateActiveNav);
window.addEventListener("load", updateActiveNav);

/* Filtres projets */
const filterButtons = document.querySelectorAll("[data-filter]");
const projectCards = document.querySelectorAll(".project-card[data-category]");

filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const filter = button.dataset.filter;

        filterButtons.forEach((btn) => btn.classList.remove("active"));
        button.classList.add("active");

        projectCards.forEach((card) => {
            const category = card.dataset.category;

            if (filter === "all" || category === filter) {
                card.classList.remove("is-hidden");
            } else {
                card.classList.add("is-hidden");
            }
        });

        revealOnScroll();
    });
});

/* Modales projets */
let activeModal = null;

function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;

    modal.classList.add("active");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
    activeModal = modal;
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;

    modal.classList.remove("active");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");

    if (activeModal === modal) {
        activeModal = null;
    }
}

document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && activeModal) {
        activeModal.classList.remove("active");
        activeModal.setAttribute("aria-hidden", "true");
        document.body.classList.remove("modal-open");
        activeModal = null;
    }
});