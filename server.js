import getUser from "./getUser";
import registerUser from "./registerUser";
import addIngredients from "./addIngredients";

const express = require("express");
const app = express();
const { Client } = require("pg");
const hasher = require("pbkdf2-password-hash");
const cookieParser = require("cookie-parser");
const crypto = require("crypto");
const dotenv = require("dotenv");
dotenv.config();

const PORT = process.env.PORT || 8080;
const connectionString = process.env.CONNECTION_STRING;

const client = new Client(connectionString);
client.connect();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Recipe Search");
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});

app.post("/register", async (req, res) => {
  await registerUser(req, res);
});

app.get("/login", async (req, res) => {
  await getUser(req, res);
});

app.get("/sessions", async (req, res) => {
  await getLoggedInUser(req, res);
});

app.post("/sessions", async (req, res) => {
  await startSession(req, res);
});

app.delete("/sessions", async (req, res) => {
  await endSession(req, res);
});

app.get("/profile", async (req, res) => {
  await getProfile(req, res);
});

app.patch("/profile/picture", async (req, res) => {
  await updateProfilePicture(req, res);
});

app.post("/profile/recipes", async (req, res) => {
  await saveRecipe(req, res);
});

app.delete("/profile/recipes", async (req, res) => {
  await deleteSavedRecipe(req, res);
});

app.post("/recipe", async (req, res) => {
  await createRecipe(req, res);
});

app.get("/recipe", async (req, res) => {
  await getRecipe(req, res);
});

app.get("/cuisines", async (req, res) => {
  await getCuisines(req, res);
});

app.get("/diets", async (req, res) => {
  await getDiets(req, res);
});

app.get("/ingredients", async (req, res) => {
  await getCuisines(req, res);
});

app.post("/ingredients", async (req, res) => {
  await addIngredients(req, res);
});
