const db = require("../db/queries");
exports.renderForm = (req, res) => {
  res.render("new-message", { title: "Send Message" });
};
exports.saveMsg = async (req, res) => {
  if (!req.user.membership_status) {
    return res.redirect("/join");
  }
  try {
    const result = await db.createMsg(req.body.message, req.user.id);
    res.redirect("/");
  } catch (err) {
    res.status(500).send("Something went wrong while saving the message.");
  }
};
