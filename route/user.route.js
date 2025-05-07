const express = require("express");
const router = express.Router();
const userController = require("./../controller/user.controller.js");
const auth = require("../middleware/auth.middleware.js");

router.get("/", limiter(1, 5), userController.getAll);
router.get("/:id", userController.getById);

router.post("/", limiter(1, 5), userController.create);

router.put("/:id", userController.update);
router.delete("/:id", userController.remove);

router.put("/role/:userId/:roleId", auth("Admin"), userController.addRole);
router.delete(
  "/role/:userId/:roleId",
  auth("Admin"),
  userController.removeRole
);

module.exports = router;
