const router = require("express").Router();
const joinController = require("../controllers/joinController");

router.get("/", joinController.renderJoin);

module.exports = router;
