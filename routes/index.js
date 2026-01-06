const { Router } = require("express")
const db = require("../db/queries")

const router = Router()

router.get("/", async (req, res) => {
  const messages = await db.getAllMessages()
  res.render("pages/index", { messages })
})

module.exports = router
