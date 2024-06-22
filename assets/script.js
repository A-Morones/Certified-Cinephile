const addPlayerBtn = document.querySelector("#add-player-btn");
const startBtn = document.getElementById("start-game-btn");
const landingPage = document.getElementById("landing")
const gamePage = document.getElementById("game-page")
const resultsPage = document.getElementById("results-page")
const guessBtn = document.getElementById("guess")
const playAgain = document.getElementById("play-again")
let players = JSON.parse(localStorage.getItem("playersData"));
if (players === null) {
  players = [];
}

const collectPlayers = function () {
  //   const players = [];
  let keepEntering = true;

  while (keepEntering) {
    const firstNameInput = prompt("Enter your first name");
    const lastNameInput = prompt("Enter your last name");

    const player = {
      playerFirstName: firstNameInput,
      playerLastName: lastNameInput,
    };
    players.push(player);
    keepEntering = confirm("Do you want to add another name");
  }
  return players;
};

const trackPlayersData = function () {
  const players = collectPlayers();
  localStorage.setItem("playersData", JSON.stringify(players));
  console.log("Players data stored in local storage.");
};

const logStoredPlayers = function () {
  const storedPlayers = localStorage.getItem("playersData");
  if (storedPlayers) {
    console.log("Stored Players:", JSON.parse(storedPlayers));
  } else {
    console.log("No players data found in local storage.");
  }
};

const gameStart = function() {
  landingPage.setAttribute("class","page out");
  setInterval(gamePage.setAttribute("class", "page load"), 500);
  setInterval(gamePage.setAttribute("class", "page in"),500);
};

const gameResults = function() {
  gamePage.setAttribute("class","page out");
  setInterval(resultsPage.setAttribute("class", "page load"), 500);
  resultsPage.setAttribute("class", "page in");
};

const restartGame = function() {
  resultsPage.setAttribute("class","page out");
  setInterval(landingPage.setAttribute("class", "page load"), 500);
  landingPage.setAttribute("class", "page in");
};


addPlayerBtn.addEventListener("click", trackPlayersData);

startBtn.addEventListener("click", gameStart);

guessBtn.addEventListener("click", gameResults);

playAgain.addEventListener("click", restartGame);
