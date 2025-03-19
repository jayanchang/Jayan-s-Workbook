const trollText = document.getElementById("trollText");
let hoverCount = 0;
const maxTries = 5; // Moves for first 4 hovers, stops at 5th hover

trollText.addEventListener("mouseenter", () => {
    if (hoverCount < maxTries) {
        const textWidthVW = (trollText.offsetWidth / window.innerWidth) * 100;
        const textHeightVH = (trollText.offsetHeight / window.innerHeight) * 100;

        const maxX = 60 - textWidthVW; // Keep within viewport with a small margin
        const maxY = 60 - textHeightVH;

        const randomX = Math.random() * maxX;
        const randomY = Math.random() * maxY;

        trollText.style.transform = `translate(${randomX}vw, ${randomY}vh)`;
        hoverCount++;
    }

    // On the 5th hover, change the text and stop moving
    if (hoverCount === maxTries) {
        trollText.textContent = "HAHA I will stop trolling, click me";
    }
});

// Prevent clicking until the 5th time
trollText.addEventListener("click", (event) => {
    if (hoverCount < maxTries) {
        event.preventDefault(); // Block clicking before 5th time
    }
});

