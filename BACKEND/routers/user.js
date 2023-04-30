const express = require("express");
const {register, login, showMe, logout} = require("../controllers/users");
const auth = require("../middleware/authentication");

const userRouter = express.Router();

userRouter.route("/register").post(register);
userRouter.route("/login").post(login);
userRouter.route("/showme").get(auth, showMe);
userRouter.route("/logout").get(auth, logout);

module.exports = userRouter;