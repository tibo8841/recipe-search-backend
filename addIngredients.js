async function addIngredients(req, res, client) {
  const ingredients = req.body;

  ingredients.forEach((ingredient) => {
    client.query(`INSERT INTO ingredients (ingredient_name) VALUES ($1)`, [
      ingredient,
    ]);
  });

  res.json({ response: "Ingredients added" });
}

module.exports = { addIngredients };
