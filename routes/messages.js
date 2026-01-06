const { Router } = require("express")
const { isAuth, isAdmin } = require("../middleware/auth")
const messageController = require("../controllers/messageController")

const router = Router()

router.get("/messages/new", isAuth, messageController.newGet)
router.post("/messages/new", isAuth, messageController.newPost)
router.post("/messages/:id/delete", isAdmin, messageController.deletePost)

module.exports = router
