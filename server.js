/* eslint-disable no-console */
/* eslint-disable quotes */
const express = require("express");
const morgan = require("morgan");
const MOVIEDEX = require("./moviedex.json");
const app = express();

app.use(morgan("dev"));

app.use((req, res) => {
  res.send("Hello, world!");
});

const PORT = 8000;

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
