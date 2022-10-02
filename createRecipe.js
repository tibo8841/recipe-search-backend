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

  console.log(
    recipeName,
    recipeLink,
    imageLink,
    minsTaken,
    ingredients,
    cuisines,
    diets
  );

  client.query(
    `INSERT INTO recipes (name, picture, link, mins_taken) VALUES ($1, $2, $3, $4)`,
    [recipeName, imageLink, recipeLink, minsTaken]
  );

  const recipeID = client.query(`SELECT id FROM recipes WHERE name = '$1'`, [
    recipeName,
  ]);

  ingredients.forEach((ingredient) => {
    client.query(
      `INSERT INTO recipes_ingredients (recipe_id, ingredient_id) VALUES ($1, $2)`,
      [recipeID, ingredient[id]]
    );
  });

  res.json({ response: "Recipe added" });
}

module.exports = { createRecipe };
