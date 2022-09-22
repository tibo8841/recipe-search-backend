async function addCuisines(req, res, client) {
  const { cuisines } = req.body;

  cuisines.forEach((cuisine) => {
    client.query(`INSERT INTO cuisines (cuisine_name) VALUES ($1)`, [cuisine]);
  });

  res.json({ response: "cuisines added" });
}

module.exports = { addCuisines };
