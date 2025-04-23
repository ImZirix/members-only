const db = require("../db/queries");
exports.renderIndex = async (req, res) => {
  try {
    const messages = await db.getAllMsgs();
    res.render("index", { title: "Home", user: req.user, messages });
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to load messages.");
  }
};
