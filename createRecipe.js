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

  // ingredients.forEach((ingredient) => {
  //   client.query(`INSERT INTO ingredients (ingredient_name) VALUES ($1)`, [
  //     ingredient,
  //   ]);
  // });

  res.json({ response: "Recipe added" });
}

module.exports = { createRecipe };
