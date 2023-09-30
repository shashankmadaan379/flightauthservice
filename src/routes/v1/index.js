const express = require("express");
const router = express.Router();
const UserController = require("../../controllers/user-controller");
const { AuthRequestValidators } = require("../../middlewares/index");
router.post(
  "/user",
  // AuthRequestValidators.validateUserAuth,
  UserController.create
);
router.delete("/user/:id", UserController.destroy);

router.get("/user/:id", UserController.getById);
router.post(
  "/signin",
  AuthRequestValidators.validateUserAuth,
  UserController.signIn
);
module.exports = router;
