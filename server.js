/* eslint-disable no-console */
/* eslint-disable quotes */
require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const MOVIEDEX = require("./moviedex.json");
const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(helmet());

app.use(function validateBearer(req, res, next) {
  const apiToken = process.env.API_TOKEN;
  const authToken = req.get("Authorization");
  console.log("validate bearer token middlewear");
  if (!authToken || authToken.split(" ")[1] !== apiToken) {
    return res.status(401).json({ error: "Unauthorized request" });
  }
  next();
});

app.get("/genre", function handleGetGenres(req, res) {
  let genres = [];
  MOVIEDEX.forEach((movie) => genres.push(movie.genre));
  genres = genres.filter((genre, index) => {
    return genres.indexOf(genre) === index;
  });
  res.send(genres);
});

app.get("/movie", function handleGetMovie(req, res) {
  let response = MOVIEDEX;
  if (req.query.genre) {
    response = response.filter((movie) =>
      movie.genre.toLowerCase().includes(req.query.genre.toLowerCase())
    );
  }
  if (req.query.country) {
    response = response.filter((movie) =>
      movie.country.toLowerCase().includes(req.query.country.toLowerCase())
    );
  }
  if (req.query.vote) {
    response = response.filter((movie) => movie["avg_vote"] >= req.query.vote);
  }
  res.json(response);
});

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
