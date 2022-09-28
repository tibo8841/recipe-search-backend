const addIngredients = require("./addIngredients");
const addCuisines = require("./addCuisines");
const addDiets = require("./addDiets");
const getIngredients = require("./getIngredients");
const getCuisines = require("./getCuisines");
const getDiets = require("./getDiets");

const express = require("express");
const cors = require("cors");
const app = express();
const { Client } = require("pg");
const hasher = require("pbkdf2-password-hash");
const cookieParser = require("cookie-parser");
const crypto = require("crypto");
const dotenv = require("dotenv");
dotenv.config();

const PORT = process.env.PORT || 8080;

const corsSettings = {
  origin: ["http://localhost:3000", "https://recipe-search-tibo.netlify.app"],
  credentials: true,
};

const connectionString = process.env.CONNECTION_STRING;

const client = new Client(connectionString);
client.connect();

app.use(cors(corsSettings));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Recipe Search is working! see github repo for other endpoints");
});

// app.post("/register", async (req, res) => {
//   await registerUser(req, res);
// });

// app.get("/login", async (req, res) => {
//   await getUser(req, res);
// });

// app.get("/sessions", async (req, res) => {
//   await getLoggedInUser(req, res);
// });

// app.post("/sessions", async (req, res) => {
//   await startSession(req, res);
// });

// app.delete("/sessions", async (req, res) => {
//   await endSession(req, res);
// });

// app.get("/profile", async (req, res) => {
//   await getProfile(req, res);
// });

// app.patch("/profile/picture", async (req, res) => {
//   await updateProfilePicture(req, res);
// });

// app.post("/profile/recipes", async (req, res) => {
//   await saveRecipe(req, res);
// });

// app.delete("/profile/recipes", async (req, res) => {
//   await deleteSavedRecipe(req, res);
// });

// app.post("/recipe", async (req, res) => {
//   await createRecipe(req, res);
// });

// app.get("/recipe", async (req, res) => {
//   await getRecipe(req, res);
// });

// app.get("/cuisines", async (req, res) => {
//   getCuisines.getCuisines(req, res, client);
// });

// app.get("/diets", async (req, res) => {
//   getDiets.getDiets(req, res, client);
// });

// app.get("/ingredients", async (req, res) => {
//   getIngredients.getIngredients(req, res, client);
// });

// app.post("/ingredients", async (req, res) => {
//   addIngredients.addIngredients(req, res, client);
// });

// app.post("/cuisines", async (req, res) => {
//   addCuisines.addCuisines(req, res, client);
// });

// app.post("/diets", async (req, res) => {
//   addDiets.addDiets(req, res, client);
// });

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Example app listening on port ${PORT}`);
});

module.exports = app;
