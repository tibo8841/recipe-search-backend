async function addDiets(req, res, client) {
  const { diets } = req.body;

  diets.forEach((diet) => {
    client.query(`INSERT INTO diets (diet_name) VALUES ($1)`, [diet]);
  });

  res.json({ response: "diets added" });
}

module.exports = { addDiets };
