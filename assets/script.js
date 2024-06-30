const addPlayerBtn = document.querySelector("#add-player-btn");
const landingPage = document.getElementById("landing");
const startBtn = document.getElementById("start-game-btn");

const gamePage = document.getElementById("game-page");
const guessBtn = document.getElementById("guess");

const playerValueField = document.getElementById("player-RT-guess-field");
let playerValue;

const playerGuessedScore = document.getElementById("player-guessed-score");
const playerAccuracyEl = document.getElementById("player-accuracy");
const ptsEarnedEl = document.getElementById("points-earned");

const nextRoundBtn = document.getElementById("next-round");

const resultsPage = document.getElementById("results-page");
const roundDisplay = document.getElementById("round-display");

const playAgain = document.getElementById("play-again");

// Initialize game state as Round 1.
let roundCount = 1;

let players = JSON.parse(localStorage.getItem("playersData"));
if (players === null) {
  players = [];
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
  roundDisplay.value = roundCount*10;
  let rPg = Math.floor(Math.random()*300);

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
    `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=true&language=en-US&page=${rPg}&sort_by=popularity.desc&with_original_language=en&&release_date.lte=${dayjs().format('MM-DD-YYYY')}&api_key=${API_KEY}`,
    options
  )
    .then((response) => response.json())
    .then(function (movie) {
      console.log(movie);
      console.log(`${dayjs().format('MM-DD-YYYY')}`);
      rMI = Math.floor(Math.random() * 20);
      movieTitle = document.createElement("div");
      movieTitle.setAttribute("id", "poppedMovieTitle");
      movieTitle.innerHTML = `${movie.results[rMI].title}`;
      if (document.getElementById("movie-title").childElementCount !== 0)
        {
          document.getElementById("movie-title").removeChild(document.getElementById("poppedMovieTitle"));
        }
        document.getElementById("movie-title").appendChild(movieTitle);
        console.log(document.getElementById("movie-title").children[0]);

        moviePoster = document.createElement("div");
        
        moviePoster.innerHTML = `<img id="poster-img" src="https://image.tmdb.org/t/p/w500${movie.results[rMI].poster_path}" alt="${movie.results
        [rMI].title} Poster" width="330em">`;
        moviePoster.setAttribute("id", "poppedMoviePoster");
        moviePoster.setAttribute("class", "pt-3 columns is-mobile is-centered");

        let posterFlipped = false;
        let flipsides = function () {
          console.log(posterFlipped);
          if (posterFlipped === false) {
          console.log(`poster clicked`);
          moviePoster.innerHTML =`<div id="poster-img" style="background-color:rgb(32, 32, 33); width:330px; height:495px;"><p class="is-size-5 p-2 has-text-left">${movie.results[rMI].overview}</p></div>`;
          posterFlipped = true;
          }
          else if (posterFlipped === true) { moviePoster.innerHTML = `<img id="poster-img" src="https://image.tmdb.org/t/p/w500${movie.results[rMI].poster_path}" alt="${movie.results
          [rMI].title} Poster" width="330em">`;
          posterFlipped = false;
          }
        }
        moviePoster.addEventListener("click", flipsides);

        if (document.getElementById("movie-poster").childElementCount !== 0)
        {
          document.getElementById("movie-poster").removeChild(document.getElementById("poppedMoviePoster"));
        }
        document.getElementById("movie-poster").appendChild(moviePoster);
        console.log(document.getElementById("movie-poster").getBoundingClientRect());

    })
    .catch((err) => console.error(err));

  // This is the screen transition script.
  // It applies CSS classes that effectively slide the current containers off screen to be replaced by the next screen.
  landingPage.setAttribute("class", "page out");
  setTimeout(gamePage.setAttribute("class", "page load"), 500);
  setTimeout(gamePage.setAttribute("class", "page in-right"), 500);
};

// TODO: I started to put together a function to call when checking score player enters versus their guessed score. It is incomplete. This would probably be a good place to have API fetch request to pull Rotten Tomatoes scores from OMDB.
const guessCheck = function () {
  if (guessedScore === actualScore) {
  }
};

// This function is called when the Submit button on the Gameplay screen is pressed. It will increment the current 'Round' up to 10. After Round 10 the final round it will transition to the Game Results screen, which would be the final screen. WIP.

// TODO: I suggest this function also being the place to add our API fetch requests to populate the Movie Title, Poster, and Plot Summary from TMDB.
const nextRoundFunction = function () {
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
      `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=true&language=en-US&page=${rPg}&sort_by=popularity.desc&with_original_language=en&&release_date.lte=${dayjs().format('MM-DD-YYYY')}&api_key=${API_KEY}`,
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
        console.log(document.getElementById("movie-title").children[0]);

        // document.getElementById('movie-title').textContent = movie.title;

        moviePoster = document.createElement("div");
        moviePoster.innerHTML = `<img id="poster-img" src="https://image.tmdb.org/t/p/w500${movie.results[rMI].poster_path}" alt="${movie.results
        [rMI].title} Poster" width="330em">`;
        moviePoster.setAttribute("id", "poppedMoviePoster");
        moviePoster.setAttribute("class", "pt-3 columns is-mobile is-centered");
        

        if (document.getElementById("movie-poster").childElementCount !== 0)
        {
          document.getElementById("movie-poster").removeChild(document.getElementById("poppedMoviePoster"));
        }
        document.getElementById("movie-poster").appendChild(moviePoster);
        let posterFlipped = false;
        let flipsides = function (event) {
          if (posterFlipped === false) {
          console.log(`poster clicked`);
          moviePoster.innerHTML =`<div id="poster-img" style="background-color:rgb(32, 32, 33); width:330px; height:495px;"><p class="is-size-5 p-2 has-text-left">${movie.results[rMI].overview}</p></div`;
          posterFlipped = true;
          }

          else if (posterFlipped === true) { moviePoster.innerHTML = `<img id="poster-img" src="https://image.tmdb.org/t/p/w500${movie.results[rMI].poster_path}" alt="${movie.results
          [rMI].title} Poster" width="330em">`;
          posterFlipped = false;
          }
        }
        moviePoster.addEventListener("click", flipsides);


        console.log(document.getElementById("movie-poster").getBoundingClientRect());

      })
      .catch((err) => console.error(err));

    roundDisplay.value = roundCount*10;

  } else if (roundCount === 10) {

    document.getElementById("movie-title").removeChild(document.getElementById("poppedMovieTitle"));
    
    document.getElementById("movie-poster").removeChild(document.getElementById("poppedMoviePoster"));

    gamePage.setAttribute("class", "page out-right");
    resultsPage.setAttribute("class", "page load");
    resultsPage.setAttribute("class", "page in-left");
  }
};

const restartGame = function () {
  roundCount = 1;
  resultsPage.setAttribute("class", "page out-left");
  landingPage.setAttribute("class", "page load");
  landingPage.setAttribute("class", "page in-left");
};

//const checkScore = function(RTscore) {
  const checkScore = function() {
  let playerValue = playerValueField.value;
  console.log(playerValue);

  // let accuracy = 1 - (Math.abs(`${RTscore}` - guessedScore))/100;
  let accuracy = 1 - (Math.abs(100 - playerValue))/100;
  let accuracyShow = accuracy * 100 + "%";
  let weightedAccuracy = Math.pow(accuracy, 2);
  let maxPoints = 50;

  let earnedPoints = Math.round(maxPoints * weightedAccuracy);
  playerAccuracyEl.innerText = accuracyShow;
  ptsEarnedEl.innerText = earnedPoints;

  return [accuracy, earnedPoints];
}


// Event listeners below. The names should be helpful in discerning which is which.
addPlayerBtn.addEventListener("click", trackPlayersData);
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

  // Add a click event on buttons to open a specific modal
  (document.querySelectorAll('.js-modal-trigger') || []).forEach(($trigger) => {
    const modal = $trigger.dataset.target;
    const $target = document.getElementById(modal);

    $trigger.addEventListener('click', () => {
      openModal($target);
    });
  });

  // Add a click event on various child elements to close the parent modal
  (document.querySelectorAll('.modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button') || []).forEach(($close) => {
    const $target = $close.closest('.modal');

    $close.addEventListener('click', () => {
      closeModal($target);
    });
  });

  // Add a keyboard event to close all modals
  document.addEventListener('keydown', (event) => {
    if(event.key === "Escape") {
      closeAllModals();
    }
  });
});
