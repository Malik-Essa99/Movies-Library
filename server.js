'use strict'

const express = require('express')
const movieData = require('./Movie Data/data.json')
const app = express()
const port = 3000

function Movie(title, poster, overview) {
  this.title = title;
  this.poster = poster;
  this.overview = overview;
}

app.get('/', homeRouteHandler);

function homeRouteHandler(req, res) {
  let newMovie = new Movie(movieData.title, movieData.poster_path, movieData.overview);
  res.json(newMovie);
}

app.get('/favorite', favoriteRouteHandler);

function favoriteRouteHandler(req, res) {
  res.send("Welcome to Favorite Page");
}
app.get('/Error', causeAnError)

function causeAnError(req, res) {
  res.sendddddd('Error');
}

app.get('*', pageNotFoundHandler)

function pageNotFoundHandler(req, res) {
  res.send('page not found!', 404);
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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})