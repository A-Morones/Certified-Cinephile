const addPlayerBtn = document.querySelector("#add-player-btn");
const landingPage = document.getElementById("landing");
const startBtn = document.getElementById("start-game-btn");

const gamePage = document.getElementById("game-page");
const guessBtn = document.getElementById("guess");

const playerValueField = document.getElementById("player-RT-guess-field");
let playerValue;

const playerHUD = document.getElementById("player-HUD");

const nameHUD = document.getElementById("name-HUD");
const scoreHUD = document.getElementById("score-HUD");
const accHUD = document.getElementById("acc-HUD");

const playerGuessedScore = document.getElementById("player-guessed-score");
const playerAccuracyEl = document.getElementById("player-accuracy");
const actualRTScore = document.getElementById("actual-rt-score");
const ptsEarnedEl = document.getElementById("points-earned");

const nextRoundBtn = document.getElementById("next-round");

const resultsPage = document.getElementById("results-page");
const displayResults = document.getElementById("populate-results");
const roundDisplay = document.getElementById("round-display");

const playAgain = document.getElementById("play-again");

// Initialize game state as Round 1.
let roundCount = 1;
let roundAccuracy = [];
let sessScore;
let sessAvgAcc;
let playerScore = 0;
let streak = 1;
let prevGuessPerfect = false;

let playerName;
let players = JSON.parse(localStorage.getItem("playersData"));
if (players === null) {
  players = [];
}
console.log(players);

function Player(name) {

    this.name = name;
    this.scores = [];
    this.accuracy = [];
    this.calcHiscore = function() {
      const playerHiScore = Math.max(...this.scores);
      return playerHiScore;
    }
    this.calcAvgAcc = function() {
      let accTally = 0;
      for (let i = 0; i<this.accuracy.length; i++) {
      accTally += this.accuracy[i];
      }
      const avgAcc = accTally/accuracy.length;
      return avgAcc;
  }
}

const API_KEY = "3306c7ffcda8121e53d4fb1e95e8750c";
const TMDB_URL = `https://api.themoviedb.org/3/movie/11?api_key=${API_KEY}&language=en-US&page=1`;

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

// This function begins when Start Game button on Landing Page is pressed.
const gameStart = function () {

  playerName = addPlayerBtn.value;
  if (addPlayerBtn.value.trim() === ""){
    playerName = 'Guest';
    document.createElement("div");
    console.log(playerName);
  }

    nameHUD.textContent = `${playerName}`;
    scoreHUD.textContent = `Score: ${playerScore}`;
    accHUD.textContent = `Accuracy: %`;

  
  console.log(playerName);
  if (!players.includes(playerName)) {
    p1 = new Player();
    p1.name = playerName;
    players.push(p1);
    localStorage.setItem("playersData", JSON.stringify(players));
  } else if (players.includes(playerName)) {p1 = players[players.findIndex(playerName)];
    console.log(p1);
  } else if (playerName === 'Guest') {let playerIsGuest = true;};

  roundDisplay.value = roundCount*10;
  let rPg = Math.floor(Math.random()*300) + 1;

  // Fetch a random now-playing movie from TMDB API
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMzA2YzdmZmNkYTgxMjFlNTNkNGZiMWU5NWU4NzUwYyIsIm5iZiI6MTcxOTI3MzM0NS41ODQ4NzksInN1YiI6IjY2NzhlOWQxMjlmMjg4YjIzZGNlYjFmZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.NMjKDHRmOC_UqZoOMZCSaXOYdKwZmvsvKPuUo_XICn0",
    },
  };

  fetch(
    `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=true&language=en-US&page=${rPg}&sort_by=popularity.desc&with_original_language=en&release_date.lte=${dayjs().format('MM-DD-YYYY')}&api_key=${API_KEY}`,
    options
  )
    .then((response) => response.json())
    .then(function (movie) {
      console.log(movie);

      rMI = Math.floor(Math.random() * 20);
      movieTitle = document.createElement("div");
      movieTitle.setAttribute("id", "poppedMovieTitle");
      movieTitle.innerHTML = `${movie.results[rMI].title}`;
      if (document.getElementById("movie-title").childElementCount !== 0)
        {
          document.getElementById("movie-title").removeChild(document.getElementById("poppedMovieTitle"));
        }
        document.getElementById("movie-title").appendChild(movieTitle);


        moviePoster = document.createElement("div");
        moviePoster.innerHTML = `<img id="poster-img" src="https://image.tmdb.org/t/p/w500${movie.results[rMI].poster_path}" alt="${movie.results
        [rMI].title} Poster">`;
        moviePoster.setAttribute("id", "poppedMoviePoster");
        moviePoster.setAttribute("class", "pt-3 columns is-mobile is-centered");

        let posterFlipped = false;
        const flipsides = function (event) {
          const flipAnim = moviePoster.animate(
            [{
              transform: 'rotateY(180deg)',
            }],
              {
                duration:250,
              },
          );

          if (posterFlipped === false) {

          setTimeout(function () {moviePoster.innerHTML =`<div id="poster-img" style="background-color:rgb(32, 32, 33); "><p class="is-size-4 p-4 has-text-left">${movie.results[rMI].overview.slice(0,350)}</p></div>`}, 125);
          posterFlipped = true;
          }
          else if (posterFlipped === true) { 
          setTimeout(function () {moviePoster.innerHTML = `<img id="poster-img" src="https://image.tmdb.org/t/p/w500${movie.results[rMI].poster_path}" alt="${movie.results
          [rMI].title} Poster">`}, 125);
          posterFlipped = false;
          }
        }
        
        moviePoster.addEventListener("click", flipsides);

        if (document.getElementById("movie-poster").childElementCount !== 0)
        {
          document.getElementById("movie-poster").removeChild(document.getElementById("poppedMoviePoster"));
        }
        document.getElementById("movie-poster").appendChild(moviePoster);
        // console.log(document.getElementById("movie-poster").getBoundingClientRect());

    })
    .catch((err) => console.error(err));

  // This is the screen transition script.
  // It applies CSS classes that effectively slide the current containers off screen to be replaced by the next screen.
  landingPage.setAttribute("class", "page out");
  setTimeout(gamePage.setAttribute("class", "page load"), 500);
  setTimeout(gamePage.setAttribute("class", "page in-right"), 500);
};


// This function is called when the Submit button on the Gameplay screen is pressed. It will increment the current 'Round' up to 10. After Round 10 the final round it will transition to the Game Results screen, which would be the final screen. WIP.

const nextRoundFunction = function () {
  playerValueField.value = "";
  playerGuessedScore.innerText = "";
  playerGuessedScore.classList.add('tag', 'is-skeleton');
  playerAccuracyEl.innerText = "";
  playerAccuracyEl.classList.add('tag', 'is-skeleton');
  actualRTScore.innerText = "";
  actualRTScore.classList.add('tag', 'is-skeleton');
  ptsEarnedEl.innerText = "";
  ptsEarnedEl.classList.add('tag', 'is-skeleton');
  guessBtn.disabled = true;
  if (roundCount !== 10) {
    roundCount++;
    let rPg = Math.floor(Math.random()*300);

    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMzA2YzdmZmNkYTgxMjFlNTNkNGZiMWU5NWU4NzUwYyIsIm5iZiI6MTcxOTI3MzM0NS41ODQ4NzksInN1YiI6IjY2NzhlOWQxMjlmMjg4YjIzZGNlYjFmZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.NMjKDHRmOC_UqZoOMZCSaXOYdKwZmvsvKPuUo_XICn0",
      },
    };

    fetch(
      `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=true&language=en-US&page=${rPg}&sort_by=popularity.desc&with_original_language=en&release_date.lte=${dayjs().format('MM-DD-YYYY')}&api_key=${API_KEY}`,
      options
    )
      .then((response) => response.json())
      .then(function (movie) {
        console.log(movie);
        rMI = Math.floor(Math.random() * 20);
        movieTitle = document.createElement("div");
        movieTitle.setAttribute("id", "poppedMovieTitle");

        movieTitle.innerHTML = `${movie.results[rMI].title}`;

        if (document.getElementById("movie-title").childElementCount !== 0)
        {
          document.getElementById("movie-title").removeChild(document.getElementById("poppedMovieTitle"));
        }
        document.getElementById("movie-title").appendChild(movieTitle);


        // document.getElementById('movie-title').textContent = movie.title;

        moviePoster = document.createElement("div");
        moviePoster.innerHTML = `<img id="poster-img" src="https://image.tmdb.org/t/p/w500${movie.results[rMI].poster_path}" alt="${movie.results
        [rMI].title} Poster">`;
        moviePoster.setAttribute("id", "poppedMoviePoster");
        moviePoster.setAttribute("class", "pt-3 columns is-mobile is-centered");
        

        if (document.getElementById("movie-poster").childElementCount !== 0)
        {
          document.getElementById("movie-poster").removeChild(document.getElementById("poppedMoviePoster"));
        }
        document.getElementById("movie-poster").appendChild(moviePoster);
        let posterFlipped = false;
        const flipsides = function (event) {
          const flipAnim = moviePoster.animate(
            [{
              transform: 'rotateY(180deg)',
            }],
              {
                duration:250,
              },
          );

        
          if (posterFlipped === false) {
          setTimeout(function () { moviePoster.innerHTML =`<div id="poster-img" style="background-color:rgb(32, 32, 33);"><p class="is-size-4 p-4 has-text-left">${movie.results[rMI].overview.slice(0,350)}</p></div>`}, 125);
          posterFlipped = true;
          }
          else if (posterFlipped === true) {
          setTimeout(function () { moviePoster.innerHTML = `<img id="poster-img" src="https://image.tmdb.org/t/p/w500${movie.results[rMI].poster_path}" alt="${movie.results
          [rMI].title} Poster">`}, 125);
          posterFlipped = false;
          }

        };
        moviePoster.addEventListener("click", flipsides);


        // console.log(document.getElementById("movie-poster").getBoundingClientRect());

      })
      .catch((err) => console.error(err));

    roundDisplay.value = roundCount*10;

  } else if (roundCount === 10) {
// Clear game screen of title and poster
    document.getElementById("movie-title").removeChild(document.getElementById("poppedMovieTitle"));
    document.getElementById("movie-poster").removeChild(document.getElementById("poppedMoviePoster"));
// Transition from game screen to results screen
    gamePage.setAttribute("class", "page out-right");
    resultsPage.setAttribute("class", "page load");
    resultsPage.setAttribute("class", "page in-left");

    console.log(`This session's accuracy avg.: ${sessAvgAcc}`);
    p1.accuracy.push(sessAvgAcc);
    p1.scores.push(sessScore);

    sessScore = JSON.parse(localStorage.getItem("score"));
    sessAcc = JSON.parse(localStorage.getItem("accuracy"));
    if (sessScore >= 100) {
      sessResults = document.createElement("div");
      sessResults.setAttribute("id", "poppedResults")
      displayResults.appendChild(sessResults);
      sessResults.innerHTML = `<h1 class="is-size-3">Congratulations!</h1><h1 class="is-size-4">You are indeed a Certified Cinephile!</h1> <h1 class="mb-4 is-size-4">Final Score: ${sessScore}</h1>`;
    } else {
      sessResults = document.createElement("div");
      sessResults.setAttribute("id", "poppedResults")
      displayResults.appendChild(sessResults);
      sessResults.innerHTML = `<h1 class="mb-4 is-size-4">You scored ${sessScore} ! Try again!</h1>`;
    }
  }
};

const restartGame = function () {
  roundCount = 1;
  roundAccuracy = [];
  playerScore = 0;
  streak = 1;
  prevGuessPerfect = false;
  resultsPage.setAttribute("class", "page out-left");
  landingPage.setAttribute("class", "page load");
  landingPage.setAttribute("class", "page in-left");
  displayResults.removeChild(sessResults);
  players = JSON.parse(localStorage.getItem("playersData"));
};

const validateInput = function () {
  if (Math.round(playerValueField.value) != "" && (Math.round(playerValueField.value) >= 0 && Math.round(playerValueField.value) <= 100)){guessBtn.disabled =false;}
  else if (Math.round(playerValueField.value) === "") {guessBtn.disabled=true;}
}

const checkScore = function() {
  if (Math.round(playerValueField.value) != "") {
  fetch(`https://www.omdbapi.com/?apikey=1053f97f&t=${document.getElementById("poppedMovieTitle").textContent}`)
          .then(function(response) {
            console.log(response.json);
            return response.json();
          })
          .then(function(omdb){
            console.log(omdb);
            let RTscore;
            if (omdb.Ratings.length === 1) {
              console.log(typeof omdb.Ratings[0].Value);
              let nonRTcalcA = omdb.Ratings[0].Value.split('/');
              let n = parseFloat(nonRTcalcA[0]);
              let d = parseFloat(nonRTcalcA[1]);
              RTscore = Math.round((n / d) * 100);
            } else { RTscore = parseInt(omdb.Ratings[1].Value);}
            let playerValue = Math.round(playerValueField.value);
            let accuracy = 1 - (Math.abs(RTscore - playerValue))/100;
            let accuracyShow = Math.round(accuracy * 100) + "%";
            let weightedAccuracy = Math.pow(accuracy, 3);
            let maxPoints = 20;
            let earnedPoints = Math.round(maxPoints * weightedAccuracy);
          
            roundAccuracy.push(accuracy);
            playerAccuracyEl.classList.remove('tag', 'is-skeleton');
            playerAccuracyEl.innerText = accuracyShow;
            playerGuessedScore.classList.remove('tag', 'is-skeleton');
            playerGuessedScore.innerText = playerValue;
            actualRTScore.classList.remove('tag', 'is-skeleton');
            actualRTScore.innerText = RTscore;
            // actualRTScore.innerText = ${RTscore};
          
            
            if (accuracy === 1 && prevGuessPerfect === true) {
              streak++;
              ptsEarnedEl.setAttribute("class", "is-size-3 has-text-warning has-text-bold column is-half mt-0 pt-0 has-text-centered")
              }
              else if (accuracy === 1) {
                prevGuessPerfect = true;
                ptsEarnedEl.setAttribute("class", "is-size-3 has-text-primary has-text-bold column is-half mt-0 pt-0 has-text-centered")
              } else {
              prevGuessPerfect = false;
              streak = 1;
              ptsEarnedEl.setAttribute("class", "is-size-3 has-text-primary has-text-bold column is-half mt-0 pt-0 has-text-centered")
            }
          
            earnedPoints = earnedPoints * streak;
            playerScore += earnedPoints;
            console.log(playerScore);
            ptsEarnedEl.innerText = earnedPoints;
      
            localStorage.setItem("score", JSON.stringify(playerScore));
            localStorage.setItem("accuracy", JSON.stringify(accuracy));
            console.log(roundAccuracy);

            let tallyAcc = 0;
            for (let i=0; i<roundAccuracy.length; i++) {
              tallyAcc += roundAccuracy[i];
            } sessAvgAcc = tallyAcc/roundAccuracy.length;

            console.log(`Session Avg Acc: ${sessAvgAcc}`);

            scoreHUD.textContent = `Score: ${playerScore}`;
            accHUD.textContent = `Accuracy: ${Math.round(sessAvgAcc*100)}%`;

            return [accuracy, earnedPoints];
          })
          }
  else if (playerValueField.value = "") {console.log("Please enter a guess.")};
        }
  





// Event listeners below. The names should be helpful in discerning which is which.
// addPlayerBtn.addEventListener("click", trackPlayersData);
playerValueField.addEventListener("input", function() {
  if (playerValueField.value.length > 3) {playerValueField.value = playerValueField.value.slice(0, 3);
  }
  if (playerValueField.value > 100) {playerValueField.value = 100
  }
  if (playerValueField.value < 0) {playerValueField.value = 0
  }
  validateInput();
});

playerValueField.addEventListener("keydown", validateInput);
playerValueField.addEventListener("change", validateInput);
startBtn.addEventListener("click", gameStart);
guessBtn.addEventListener("click", checkScore);
nextRoundBtn.addEventListener("click", nextRoundFunction);
playAgain.addEventListener("click", restartGame);


// Bulma Modal Event Listener: https://bulma.io/documentation/components/modal/
document.addEventListener('DOMContentLoaded', () => {
  // Functions to open and close a modal
  function openModal($el) {
    $el.classList.add('is-active');
  }

  function closeModal($el) {
    $el.classList.remove('is-active');
  }

  function closeAllModals() {
    (document.querySelectorAll('.modal') || []).forEach(($modal) => {
      closeModal($modal);
    });
  }

  
  (document.querySelectorAll('.js-modal-trigger') || []).forEach(($trigger) => {
    const modal = $trigger.dataset.target;
    const $target = document.getElementById(modal);

    $trigger.addEventListener('click', () => {
      openModal($target);
    });
  });

  // Add a click event on various child elements to close the parent modal

  (
    document.querySelectorAll(
      ".modal-close, .modal-card-head .delete, .modal-card-foot .button"
    ) || []
  ).forEach(($close) => {
    const $target = $close.closest(".modal");

    $close.addEventListener("click", () => {

      closeModal($target);
    });
  });

  // Add a keyboard event to close all modals


  document.addEventListener('keydown', (event) => {
    if(event.key === "") {

      closeAllModals();
    }
  });
});




