async function getIngredients(req, res, client) {
  const ingredients = await client.query("SELECT * FROM ingredients;");

  res.json({ response: "Ingredients found", ingredients: ingredients.rows });
}

module.exports = { getIngredients };
