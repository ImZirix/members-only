const router = require("express").Router();
const joinController = require("../controllers/joinController");
const { checkAuthenticated } = require("../middleware/authMiddleware");

router.get("/", checkAuthenticated, joinController.renderJoin);
router.post("/", joinController.activateMembership);
module.exports = router;
