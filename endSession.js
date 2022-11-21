async function endSession(req, res, client) {
  try {
    const sessionID = req.cookies.sessionID;
    await client.query(`DELETE FROM sessions WHERE uuid = $1`, [sessionID]);
    res.json({ response: "session ended" });
  } catch (err) {
    res.json(err);
  }
}

module.exports = { endSession };
