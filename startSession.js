async function startSession(req, res, client, crypto) {
  const { userID } = await req.body;
  if (userID) {
    const sessionID = crypto.randomUUID();
    await client.query(
      "INSERT INTO sessions (uuid, created_at, user_id) VALUES ($1, NOW(), $2)",
      [sessionID, userID]
    );
    res.cookie("sessionID", sessionID);
    res.json({ response: "session started" });
  } else {
    res.json({ response: "session not started" });
  }
}

module.exports = { startSession };
