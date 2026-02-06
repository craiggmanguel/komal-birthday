// Loader
window.onload = () => {
    setTimeout(() => {
        document.getElementById("loader").style.display = "none";
    }, 1200);
};

// Elements
const lockScreen = document.getElementById("lockScreen");
const content = document.getElementById("content");
const unlockBtn = document.getElementById("unlockBtn");
const music = document.getElementById("bgMusic");

// 🔊 Play music on FIRST touch anywhere
let musicStarted = false;
function startMusicOnce() {
    if (!musicStarted) {
        music.volume = 0.4;
        music.play().catch(() => { });
        musicStarted = true;
    }
}
document.addEventListener("click", startMusicOnce, { once: true });
document.addEventListener("touchstart", startMusicOnce, { once: true });

// Unlock
// Unlock (mobile-safe music start)
unlockBtn.onclick = () => {
    lockScreen.style.display = "none";
    content.style.display = "block";
    startMusicOnce(); // 🔊 guaranteed user gesture
};


// Scroll reveal
const hiddenSections = document.querySelectorAll(".hidden");
window.addEventListener("scroll", () => {
    hiddenSections.forEach(sec => {
        if (sec.getBoundingClientRect().top < window.innerHeight - 100) {
            sec.classList.add("show");
        }
    });
});

// Guided scrolling
const sections = document.querySelectorAll("section");
let currentIndex = 0;
document.getElementById("nextBtn").addEventListener("click", () => {
    currentIndex++;
    if (currentIndex < sections.length) {
        sections[currentIndex].scrollIntoView({ behavior: "smooth" });
    }
});

// Fullscreen image viewer
const viewer = document.getElementById("imageViewer");
const viewerTrack = document.getElementById("viewerTrack");
const closeViewer = document.getElementById("closeViewer");
const images = document.querySelectorAll(".memory-grid img");

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

closeViewer.onclick = () => {
    viewer.style.display = "none";
    document.body.style.overflow = "";
};
