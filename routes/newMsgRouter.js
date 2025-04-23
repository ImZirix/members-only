const router = require("express").Router();
const newMsgController = require("../controllers/newMsgController");
const { checkAuthenticated } = require("../middleware/authMiddleware");

router.get("/", checkAuthenticated, newMsgController.renderForm);
router.post("/", checkAuthenticated, newMsgController.saveMsg);

module.exports = router;
