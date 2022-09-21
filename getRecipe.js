export default async function getRecipe(req, res) {
  const { search, cuisine, diet } = await req.query;

  const recipe = await client.query(
    `SELECT * FROM recipes WHERE `
    //Join tables to see the ingredients etc.. to be able to search by them
  );
  if (result.rows.length === 0) {
    res.json({ response: "User not found" });
  } else {
    const auth = await hasher.compare(password, result.rows[0].password);
    if (!auth) {
      res.json({ response: "Incorrect Password" });
    } else {
      res.json({ response: "User Found", user: result.rows[0] });
    }
  }
}
