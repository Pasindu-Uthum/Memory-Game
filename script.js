// Taking the required elements from the HTML
const playerLivesCount = document.querySelector("span");
const section = document.querySelector("section");
let playerLives = 10; // No of player lives initially
playerLivesCount.textContent = playerLives;
// Making the object with the data

let getData = () => [
  { imgSrc: "./images/Altair.jpg", name: "altair" },
  { imgSrc: "./images/Arno.jpg", name: "arno" },
  { imgSrc: "./images/Connor.jpg", name: "connor" },
  { imgSrc: "./images/Edward.jpg", name: "edward" },
  { imgSrc: "./images/Evor.jpg", name: "evor" },
  { imgSrc: "./images/Ezio.jpg", name: "ezio" },
  { imgSrc: "./images/Jacob.jpg", name: "jacob" },
  { imgSrc: "./images/Shay.jpeg", name: "shay" },
  { imgSrc: "./images/Altair.jpg", name: "altair" },
  { imgSrc: "./images/Arno.jpg", name: "arno" },
  { imgSrc: "./images/Connor.jpg", name: "connor" },
  { imgSrc: "./images/Edward.jpg", name: "edward" },
  { imgSrc: "./images/Evor.jpg", name: "evor" },
  { imgSrc: "./images/Ezio.jpg", name: "ezio" },
  { imgSrc: "./images/Jacob.jpg", name: "jacob" },
  { imgSrc: "./images/Shay.jpeg", name: "shay" },
];

// Creating the data in an random order

const randomize = () => {
  const cardData = getData();
  cardData.sort(() => Math.random() - 0.5);
  return cardData;
};

// Generate the cards in HTML

const cardGenerate = () => {
  const cardData = randomize();
  cardData.forEach((item) => {
    const card = document.createElement("div");
    const face = document.createElement("img");
    const back = document.createElement("div");
    card.classList = "card";
    face.classList = "face";
    back.classList = "back";
    face.src = item.imgSrc; // Appending the images sources from the getData() to the image elements
    card.setAttribute("name", item.name);
    section.appendChild(card);
    card.appendChild(face);
    card.appendChild(back);
    // Toggle the animation
    card.addEventListener("click", (e) => {
      card.classList.toggle("toggleCard");
      checkCards(e);
    });
  });
};

const checkCards = (e) => {
  const clickedCard = e.target;
  clickedCard.classList.add("flippedCard"); // Set the fileppedCard class to the clicked cards
  const flippedCards = document.querySelectorAll(".flippedCard");
  const toggleCards = document.querySelectorAll(".toggleCard");
  if (flippedCards.length === 2) {
    if (
      flippedCards[0].getAttribute("name") ===
      flippedCards[1].getAttribute("name")
    ) {
      flippedCards.forEach((card) => {
        card.classList.remove("flippedCard");
        card.style.pointerEvents = "none";
      });
      console.log("Correct");
    } else {
      flippedCards.forEach((card) => {
        card.classList.remove("flippedCard");
        setTimeout(() => {
          card.classList.remove("toggleCard");
        }, 1000);
      });
      playerLives--;
      playerLivesCount.textContent = playerLives;
      if (playerLives === 0) {
        restart("👎 Failed. Try Again Mate.");
      }
    }
  }
  if (toggleCards.length === 16) {
    restart("👍 Congradulations. You Won the Game");
  }
};

const restart = (text) => {
  let cardData = randomize();
  let faces = document.querySelectorAll(".face");
  let cards = document.querySelectorAll(".card");
  section.style.pointerEvents = "none";
  cardData.forEach((item, index) => {
    setTimeout(() => {
      cards[index].classList.remove("toggleCard");
      cards[index].style.pointerEvents = "all";
      faces[index].src = item.imgSrc;
      cards[index].setAttribute("name", item.name);
      section.style.pointerEvents = "all";
    }, 1000);
  });
  playerLives = 10;
  playerLivesCount.textContent = playerLives;
  setTimeout(() => window.alert(text), 100);
};

cardGenerate();
