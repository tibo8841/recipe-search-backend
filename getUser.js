export default async function getUser(req, res) {
  const { username, password } = await req.query;

  const result = await client.query(`SELECT * FROM users WHERE username = $1`, [
    username,
  ]);
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
