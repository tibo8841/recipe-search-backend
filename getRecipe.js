async function getRecipe(req, res, client) {
  const { ingredients, cuisine, diet } = await req.query;

  let ingredientID;
  let cuisineID;
  let dietID;
  let joinString = "SELECT * FROM recipes";
  let whereString = " WHERE ";
  let queryArr = [];

  if (ingredients) {
    ingredientID = await client.query(
      `SELECT id FROM ingredients WHERE ingredient_name = $1`,
      [ingredients]
    );
    ingredientID = ingredientID.rows[0]["id"];
    joinString +=
      " INNER JOIN recipes_ingredients AS r_i ON recipes.id = r_i.recipe_id";
    whereString += "r_i.ingredient_id = $1;";
    queryArr.push(ingredientID);
  }

  if (cuisine) {
    cuisineID = await client.query(
      `SELECT id FROM cuisines WHERE cuisine_name = $1`,
      [cuisine]
    );
    cuisineID = cuisineID.rows[0]["id"];
    joinString +=
      " INNER JOIN recipes_cuisines AS r_c ON recipes.id = r_c.recipe_id";
    whereString += "r_c.cuisine_id = $2;";
    queryArr.push(cuisineID);
  }

  if (diet) {
    dietID = await client.query(`SELECT id FROM diets WHERE diet_name = $1`, [
      diet,
    ]);
    dietID = dietID.rows[0]["id"];
    joinString +=
      " INNER JOIN recipes_diets AS r_d ON recipes.id = r_d.recipe_id";
    whereString += "r_d.diet_id = $3;";
    queryArr.push(dietID);
  }

  whereString = whereString.replaceAll(";r", " AND r");

  let queryString = joinString + whereString;

  let recipes = await client.query(queryString, queryArr);

  let ingredientsList = [];
  let cuisinesList = [];
  let dietsList = [];

  for (const recipe of recipes.rows) {
    let fullIngredients = await client.query(
      `SELECT * FROM ingredients
      INNER JOIN recipes_ingredients AS r_i ON ingredients.id = r_i.ingredient_id
      WHERE r_i.recipe_id = $1`,
      [recipe.id]
    );
    let fullCuisines = await client.query(
      `SELECT * FROM cuisines
      INNER JOIN recipes_cuisines AS r_c ON cuisines.id = r_c.cuisine_id
      WHERE r_c.recipe_id = $1`,
      [recipe.id]
    );
    let fullDiets = await client.query(
      `SELECT * FROM diets
      INNER JOIN recipes_diets AS r_d ON diets.id = r_d.diet_id
      WHERE r_d.recipe_id = $1`,
      [recipe.id]
    );
    ingredientsList.push(fullIngredients.rows);
    cuisinesList.push(fullCuisines.rows);
    dietsList.push(fullDiets.rows);
  }

  res.json({
    response: "Recipes found",
    Recipes: recipes.rows,
    Ingredients: ingredientsList,
    Cuisines: cuisinesList,
    Diets: dietsList,
  });
}

module.exports = { getRecipe };
