async function createRecipe(req, res, client) {
  const {
    recipeName,
    recipeLink,
    imageLink,
    minsTaken,
    ingredients,
    cuisines,
    diets,
  } = req.body;

  let recipeID = await client.query(
    `INSERT INTO recipes (name, picture, link, mins_taken) VALUES ($1, $2, $3, $4)
    RETURNING id`,
    [recipeName, imageLink, recipeLink, minsTaken]
  );

  recipeID = recipeID.rows[0]["id"];

  ingredients.forEach((ingredient) => {
    client.query(
      `INSERT INTO recipes_ingredients (recipe_id, ingredient_id) VALUES ($1, $2)`,
      [recipeID, ingredient["id"]]
    );
  });

  cuisines.forEach((cuisine) => {
    client.query(
      `INSERT INTO recipes_cuisines (recipe_id, cuisine_id) VALUES ($1, $2)`,
      [recipeID, cuisine["id"]]
    );
  });

  diets.forEach((diet) => {
    client.query(
      `INSERT INTO recipes_diets (recipe_id, diet_id) VALUES ($1, $2)`,
      [recipeID, diet["id"]]
    );
  });

  res.json({ response: "Recipe added" });
}

module.exports = { createRecipe };
