exports.renderForm = (req, res) => {
  res.render("login", { title: "Login", messages: req.flash() });
};
