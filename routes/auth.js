const { Router } = require("express")
const passport = require("passport")
const authController = require("../controllers/authController")

const router = Router()

router.get("/sign-up", authController.signUpGet)
router.post("/sign-up", authController.signUpPost)

router.get("/log-in", authController.logInGet)
router.post(
  "/log-in",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/log-in",
  })
)

router.get("/log-out", authController.logOutGet)

module.exports = router
