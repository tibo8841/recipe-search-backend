async function registerUser(req, res) {
  const { username, password } = await req.body;

  const usernameCheck = await client.query(
    `SELECT * FROM users WHERE username = $1`,
    [username]
  );
  if (usernameCheck.rows.length != 0) {
    res.json({ response: "username already exists" });
  } else {
    await client.query(
      `INSERT INTO users (username,password,created_at) VALUES($1,$2,NOW())`,
      [username, await hasher.hash(password)]
    );
    const newUser = await client.query(
      `SELECT * FROM users WHERE username = $1`,
      [username]
    );
    await client.query(
      `INSERT INTO user_customisation (user_id, profile_picture_id) 
    VALUES($1, 1)`,
      [newUser.rows[0].id]
    );
    res.json({ response: "added new user" });
  }
}

module.exports = { registerUser };
