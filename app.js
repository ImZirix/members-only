const express = require("express");
const path = require("node:path");
const session = require("express-session");
const expressEjsLayouts = require("express-ejs-layouts");
const passport = require("./passport/passportConfig");
const flash = require("connect-flash");
const app = express();
require("dotenv").config();

// Route imports
const indexRouter = require("./routes/indexRouter");
const signUpRouter = require("./routes/signUpRouter");
const loginRouter = require("./routes/loginRouter");
const joinRouter = require("./routes/joinRouter");

// Set up the view engine and views folder
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middlewares
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(expressEjsLayouts);
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);
app.use(passport.session());
app.use(flash());

// Routes
app.use("/", indexRouter);
app.use("/sign-up", signUpRouter);
app.use("/login", loginRouter);
app.use("/join", joinRouter);

// Start server
app.listen(process.env.PORT, () => {
  console.log(`Server is running on ${process.env.PORT}`);
});
