/* eslint-disable no-console */
/* eslint-disable quotes */
require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const MOVIEDEX = require("./moviedex.json");
const app = express();

app.use(morgan("dev"));

console.log(`API_TOKEN is ${process.env.API_TOKEN}`);

const validGenre = [`Animation`, `Drama`, `Comedy`, `Romantic`];
const handleGetTypes = (req, res) => {
  res.json(validGenre);
};

app.get("/genre", handleGetTypes);

app.listen(8000, () => {
  console.log(`Server listening at http://localhost:${8000}`);
});
