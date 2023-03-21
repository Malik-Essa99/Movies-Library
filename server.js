'use strict'

const express = require('express')
const app = express()
const cors = require('cors')
app.use(cors());
const axios = require('axios')
require('dotenv').config()
const PORT = process.env.PORT
const apikey = process.env.API_KEY
const movieData = require('./Movie Data/data.json')


/////// Routes ///////

app.get('/', homeRouteHandler);
app.get('/genres', genresMovieHandler);
app.get('/person', personRouteHandler);
app.get('/trending', trendingMovieHandler);
app.get('/search', searchMovieHandler);
app.get('/favorite', favoriteRouteHandler);
app.get('/Error', causeAnError)
app.get('*', pageNotFoundHandler)

/////// Constructors ///////

// function Movie(title, poster, overview) {
//   this.title = title;
//   this.poster = poster;
//   this.overview = overview;
// }
function Movies(id, title, release_date, poster_path, overview) {
  this.id = id;
  this.title = title;
  this.release_date = release_date;
  this.poster_path = poster_path;
  this.overview = overview;
}
/////// Functions ///////

function homeRouteHandler(req, res) {
  let newMovie = new Movie(movieData.title, movieData.poster_path, movieData.overview);
  res.json(newMovie);
}

function favoriteRouteHandler(req, res) {
  res.send("Welcome to Favorite Page");
}

function causeAnError(req, res) {
  res.sendddddd('Error');
}

function pageNotFoundHandler(req, res) {
  res.send('page not found!', 404);
}

function trendingMovieHandler(req, res) {
  let url = `https://api.themoviedb.org/3/trending/all/week?api_key=${apikey}`
  axios.get(url)
    .then((result) => {
      let dataMovies = result.data.results.map((movies) => {
        return new Movies(movies.id, movies.name, movies.first_air_date, movies.poster_path, movies.overview)
      })
      res.json(dataMovies)

    })
    .catch((err) => {
      console.log(err);
    });
}

function searchMovieHandler(req, res) {
  let movieName = req.query.name
  console.log(movieName)
  let url = `https://api.themoviedb.org/3/search/movie?api_key=${apikey}&query=${movieName}`
  axios.get(url)
    .then((result) => {
      let searchResult = result.data.results;
      // console.log(result.data.results)
      res.json(searchResult)
    })
    .catch((err) => {
      console.log(err)

    });
}
function genresMovieHandler(req, res) {

  let url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apikey}`

  axios.get(url)
    .then((result) => {
      let genresResult = result.data.genres;
      // console.log(genresResult)
      res.json(genresResult)
    })
    .catch((err) => {
      console.log(err)

    });
}
function personRouteHandler(req, res) {

  let personName = req.query.name
  let url = `https://api.themoviedb.org/3/search/person?api_key=${apikey}&query=${personName}`;

  axios.get(url)
    .then((result) => {
      let personResult = result.data.results;
      // console.log(genresResult)
      res.json(personResult)
    })
    .catch((err) => {
      console.log(err)

    });
}

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      "status": 500,
      "responseText": "Sorry, something went wrong"
    },
  });
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})
