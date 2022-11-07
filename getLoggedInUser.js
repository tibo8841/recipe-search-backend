async function getLoggedInUser(req, res, client) {
  const sessionID = req.cookies.sessionID;
  const user = await getUserFromID(sessionID);
  if (user.length > 0) {
    return res.json({ response: true });
  } else {
    return res.json({ response: false });
  }
}

async function getUserFromID(sessionID) {
  const user = await client.query(
    "SELECT * FROM users JOIN sessions ON users.id = sessions.user_id WHERE sessions.uuid = $1",
    [sessionID]
  );
  return user.rows;
}

module.exports = { getLoggedInUser };
