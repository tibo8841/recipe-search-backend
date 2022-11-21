async function getLoggedInUser(req, res, client) {
  const sessionID = req.cookies.sessionID;
  const user = await getUserFromID(sessionID, client);
  if (user.length > 0) {
    return res.json({
      response: true,
      username: user[0].username,
      id: user[0].user_id,
    });
  } else {
    return res.json({ response: false });
  }
}

async function getUserFromID(sessionID, client) {
  const user = await client.query(
    "SELECT * FROM users JOIN sessions ON users.id = sessions.user_id WHERE sessions.uuid = $1",
    [sessionID]
  );
  return user.rows;
}

module.exports = { getLoggedInUser };
