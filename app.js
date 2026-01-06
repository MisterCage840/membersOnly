const express = require("express")
const path = require("path")
const session = require("express-session")
const pgSession = require("connect-pg-simple")(session)
const passport = require("passport")
const helmet = require("helmet")
require("dotenv").config()

const pool = require("./db/pool")

// routes
const indexRouter = require("./routes/index")
const authRouter = require("./routes/auth")
const clubRouter = require("./routes/club")
const messagesRouter = require("./routes/messages")

// passport config
require("./config/passport")

const app = express()

app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))

app.use(helmet())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, "public")))

app.use(
  session({
    store: new pgSession({
      pool,
      createTableIfMissing: true,
    }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
  })
)

app.use(passport.session())

// Make user available in all views
app.use((req, res, next) => {
  res.locals.currentUser = req.user
  next()
})

app.use("/", indexRouter)
app.use("/", authRouter)
app.use("/", clubRouter)
app.use("/", messagesRouter)

module.exports = app
