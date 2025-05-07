const express = require("express");
const router = express.Router();
const roleController = require("../controller/role.controller.js");
const auth = require("../middleware/auth.middleware.js");

router.get("/", roleController.getAll);
router.get("/:id", roleController.getById);

router.post("/", auth, roleController.create);

router.put("/:id", auth, roleController.update);
router.delete("/:id", auth, roleController.remove);

module.exports = router;
