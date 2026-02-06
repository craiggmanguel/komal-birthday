/* =========================
   LOADER
========================= */
window.onload = () => {
    setTimeout(() => {
        const loader = document.getElementById("loader");
        if (loader) loader.style.display = "none";
    }, 1200);
};

/* =========================
   ELEMENTS
========================= */
const lockScreen = document.getElementById("lockScreen");
const content = document.getElementById("content");
const unlockBtn = document.getElementById("unlockBtn");
const music = document.getElementById("bgMusic");

/* =========================
   🎵 MUSIC (MOBILE SAFE)
========================= */
let musicStarted = false;

function startMusicOnce() {
    if (musicStarted) return;

    music.volume = 0.4;

    music.play().then(() => {
        musicStarted = true;
    }).catch(() => {
        // If browser blocks, allow retry on next tap
        musicStarted = false;
    });
}

/* 🔥 Start music ONLY on Unlock button */
unlockBtn.addEventListener("click", startMusicOnce);
unlockBtn.addEventListener("touchstart", startMusicOnce);

/* =========================
   UNLOCK SCREEN
========================= */
unlockBtn.onclick = () => {
    lockScreen.style.display = "none";
    content.style.display = "block";
};

/* =========================
   SCROLL REVEAL
========================= */
const hiddenSections = document.querySelectorAll(".hidden");

window.addEventListener("scroll", () => {
    hiddenSections.forEach(sec => {
        if (sec.getBoundingClientRect().top < window.innerHeight - 100) {
            sec.classList.add("show");
        }
    });
});

/* =========================
   GUIDED SCROLLING
========================= */
const sections = document.querySelectorAll("section");
let currentIndex = 0;

const nextBtn = document.getElementById("nextBtn");
if (nextBtn) {
    nextBtn.addEventListener("click", () => {
        currentIndex++;
        if (currentIndex < sections.length) {
            sections[currentIndex].scrollIntoView({ behavior: "smooth" });
        }
    });
}

/* =========================
   FULLSCREEN IMAGE VIEWER
========================= */
const viewer = document.getElementById("imageViewer");
const viewerTrack = document.getElementById("viewerTrack");
const closeViewer = document.getElementById("closeViewer");
const images = document.querySelectorAll(".memory-gallery img");

images.forEach((img, index) => {
    img.addEventListener("click", () => {
        viewerTrack.innerHTML = "";

        images.forEach(i => {
            const full = document.createElement("img");
            full.src = i.src;
            viewerTrack.appendChild(full);
        });

        viewer.style.display = "block";
        viewerTrack.scrollLeft = index * window.innerWidth;
        document.body.style.overflow = "hidden";
    });
});

if (closeViewer) {
    closeViewer.onclick = () => {
        viewer.style.display = "none";
        document.body.style.overflow = "";
    };
}
