
/* ==============================
   1. AUTO TEXT SCRAMBLE EFFECT
============================== */

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

                // 완성 후 잠시 대기하고 다시 실행
                timeout = setTimeout(startScramble, 1200);

            }

        }, 35);

    }

    // 문구마다 시작 시간을 다르게 설정
    setTimeout(startScramble, elementIndex * 500);

});


/* ==============================
   2. NAVIGATION
============================== */

const navLinks = document.querySelectorAll(
    ".header-nav a, .header-logo"
);

let navigationTimer = null;

function navigateTo(id, updateURL = true) {

    const target = document.getElementById(id);

    if (!target) {
        console.error("Section not found:", id);
        return;
    }

    if (navigationTimer) {
        clearTimeout(navigationTimer);
    }

    // 실제 섹션 위치 계산
    const rect = target.getBoundingClientRect();

    const destination = window.scrollY + rect.top;

    // URL 변경
    if (updateURL) {

        history.pushState(
            { section: id },
            "",
            "#" + id
        );

    }

    // 부드러운 스크롤
    window.scrollTo({
        top: destination,
        behavior: "smooth"
    });

}


// 네비게이션 클릭
navLinks.forEach((link) => {

    link.addEventListener("click", (event) => {

        event.preventDefault();

        const id =
            link.getAttribute("data-target") ||
            link.getAttribute("href").replace("#", "");

        navigateTo(id);

    });

});


// 뒤로 가기 / 앞으로 가기
window.addEventListener("popstate", () => {

    const id = window.location.hash.replace("#", "");

    if (id) {

        navigateTo(id, false);

    } else {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }

});


// 처음 페이지 접속 시 해시 확인
window.addEventListener("load", () => {

    const id = window.location.hash.replace("#", "");

    if (id) {

        const target = document.getElementById(id);

        if (target) {

            const destination =
                window.scrollY +
                target.getBoundingClientRect().top;

            window.scrollTo({
                top: destination,
                behavior: "instant"
            });

        }

    }

});


/* ==============================
   3. HOME 3D MOUSE EFFECT
============================== */

const homeSection = document.querySelector(".home");

const homeObject = document.querySelector(".home-object-inner");

const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
).matches;

const hasFinePointer = window.matchMedia(
    "(hover: hover) and (pointer: fine)"
).matches;


if (
    homeSection &&
    homeObject &&
    hasFinePointer &&
    !reducedMotion
) {

    homeSection.addEventListener("mousemove", (event) => {

        const rect = homeSection.getBoundingClientRect();

        const mouseX =
            (event.clientX - rect.left) / rect.width;

        const mouseY =
            (event.clientY - rect.top) / rect.height;

        const rotateX = (0.5 - mouseY) * 15;

        const rotateZ = (mouseX - 0.5) * 8;

        homeObject.style.transform = `
            translateY(-10px)
            rotateX(${rotateX}deg)
            rotateZ(${rotateZ}deg)
        `;

    });


    homeSection.addEventListener("mouseleave", () => {

        homeObject.style.transform = "";

    });

}
