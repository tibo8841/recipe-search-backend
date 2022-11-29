async function getLoggedInUser(req, res, client) {
  console.log(req.cookies);
  const sessionID = req.cookies.sessionID;
  console.log(sessionID);
  const user = await getUserFromID(sessionID, client);
  if (user.length > 0) {
    res.json({
      response: true,
      username: user[0].username,
      id: user[0].user_id,
    });
  } else {
    res.json({ response: false, sessionID: sessionID, user: user });
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
