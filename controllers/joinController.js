require("dotenv").config();
const db = require("../db/queries");
exports.renderJoin = (req, res) => {
  res.render("join", { title: "Join" });
};
exports.activateMembership = async (req, res, next) => {
  const { passcode } = req.body;
  try {
    if (passcode !== process.env.SECRET_PASSCODE) {
      return res.status(401).send("invalid passcode");
    }
    const result = await db.setMember(req.user.id);
    if (result.rowCount === 0) {
      return res.status(404).send("User not found");
    }
    console.log(req.user.id);
    res.redirect("/");
  } catch (err) {
    next(err);
  }
};
