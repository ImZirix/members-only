const router = require("express").Router();
const signUpController = require("../controllers/signUpController");
const {
  checkNotAuthenticated,
  checkAuthenticated,
} = require("../middleware/authMiddleware");

router.get("/", checkNotAuthenticated, signUpController.renderForm);
router.post("/", signUpController.handleSignUp);
module.exports = router;
