const { body, validationResult } = require("express-validator")
const db = require("../db/queries")

exports.newGet = (req, res) =>
  res.render("pages/new-message", { errors: [], values: {} })

exports.newPost = [
  body("title")
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage("Title is required."),
  body("text")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Message text is required."),
  async (req, res) => {
    const errors = validationResult(req)
    const values = { title: req.body.title, text: req.body.text }

    if (!errors.isEmpty()) {
      return res
        .status(400)
        .render("pages/new-message", { errors: errors.array(), values })
    }

    await db.createMessage({
      title: req.body.title,
      text: req.body.text,
      userId: req.user.id,
    })
    res.redirect("/")
  },
]

exports.deletePost = async (req, res) => {
  await db.deleteMessage(req.params.id)
  res.redirect("/")
}
