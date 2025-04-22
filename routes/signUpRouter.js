const router = require("express").Router();
const signUpController = require("../controllers/signUpController");

router.get("/", signUpController.renderForm);
router.post("/", signUpController.handleSignUp);
module.exports = router;
