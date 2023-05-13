const express = require("express");
const router = express.Router();
const UserController = require("../../controllers/user-controller");

router.post("/user", UserController.create);
router.delete("/user/:id", UserController.destroy);

router.get("/user/:id", UserController.getById);
module.exports = router;
