const express = require("express");
const router = express.Router();
const user = require("../models/user");
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { saveRedirectedUrl } = require("../middleware.js");
const usercontroller = require("../controllers/user.js");


router.get("/signup", (usercontroller.signup));

router.post("/signup", wrapAsync(usercontroller.postsignup));

router.get("/login", (usercontroller.login));

router.post("/login", saveRedirectedUrl, passport.authenticate("local", { failureRedirect: '/login', failureFlash: true }), (usercontroller.postlogin));


router.get("/logout", (usercontroller.logout));

module.exports = router;