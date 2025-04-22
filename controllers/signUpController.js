const db = require("../db/queries");
exports.renderForm = (req, res) => {
  res.render("sign-up", { title: "Sign up", error: false });
};
exports.handleSignUp = async (req, res) => {
  const { first_name, last_name, email, password } = req.body;
  try {
    const user = await db.createUser(first_name, last_name, email, password);
    res.redirect("/login");
  } catch (err) {
    console.error(err);
    res.render("sign-up", { error: "Something went wrong!", title: "SignUp" });
  }
};
