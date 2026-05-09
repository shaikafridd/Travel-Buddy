const user = require("../models/user");

module.exports.signup = (req, res) => {
    res.render("user/signup.ejs");
};

module.exports.postsignup = async (req, res) => {
    try {
        let { username, email, password } = req.body;
        const newuser = new user({ email, username });
        const registereduser = await user.register(newuser, password);
        console.log(registereduser);
        req.login(registereduser, (err) => {
            if (err) {
                return next(err);
            }
            req.flash("success", "welcome To Travel Buddyy");
            res.redirect("/listings");
        })
    } catch (e) {
        req.flash("error", e.message);
        res.redirect("/signup");
    }
};

module.exports.login = (req, res) => {
    res.render("user/login.ejs");
};

module.exports.postlogin = async (req, res) => {
    req.flash("success", "Welcome Back To Travel Buddy!!!");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
};

module.exports.logout = (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next();
        }
        req.flash("success", "you have been logged out");
        res.redirect("/listings");
    })
}