const router = require("express").Router();
const deleteController = require("../controllers/deleteController");

router.post("/:id", deleteController.deleteMsg);

module.exports = router;
