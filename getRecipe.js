async function getRecipe(req, res, client) {
  const { search, ingredients, cuisine, diet } = await req.query;

  let ingredientID;
  let cuisineID;
  let dietID;

  if (ingredients) {
    ingredientID = await client.query(
      `SELECT id FROM ingredients WHERE ingredient_name = $1`,
      [ingredients]
    );
    ingredientID = ingredientID.rows[0]["id"];
  }

  if (cuisine) {
    cuisineID = await client.query(
      `SELECT id FROM cuisines WHERE cuisine_name = $1`,
      [cuisine]
    );
    cuisineID = cuisineID.rows[0]["id"];
  }

  if (diet) {
    dietID = await client.query(`SELECT id FROM diets WHERE diet_name = $1`, [
      diet,
    ]);
    dietID = dietID.rows[0]["id"];
  }

  let recipe = await client.query(
    `SELECT * FROM recipes
     INNER JOIN recipes_ingredients AS r_i
     ON recipes.id = r_i.recipe_id
     INNER JOIN recipes_cuisines AS r_c
     ON recipes.id = r_c.recipe_id
     INNER JOIN recipes_diets AS r_d
     ON recipes.id = r_d.recipe_id
     WHERE r_i.ingredient_id = $1 AND r_c.cuisine_id = $2 AND r_d.diet_id = $3`,
    [ingredientID, cuisineID, dietID]
  );

  console.log(recipe.rows);
}

// NOTE TO SELF: figure out how to make it work for some search expressions in SQL query if not all are there
// e.g. cuisine=italian, ingredients=pasta returns nothing but if you add diet=vegan it returns aglio e olio

module.exports = { getRecipe };
