const router = require("express").Router();
const passport = require("../passport/passportConfig");
const loginController = require("../controllers/loginController");

router.get("/", loginController.renderForm);
router.post(
  "/",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true,
  })
);
module.exports = router;
