document.addEventListener("DOMContentLoaded", () => {
    console.log("✅ All scripts loaded");
  
    // =========================
    // 🌀 TROLL TEXT MOVEMENT
    // =========================
    const trollText = document.getElementById("trollText");
    const maxTries = 4;
    const minMove = 20; // in vw/vh
    let hoverCount = 0;
  
    if (trollText) {
      trollText.addEventListener("mouseenter", () => {
        if (hoverCount < maxTries) {
          const textWidthVW = (trollText.offsetWidth / window.innerWidth) * 100;
          const textHeightVH = (trollText.offsetHeight / window.innerHeight) * 100;
          const maxX = 60 - textWidthVW;
          const maxY = 60 - textHeightVH;
  
          let moveX, moveY;
          do {
            moveX = Math.random() * maxX;
          } while (moveX < minMove);
          do {
            moveY = Math.random() * maxY;
          } while (moveY < minMove);
  
          trollText.style.transform = `translate(${moveX}vw, ${moveY}vh)`;
          hoverCount++;
        }
  
        if (hoverCount === maxTries) {
          trollText.textContent = "HAHA I will stop trolling, click me";
        }
      });
  
      trollText.addEventListener("click", (event) => {
        if (hoverCount < maxTries) {
          event.preventDefault();
        }
      });
    }
  
    // =========================
    // 🎮 EMOJI MEMORY GAME
    // =========================
    const emojiGameBoard = document.getElementById("emojiGameBoard");
    if (emojiGameBoard) {
      const emojis = ["🐶", "🐱", "🐸", "🐵"];
      const emojiPairs = [...emojis, ...emojis]; // total: 8 cards
      let flipped = [];
      let matched = 0;
  
      emojiPairs.sort(() => 0.5 - Math.random()); // shuffle
  
      emojiPairs.forEach((emoji, index) => {
        const card = document.createElement("div");
        card.classList.add("emoji-card");
        card.dataset.emoji = emoji;
        card.dataset.index = index;
        card.textContent = "❓";
  
        // Inline styling (you can move this to CSS if you want)
        Object.assign(card.style, {
          width: "100px",
          height: "100px",
          fontSize: "40px",
          background: "#ffd700",
          border: "3px solid black",
          borderRadius: "10px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          cursor: "pointer",
          userSelect: "none",
        });
  
        card.addEventListener("click", () => {
          if (flipped.length < 2 && !card.classList.contains("flipped")) {
            card.classList.add("flipped");
            card.textContent = card.dataset.emoji;
            flipped.push(card);
  
            if (flipped.length === 2) {
              setTimeout(() => {
                const [c1, c2] = flipped;
                if (c1.dataset.emoji === c2.dataset.emoji) {
                  c1.style.background = "#90ee90";
                  c2.style.background = "#90ee90";
                  matched++;
                  if (matched === emojis.length) {
                    setTimeout(() => alert("🎉 You matched all the pairs!"), 300);
                  }
                } else {
                  c1.classList.remove("flipped");
                  c2.classList.remove("flipped");
                  c1.textContent = "❓";
                  c2.textContent = "❓";
                }
                flipped = [];
              }, 600);
            }
          }
        });
  
        emojiGameBoard.appendChild(card);
      });
    }
});

    // =========================
    // ✂️ ROCK PAPER SCISSORS GAME
    // =========================
    document.addEventListener("DOMContentLoaded", () => {
        const choices = ["✊", "🤚", "✌️"];
        const playerChoiceSpan = document.getElementById("player-choice");
        const computerChoiceSpan = document.getElementById("computer-choice");
        const resultText = document.getElementById("rps-result");
      
        document.querySelectorAll(".rps-btn").forEach(btn => {
          btn.addEventListener("click", () => {
            const player = btn.dataset.choice;
            const computer = choices[Math.floor(Math.random() * 3)];
      
            playerChoiceSpan.textContent = player;
            computerChoiceSpan.textContent = computer;
      
            if (player === computer) {
              resultText.textContent = "It's a draw!";
            } else if (
              (player === "✊" && computer === "✌️") ||
              (player === "🤚" && computer === "✊") ||
              (player === "✌️" && computer === "🤚")
            ) {
              resultText.textContent = "You win!";
            } else {
              resultText.textContent = "Computer wins!";
            }
          });
        });
      });
      