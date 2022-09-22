async function getCuisines(req, res, client) {
  const cuisines = await client.query("SELECT * FROM cuisines;");

  res.json({ response: "Cuisines found", cuisines: cuisines.rows });
}

module.exports = { getCuisines };
