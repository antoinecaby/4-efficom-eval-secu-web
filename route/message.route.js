const express = require("express");
const router = express.Router();
const messageController = require("../controller/message.controller.js");
const auth = require("../middleware/auth.middleware.js");

router.get("/", limiter(1, 5), messageController.getAll);
router.get("/:id", messageController.getById);

router.post("/", auth, limiter(1, 5), messageController.create);

router.put("/:id", auth, messageController.update);
router.delete("/:id", auth, messageController.remove);

module.exports = router;
