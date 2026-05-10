if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const mongourl = "mongodb://127.0.0.1:27017/project";
// const dburl = process.env.ATLASDB_URL;
const path = require("path");
const methodoverride = require("method-override");
const ejsmate = require("ejs-mate");
const ExpressError = require("./utils/expresserror.js");
const session = require('express-session');
const MongoStore = require("connect-mongo").default;
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const user = require("./models/user.js");


const listingsRoute = require("./routes/listing.js");
const reviewsRoute = require("./routes/review.js");
const userRoute = require("./routes/user.js");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodoverride("_method"));
app.engine("ejs", ejsmate);
app.use(express.static(path.join(__dirname, "/public")));


main().then(() => {
    console.log("db-connected");
}).catch((err) => {
    console.log(err);
});

async function main() {
    await mongoose.connect(mongourl);
}


const store = MongoStore.create({
    mongoUrl: mongourl,
    crypto: {
        secret: process.env.SECRET
    },
    touchAfter: 24 * 3600,
});

store.on("error", (err) => {
    console.log("error", err);
});


const sessionoptions = {
    store,
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
    },
};

app.use(session(sessionoptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(user.authenticate()));
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());


app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.curruser = req.user;
    next();
});

app.use("/listings", listingsRoute);
app.use("/listings/:id/reviews", reviewsRoute);
app.use("/", userRoute);

app.get("/", (req, res) => {
    res.render("listings/root.ejs");
});

//un defined route
app.use((req, res, next) => {
    next(new ExpressError(404, "Page Not Found"));
});
//error middleware
app.use((err, req, res, next) => {
    let { statusCode = 500, message = "internal issue" } = err;
    res.status(statusCode).render("listings/error", { message });
});

app.listen(8080, () => {
    console.log("connected at port 8080");
});