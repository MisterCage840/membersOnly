const { Router } = require("express")
const { isAuth } = require("../middleware/auth")
const clubController = require("../controllers/clubController")

const router = Router()

router.get("/join-club", isAuth, clubController.joinGet)
router.post("/join-club", isAuth, clubController.joinPost)

router.get("/admin", isAuth, clubController.adminGet)
router.post("/admin", isAuth, clubController.adminPost)

module.exports = router
