async function getDiets(req, res, client) {
  const diets = await client.query("SELECT * FROM diets;");

  res.json({ response: "Diets found", diets: diets.rows });
}

module.exports = { getDiets };
