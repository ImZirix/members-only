require("dotenv").config();
exports.renderJoin = (req, res) => {
  res.render("join", { title: "Join" });
};
exports.activateMembership = (req, res) => {
  const { passcode } = req.body;
  if (passcode === process.env.SECRET_PASSCODE) {
    
  }
};
