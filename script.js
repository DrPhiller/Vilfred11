/* ======================================================
   VILFRED FYLDER 11 ÅR
   script.js
====================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* ============================================
       COUNTDOWN
    ============================================ */

    const countdown = document.getElementById("countdown");

    // Lørdag 29. august 2026 kl. 14:00
    const eventDate = new Date(2026, 7, 29, 14, 0, 0).getTime();

    function updateCountdown() {

        if (!countdown) return;

        const now = new Date().getTime();

        const distance = eventDate - now;

        if (distance <= 0) {

            countdown.innerHTML = `
                <div class="count-item">
                    <span>🎉</span>
                    <small>Kampen er startet!</small>
                </div>
            `;

            launchConfetti();

            clearInterval(timer);

            return;

        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));

        const hours = Math.floor(
            (distance % (1000 * 60 * 60 * 24)) /
            (1000 * 60 * 60)
        );

        const minutes = Math.floor(
            (distance % (1000 * 60 * 60)) /
            (1000 * 60)
        );

        const seconds = Math.floor(
            (distance % (1000 * 60)) /
            1000
        );

        countdown.innerHTML = `

            <div class="count-item">
                <span>${days}</span>
                <small>Dage</small>
            </div>

            <div class="count-item">
                <span>${hours}</span>
                <small>Timer</small>
            </div>

            <div class="count-item">
                <span>${minutes}</span>
                <small>Min.</small>
            </div>

            <div class="count-item">
                <span>${seconds}</span>
                <small>Sek.</small>
            </div>

        `;

    }

    updateCountdown();

    const timer = setInterval(updateCountdown, 1000);

    /* ============================================
       SCROLL ANIMATION
    ============================================ */

    const hiddenElements = document.querySelectorAll(".hidden");

    const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("show");

            }

        });

    }, {

        threshold:0.15

    });

    hiddenElements.forEach(el => observer.observe(el));

    /* ============================================
       BACK TO TOP BUTTON
    ============================================ */

    const topButton = document.getElementById("topButton");

    if(topButton){

        window.addEventListener("scroll",()=>{

            if(window.scrollY>400){

                topButton.classList.add("visible");

            }else{

                topButton.classList.remove("visible");

            }

        });

        topButton.addEventListener("click",()=>{

            window.scrollTo({

                top:0,

                behavior:"smooth"

            });

        });

    }

    /* ============================================
       HERO PARALLAX
    ============================================ */

    const hero = document.querySelector(".hero");

    if(hero){

        window.addEventListener("scroll",()=>{

            if(window.innerWidth>768){

                hero.style.backgroundPositionY =
                    (window.pageYOffset*0.35)+"px";

            }

        });

    }

    /* ============================================
       SMOOTH SCROLL
    ============================================ */

    document.querySelectorAll('a[href^="#"]').forEach(anchor=>{

        anchor.addEventListener("click",function(e){

            e.preventDefault();

            const target=document.querySelector(
                this.getAttribute("href")
            );

            if(target){

                target.scrollIntoView({

                    behavior:"smooth"

                });

            }

        });

    });

});


/* ============================================
   CONFETTI
============================================ */

function launchConfetti(){

    for(let i=0;i<180;i++){

        createPiece();

    }

}

function createPiece(){

    const piece=document.createElement("div");

    piece.className="confetti";

    piece.style.left=Math.random()*100+"vw";

    piece.style.animationDuration=
        (Math.random()*3+2)+"s";

    piece.style.opacity=Math.random();

    piece.style.width=
        (6+Math.random()*10)+"px";

    piece.style.height=
        (6+Math.random()*10)+"px";

    piece.style.transform=
        "rotate("+Math.random()*360+"deg)";

    document.body.appendChild(piece);

    setTimeout(()=>{

        piece.remove();

    },5000);

}