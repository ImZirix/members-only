const db = require("../db/queries");
exports.deleteMsg = async (req, res) => {
  try {
    const msgId = req.params.id;
    if (!req.user || !req.user.is_admin) {
      return res
        .status(403)
        .send("You are not authorized to delete this message.");
    }
    const result = await db.deleteMsgById(msgId);

    if (result.rowCount === 0) {
      return res.status(404).send("Message not found.");
    }
    res.redirect("/");
  } catch (err) {
    console.error("err");
    res.status(500).send("Something went wrong while deleting the message.");
  }
};
