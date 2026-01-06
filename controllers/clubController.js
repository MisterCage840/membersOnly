const db = require("../db/queries")

exports.joinGet = (req, res) => res.render("pages/join-club", { error: null })

exports.joinPost = async (req, res) => {
  if (req.body.passcode !== process.env.CLUB_PASSCODE) {
    return res
      .status(400)
      .render("pages/join-club", { error: "Wrong passcode." })
  }
  await db.setMembershipStatus(req.user.id, true)
  res.redirect("/")
}

exports.adminGet = (req, res) => res.render("pages/admin", { error: null })

exports.adminPost = async (req, res) => {
  if (req.body.passcode !== process.env.ADMIN_PASSCODE) {
    return res.status(400).render("pages/admin", { error: "Wrong passcode." })
  }
  await db.setAdmin(req.user.id, true)
  res.redirect("/")
}
