const addPlayerBtn = document.querySelector("#add-player-btn");
const landingPage = document.getElementById("landing");
const startBtn = document.getElementById("start-game-btn");

const gamePage = document.getElementById("game-page");
const guessBtn = document.getElementById("guess");

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
  roundDisplay.innerHTML = `Round:${roundCount}/10`;

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
    "https://api.themoviedb.org/3/movie/now_playing?&page=2&region=US&api_key=5532930052be6e0e9545c5d93651df5f",
    options
  )
    .then((response) => response.json())
    .then(function (movie) {
      console.log(movie);
      rMI = Math.floor(Math.random() * 10);
      movieTitle = document.createElement("div");
      movieTitle.innerHTML = `${movie.results[rMI].title}`;
      document.getElementById("movie-title").appendChild(movieTitle);

      // document.getElementById('movie-title').textContent = movie.title;

      moviePoster = document.createElement("div");
      moviePoster.innerHTML = `<img src="https://image.tmdb.org/t/p/w500${movie.results[rMI].poster_path}" alt="${movie.results[rMI].title} Poster" sizes="40em">`;
      document.getElementById("movie-poster").appendChild(moviePoster);

      // .innerHTML = `<img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title} Poster">`;
      // document.getElementById('movie-summary').textContent = `Summary: ${movie.overview}`;
    })
    .catch((err) => console.error(err));

  // This is the screen transition script.
  // It applies CSS classes that effectively slide the current containers off screen to be replaced by the next screen.
  landingPage.setAttribute("class", "page out");
  setInterval(gamePage.setAttribute("class", "page load"), 500);
  setInterval(gamePage.setAttribute("class", "page in"), 500);
};

// TODO: I started to put together a function to call when checking score player enters versus their guessed score. It is incomplete. This would probably be a good place to have API fetch request to pull Rotten Tomatoes scores from OMDB.
const guessCheck = function () {
  if (guessedScore === actualScore) {
  }
};

// This function is called when the Submit button on the Gameplay screen is pressed. It will increment the current 'Round' up to 10. After Round 10 the final round it will transition to the Game Results screen, which would be the final screen. WIP.

// TODO: I suggest this function also being the place to add our API fetch requests to populate the Movie Title, Poster, and Plot Summary from TMDB.
const gameResults = function () {
  if (roundCount !== 10) {
    roundCount++;

    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMzA2YzdmZmNkYTgxMjFlNTNkNGZiMWU5NWU4NzUwYyIsIm5iZiI6MTcxOTI3MzM0NS41ODQ4NzksInN1YiI6IjY2NzhlOWQxMjlmMjg4YjIzZGNlYjFmZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.NMjKDHRmOC_UqZoOMZCSaXOYdKwZmvsvKPuUo_XICn0",
      },
    };

    fetch(
      "https://api.themoviedb.org/3/movie/now_playing?&page=2&region=US&api_key=5532930052be6e0e9545c5d93651df5f",
      options
    )
      .then((response) => response.json())
      .then(function (movie) {
        console.log(movie);
        rMI = Math.floor(Math.random() * 20);
        movieTitle = document.createElement("div");
        movieTitle.setAttribute("id", `movieno${roundCount}`);
        movieTitle.innerHTML = `${movie.results[rMI].title}`;
        if (document.getElementById("movie-title").childElementCount !== 0);
        {
          document
            .getElementById("movie-title")
            .removeChild(`movieno${roundCount}`);
        }
        document.getElementById("movie-title").appendChild(movieTitle);

        // document.getElementById('movie-title').textContent = movie.title;

        moviePoster = document.createElement("div");
        moviePoster.setAttribute("id", `moviepno${roundCount}`);
        moviePoster.innerHTML = `<img src="https://image.tmdb.org/t/p/w500${movie.results[rMI].poster_path}" alt="${movie.results[rMI].title} Poster" sizes="40em">`;
        if (document.getElementById("movie-poster").childElementCount !== 0);
        {
          document
            .getElementById("movie-poster")
            .removeChild(`moviepno${roundCount}`);
        }
        document.getElementById("movie-poster").appendChild(moviePoster);

        // .innerHTML = `<img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title} Poster">`;
        // document.getElementById('movie-summary').textContent = `Summary: ${movie.overview}`;
      })
      .catch((err) => console.error(err));

    roundDisplay.innerHTML = `Round:${roundCount}/10`;
    console.log(roundCount);
  } else if (roundCount === 10) {
    gamePage.setAttribute("class", "page out");
    setInterval(resultsPage.setAttribute("class", "page load"), 500);
    resultsPage.setAttribute("class", "page in");
  }
};

const restartGame = function () {
  roundCount = 1;
  resultsPage.setAttribute("class", "page out");
  setInterval(landingPage.setAttribute("class", "page load"), 500);
  landingPage.setAttribute("class", "page in");
};

// Event listeners below. The names should be helpful in discerning which is which.
addPlayerBtn.addEventListener("click", trackPlayersData);
startBtn.addEventListener("click", gameStart);
guessBtn.addEventListener("click", gameResults);
playAgain.addEventListener("click", restartGame);

document.addEventListener("DOMContentLoaded", function () {
  // Get the modal
  const modal = document.getElementById("rulesModal");

  // Get the button that opens the modal
  const btn = document.getElementById("show-rules-btn");

  // Get the <span> element that closes the modal
  const span = document.getElementsByClassName("close")[0];

  // When the user clicks the button, open the modal
  btn.onclick = function () {
    modal.style.display = "block";
  };

  // When the user clicks on <span> (x), close the modal
  span.onclick = function () {
    modal.style.display = "none";
  };

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };
});
