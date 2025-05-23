const router = require("express").Router();
const indexController = require("../controllers/indexController");
const { checkAuthenticated } = require("../middleware/authMiddleware");

router.get("/", indexController.renderIndex);

module.exports = router;
