const express = require("express");
const app = express();
const { Client } = require("pg");
const dotenv = require("dotenv");
dotenv.config();

const PORT = process.env.PORT || 8080;
const connectionString = process.env.CONNECTION_STRING;

const client = new Client(connectionString);
client.connect();

app.get("/", (req, res) => {
  res.send("Testing server works");
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
