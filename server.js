const express = require("express");
const app = express();
const cors = require("cors");
const { Client } = require("pg");
const hasher = require("pbkdf2-password-hash");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const crypto = require("crypto");
const dotenv = require("dotenv");
dotenv.config();

const addIngredients = require("./addIngredients");
const addCuisines = require("./addCuisines");
const addDiets = require("./addDiets");
const getIngredients = require("./getIngredients");
const getCuisines = require("./getCuisines");
const getDiets = require("./getDiets");
const createRecipe = require("./createRecipe");
const getRecipe = require("./getRecipe");
const getUser = require("./getUser");
const getLoggedInUser = require("./getLoggedInUser");
const registerUser = require("./registerUser");
const startSession = require("./startSession");
const endSession = require("./endSession");
const getSavedRecipes = require("./getSavedRecipes");
const saveRecipe = require("./saveRecipe");
const deleteSavedRecipe = require("./deleteSavedRecipe");

const PORT = process.env.PORT || 3030;

const corsSettings = {
  origin: [
    "http://localhost:3000",
    "https://recipe-search-tibo.netlify.app",
    "https://www.recipe-search.tibo8841.co.uk",
  ],
  credentials: true,
};

const CONNECTION_STRING = process.env.CONNECTION_STRING;

const client = new Client(CONNECTION_STRING);
client.connect();

app.use(cors(corsSettings));

app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Recipe Search is working! see github repo for other endpoints");
});

app.post("/register", async (req, res) => {
  registerUser.registerUser(req, res, client, hasher);
});

app.get("/login", async (req, res) => {
  getUser.getUser(req, res, client, hasher);
});

app.get("/sessions", async (req, res) => {
  getLoggedInUser.getLoggedInUser(req, res, client);
});

app.post("/sessions", async (req, res) => {
  startSession.startSession(req, res, client, crypto);
});

app.delete("/sessions", async (req, res) => {
  endSession.endSession(req, res, client);
});

app.get("/profile/recipes", async (req, res) => {
  getSavedRecipes.getSavedRecipes(req, res, client);
});

app.post("/profile/recipes", async (req, res) => {
  saveRecipe.saveRecipe(req, res, client);
});

app.delete("/profile/recipes", async (req, res) => {
  deleteSavedRecipe.deleteSavedRecipe(req, res, client);
});

app.post("/recipes", async (req, res) => {
  createRecipe.createRecipe(req, res, client);
});

app.get("/recipes", async (req, res) => {
  getRecipe.getRecipe(req, res, client);
});

app.get("/cuisines", async (req, res) => {
  getCuisines.getCuisines(req, res, client);
});

app.get("/diets", async (req, res) => {
  getDiets.getDiets(req, res, client);
});

app.get("/ingredients", async (req, res) => {
  getIngredients.getIngredients(req, res, client);
});

app.post("/ingredients", async (req, res) => {
  addIngredients.addIngredients(req, res, client);
});

app.post("/cuisines", async (req, res) => {
  addCuisines.addCuisines(req, res, client);
});

app.post("/diets", async (req, res) => {
  addDiets.addDiets(req, res, client);
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
