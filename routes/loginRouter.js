const router = require("express").Router();
const passport = require("../passportConfig");
const loginController = require("../controllers/loginController");
const { checkNotAuthenticated } = require("../middleware/authMiddleware");

router.get("/", checkNotAuthenticated, loginController.renderForm);
router.post(
  "/",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true,
  })
);
module.exports = router;
