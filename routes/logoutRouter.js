const router = require("express").Router();
const logoutController = require("../controllers/logoutController");
const { checkAuthenticated } = require("../middleware/authMiddleware");

router.get("/", checkAuthenticated, logoutController.logoutUser);

module.exports = router;
