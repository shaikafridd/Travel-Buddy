const express = require("express");
const app = express();
const session = require('express-session');

const sessionoptions = {
    secret: "code",
    resave: false,
    saveUninitialized: true,
};

app.use(session(sessionoptions));

app.get("/register", (req, res) => {
    let { name } = req.query;
    req.session.name = name;
    res.redirect("/hello");
});

app.get("/hello", (req, res) => {
    res.send(`hello welcome${req.session.name}`);
});

app.listen(3000, () => {
    console.log("connected at port 8080");
});