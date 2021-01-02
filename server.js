/* eslint-disable no-console */
/* eslint-disable quotes */
require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const MOVIEDEX = require("./moviedex.json");
const app = express();
app.use(morgan("dev"));

app.use(function validateBearer(req, res, next) {
  const apiToken = process.env.API_TOKEN;
  const authToken = req.get("Authorization");
  console.log("validate bearer token middlewear");
  if (!authToken || authToken.split(" ")[1] !== apiToken) {
    return res.status(401).json({ error: "Unauthorized request" });
  }
  next();
});

console.log(`API_TOKEN is ${process.env.API_TOKEN}`);

app.get("/movie", function handleGetMovie(req, res) {
  let response = MOVIEDEX["movie_title"];
  if (req.query.genre) {
    response = response.filter((movie) =>
      movie.genre.includes(req.query.genre)
    );
  }
  if (req.query.country) {
    response = response.filter((movie) =>
      movie.genre.includes(req.query.country)
    );
  }
  if (req.query["avg_vote"]) {
    response = response.filter((movie) =>
      movie["avg_vote"].includes(req.query.vote)
    );
  }
  res.json(response);
});

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
