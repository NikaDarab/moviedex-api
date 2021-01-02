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

const validGenre = [`Animation`, `Drama`, `Comedy`, `Romantic`];

const handleGetGenres = (req, res) => {
  res.json(validGenre);
};

const handleGetCountry = (req, res) => {
  res.send("the list of the movies based on the country");
};

const handleAverageVote = (req, res) => {
  res.send("the list of the movies based on the average vote");
};

app.get("/genre", handleGetGenres);
app.get("/country", handleGetCountry);
app.get("/vote"), handleAverageVote;

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
