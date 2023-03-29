'use strict'

require('dotenv').config()
////////////////////// Declarations //////////////////////
const PORT = process.env.PORT
const apikey = process.env.API_KEY
const password = process.env.PASSWORD
////////////////////// Requirements //////////////////////
const express = require('express')
const app = express()
/////////////////////////////////////////////////////////
const cors = require('cors')
app.use(cors());
/////////////////////////////////////////////////////////
const axios = require('axios')
/////////////////////////////////////////////////////////
let bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
/////////////////////////////////////////////////////////
const { Client } = require('pg')
const url = `postgres:malik:${password}@localhost:5432/moviesdatabase`
const client = new Client(url)
/////////////////////////////////////////////////////////
const movieData = require('./Movie Data/data.json')

////////////////////// Routes //////////////////////
app.get('/', homeRouteHandler);
app.get('/genres', genresMovieHandler);
app.get('/person', personRouteHandler);
app.get('/trending', trendingMovieHandler);
app.get('/search', searchMovieHandler);
app.get('/favorite', favoriteRouteHandler);
app.post('/addMovie', addMovieHandler);
app.get('/getMovie', getMoviesHandler)
app.put('/updateMovie/:id', updateMovieHandler)
app.get('/getMovie/:id', getMovieByIdHandler)
app.delete('/deleteMovie/:id', deleteMovieHandler)
app.use(errorHandler);
app.get('*', pageNotFoundHandler);
////////////////////// Constructors //////////////////////
function Movie(title, poster, overview) {
  this.title = title;
  this.poster = poster;
  this.overview = overview;
}
function Movies(id, title, release_date, poster_path, overview) {
  this.id = id;
  this.title = title;
  this.release_date = release_date;
  this.poster_path = poster_path;
  this.overview = overview;
}
////////////////////// Functions //////////////////////
function homeRouteHandler(req, res) {
  let newMovie = new Movie(movieData.title, movieData.poster_path, movieData.overview);
  // res.json(newMovie);
  res.send("Hello");
}
function favoriteRouteHandler(req, res) {
  res.send("Welcome to Favorite Page");
}
function errorHandler(err, req, res) {
  res.send(err)
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
    .catch((error) => {
      errorHandler(error, req, res);
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
    .catch((error) => {
      errorHandler(error, req, res);
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
    .catch((error) => {
      errorHandler(error, req, res);
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
    .catch((error) => {
      errorHandler(error, req, res);
    });
}
function addMovieHandler(req, res) {

  let { title, posterPath, overview, comments } = req.body
  let values = [title, posterPath, overview, comments]
  let sqlQuery = `INSERT INTO movies(title,posterPath,overview,comments) VALUES($1,$2,$3,$4) RETURNING *`;
  client.query(sqlQuery, values)
    .then(
      res.status(201).send("data recieved successfully to database")
    )
    .catch((error) => {
      errorHandler(error, req, res);
    })
}
function getMoviesHandler(req, res) {
  let sqlQuery = `SELECT * FROM movies;`
  client.query(sqlQuery)
    .then((result) => {
      res.json(result.rows)
    })
    .catch((error) => {
      errorHandler(error, req, res);
    })


}
function updateMovieHandler(req, res) {
  let idNumber = req.params.id
  let { comments } = req.body
  let sqlQuery = "UPDATE movies SET comments=$1 WHERE id=$2 RETURNING *;";
  let values = [comments, idNumber];
  client.query(sqlQuery, values)
    .then(result => {
      console.log(result);
      res.send(result.rows)
    })
    .catch((error) => {
      errorHandler(error, req, res);
    })
}
function deleteMovieHandler(req, res) {
  let idNumber = req.params.id
  let sqlQuery = "DELETE FROM movies WHERE id=$1;";
  let values = [idNumber];
  client.query(sqlQuery, values)
    .then(result => {
      res.status(204).send("Deleted")
    })
    .catch((error) => {
      errorHandler(error, req, res);
    })
}
function getMovieByIdHandler(req, res) {

  let idNumber = req.params.id

  let sqlQuery = `SELECT * FROM movies WHERE id=$1;`
  let values = [idNumber];
  client.query(sqlQuery, values)
    .then((result) => {
      res.json(result.rows)
    })
    .catch((error) => {
      errorHandler(error, req, res);
    })

}

client.connect().then(() => {
  app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
  })
}).catch((error) => {
    errorHandler(error, req, res);
  })