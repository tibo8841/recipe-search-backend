export default async function addIngredients(req, res) {
  const ingredients = await req.query;

  ingredients.forEach(ingredient => {
    await client.query(`INSERT INTO ingredients (ingredient_name) VALUES ($1)`, [ingredient])
  })

  res.json({ response: "Ingredients added"});
  
}
