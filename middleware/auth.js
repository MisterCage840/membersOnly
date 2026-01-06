function isAuth(req, res, next) {
  if (req.isAuthenticated()) return next()
  return res.redirect("/log-in")
}
function isAdmin(req, res, next) {
  if (req.user?.admin) return next()
  return res.status(403).send("Admins only.")
}
module.exports = { isAuth, isAdmin }
