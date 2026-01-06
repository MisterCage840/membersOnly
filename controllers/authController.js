const bcrypt = require("bcryptjs")
const { body, validationResult } = require("express-validator")
const db = require("../db/queries")

exports.signUpGet = (req, res) =>
  res.render("pages/signup", { errors: [], values: {} })

exports.signUpPost = [
  body("firstName")
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage("First name is required."),
  body("lastName")
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage("Last name is required."),
  body("username")
    .trim()
    .isLength({ min: 3, max: 30 })
    .withMessage("Username must be 3–30 characters."),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters."),
  body("confirmPassword").custom((value, { req }) => {
    if (value !== req.body.password) throw new Error("Passwords do not match.")
    return true
  }),
  body("admin").optional().toBoolean(),

  async (req, res) => {
    const errors = validationResult(req)
    const values = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      username: req.body.username,
      admin: !!req.body.admin,
    }

    if (!errors.isEmpty()) {
      return res
        .status(400)
        .render("pages/signup", { errors: errors.array(), values })
    }

    const existing = await db.findUserByUsername(req.body.username)
    if (existing) {
      return res.status(400).render("pages/signup", {
        errors: [{ msg: "Username already in use." }],
        values,
      })
    }

    const passwordHash = await bcrypt.hash(req.body.password, 10)

    await db.createUser({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      username: req.body.username,
      passwordHash,
    })

    return res.redirect("/log-in")
  },
]

exports.logInGet = (req, res) => res.render("pages/login")

exports.logOutGet = (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err)
    res.redirect("/")
  })
}
