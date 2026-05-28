const express = require("express");
const session = require("express-session");
const path = require("path");

const app = express();

require("./config/db");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

app.use(session({
    secret: "movie-secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24
    }
}));

app.set("view engine", "ejs");

const authRoutes = require("./routes/authRoutes");
const movieRoutes = require("./routes/movieRoutes");
const adminRoutes = require("./routes/adminRoutes");

app.use(authRoutes);
app.use(movieRoutes);
app.use(adminRoutes);

app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});