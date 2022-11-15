async function getProfile(req, res, client) {
  try {
    const sessionID = req.cookies.sessionID;
    const user = await getUserFromID(sessionID, client);
    const profile = await client.query(
      `SELECT id, username FROM users WHERE id = $1`,
      [user[0].id]
    );
    return res.json({ response: "user found", user: profile.rows[0] });
  } catch (err) {
    res.json(err);
  }
}

async function getUserFromID(sessionID, client) {
  const user = await client.query(
    "SELECT * FROM users JOIN sessions ON users.id = sessions.user_id WHERE sessions.uuid = $1",
    [sessionID]
  );
  return user.rows;
}

module.exports = { getProfile };
