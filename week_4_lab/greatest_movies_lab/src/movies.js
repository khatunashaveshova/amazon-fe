const movies = require("./data"); // import movies from './data' ES6
// Iteration 1: All directors? - Get the array of all directors.
// _Bonus_: It seems some of the directors had directed multiple movies so they will pop up multiple times in the array of directors.
// How could you "clean" a bit this array and make it unified (without duplicates)?
function getAllDirectors(moviesArray) {
  // return moviesArray.map((movie) => movie.director)

  return [...new Set(moviesArray.map((movie) => movie.director))];
}

//const moviesArr = getAllDirectors(movies)
// console.log(moviesArr)

// Iteration 2: Steven Spielberg. The best? - How many drama movies did STEVEN SPIELBERG direct?
function howManyMovies(moviesArray) {
  const filteredMovies = moviesArray.filter((movie) => {
    // toUppercase(), toLowercase()
    return (
      movie.director === "Steven Spielberg" && movie.genre.includes("Drama")
    );
  });

  return filteredMovies.length;
}

//const moviesLength = howManyMovies(movies)
//console.log(moviesLength)

// Iteration 3: All scores average - Get the average of all scores with 2 decimals
function scoresAverage(moviesArray) {
  if (moviesArray.length === 0) return 0;

  const totalScore = moviesArray.reduce((sum, movie) => {
    return sum + (movie.score || 0);
  }, 0);

  const average = totalScore / moviesArray.length;

  return Number(average.toFixed(2));
}

//const moviesSumScore = scoresAverage(movies)
// console.log(moviesSumScore)

// Iteration 4: Drama movies - Get the average of Drama Movies
function dramaMoviesScore(moviesArray) {
  const dramaMovies = moviesArray.filter((movie) =>
    movie.genre.includes("Drama"),
  );

  if (dramaMovies.length === 0) return 0;

  return scoresAverage(dramaMovies);
}

//const moviesSumScore = dramaMoviesScore(movies);
//console.log(moviesSumScore);

// Iteration 5: Ordering by year - Order by year, ascending (in growing order)
function orderByYear(moviesArray) {
  // spread array

  const moviesCopy = [...moviesArray];

  moviesCopy.sort((a, b) => {
    if (a.year === b.year) {
      return a.title.localeCompare(b.title);
    }
    return a.year - b.year;
  });

  return moviesCopy;
}

// const moviesSort = orderByYear(movies)
// console.log(moviesSort);

// Iteration 6: Alphabetic Order - Order by title and print the first 20 titles
function orderAlphabetically(moviesArray) {
  const moviesCopy = [...moviesArray];

  moviesCopy.sort((a, b) => a.title.localeCompare(b.title));

  const titles = moviesCopy.map((movie) => movie.title);

  return titles.slice(0, 20);
}

// const moviesSortByTitle = orderAlphabetically(movies)
// console.log(moviesSortByTitle);

// BONUS - Iteration 7: Time Format - Turn duration of the movies from hours to minutes
function turnHoursToMinutes(moviesArray) {
  return moviesArray.map((movie) => {
    const newMovie = { ...movie };

    let hours = 0;
    let minutes = 0;

    if (newMovie.duration.includes("h")) {
      hours = parseInt(newMovie.duration);
    }

    if (newMovie.duration.includes("min")) {
      const parts = newMovie.duration.split(" ");
      const minPart = parts.find((part) => part.includes("min"));
      minutes = parseInt(minPart);
    }

    newMovie.duration = hours * 60 + minutes;

    return newMovie;
  });
}

// const turnHoursToMinutesArr = turnHoursToMinutes(movies)
// console.log(turnHoursToMinutesArr);

// BONUS - Iteration 8: Best yearly score average - Best yearly score average
function bestYearAvg(moviesArray) {
  if (moviesArray.length === 0) return null;

  const scoresByYear = {};

  moviesArray.forEach((movie) => {
    if (!scoresByYear[movie.year]) {
      scoresByYear[movie.year] = [];
    }

    scoresByYear[movie.year].push(movie.score || 0);

    console.log(scoresByYear)
  });

  let bestYear = null;
  let besAvg = 0;

  for (let year in scoresByYear) {
    const scores = scoresByYear[year];

    const avg = scores.reduce((sum, score) => sum + score, 0) / scores.length;

    if (avg > besAvg || (avg > besAvg && year < bestYear) ) {
      besAvg = avg;
      bestYear = year;
    }
  }

  return `The best year was ${bestYear} with an average score of ${besAvg.toFixed(2)}`
}

const bestYearAvgString = bestYearAvg(movies)
console.log(bestYearAvgString);