
// ==============================
// TEXT SCRAMBLE EFFECT
// ==============================

const scrambleTexts = document.querySelectorAll(".scramble");

const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&";

scrambleTexts.forEach((element, elementIndex) => {

    const originalText = element.textContent;

    let iteration = 0;
    let interval = null;
    let timeout = null;

    function startScramble() {

        clearInterval(interval);
        clearTimeout(timeout);

        iteration = 0;

        interval = setInterval(() => {

            element.textContent = originalText
                .split("")
                .map((letter, index) => {

                    if (letter === " ") return " ";

                    if (index < iteration) {
                        return originalText[index];
                    }

                    return characters[
                        Math.floor(Math.random() * characters.length)
                    ];

                })
                .join("");

            iteration += 0.5;

            if (iteration >= originalText.length) {

                clearInterval(interval);

                element.textContent = originalText;

                timeout = setTimeout(startScramble, 1200);

            }

        }, 35);

    }

    setTimeout(startScramble, elementIndex * 500);

});


// ==============================
// NAVIGATION
// ==============================

const navigationLinks = document.querySelectorAll(
    ".header-nav a, .header-logo"
);

function navigateTo(id) {

    const target = document.getElementById(id);

    if (!target) return;

    target.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

    history.pushState(null, "", `#${id}`);

}

navigationLinks.forEach(link => {

    link.addEventListener("click", event => {

        event.preventDefault();

        const targetId =
            link.dataset.target ||
            link.getAttribute("href")?.replace("#", "");

        if (!targetId) return;

        navigateTo(targetId);

    });

});


// ==============================
// BROWSER HISTORY
// ==============================

window.addEventListener("popstate", () => {

    const id = location.hash.replace("#", "");

    if (!id) return;

    const target = document.getElementById(id);

    if (target) {

        target.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    }

});


// ==============================
// INITIAL HASH POSITION
// ==============================

window.addEventListener("load", () => {

    const id = location.hash.replace("#", "");

    if (!id) return;

    const target = document.getElementById(id);

    if (target) {

        target.scrollIntoView({
            behavior: "instant",
            block: "start"
        });

    }

});


// ==============================
// HOME 3D MOUSE EFFECT
// ==============================

const home = document.querySelector(".home");

const homeObject = document.querySelector(
    ".home-object-inner"
);

const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
);

const hasFinePointer = window.matchMedia(
    "(pointer: fine)"
);

if (
    home &&
    homeObject &&
    !prefersReducedMotion.matches &&
    hasFinePointer.matches
) {

    home.addEventListener("mousemove", event => {

        const rect = home.getBoundingClientRect();

        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (centerY - y) / 35;
        const rotateY = (x - centerX) / 35;

        homeObject.style.transform =
            `translateY(0) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

    });

    home.addEventListener("mouseleave", () => {

        homeObject.style.transform = "";

    });

}
