const { listingSchema } = require("./schema.js");
const ExpressError = require("./utils/expresserror.js");
const { reviewSchema } = require("./schema.js");
const listing = require("./models/listing.js")
const review = require("./models/review.js")

module.exports.isloggedin = ((req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.redirectUrl = req.originalUrl;
        req.flash("error", "You Have To Logged In First!!");
        return res.redirect("/login");
    }
    next();
});

module.exports.saveRedirectedUrl = ((req, res, next) => {
    if (req.session.redirectUrl) {
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
});

module.exports.isOwner = async (req, res, next) => {
    let { id } = req.params;
    let foundlisting = await listing.findById(id);
    if (!foundlisting.owner.equals(res.locals.curruser._id)) {
        req.flash("error", "chall madarchod");
        return res.redirect(`/listings/${id}`);
    }
    next();
};

module.exports.validListing = (req, res, next) => {
    let { error } = listingSchema.validate(req.body);
    if (error) {
        let errmsg = error.details.map((el) => el.message).join(",");
        console.log(errmsg);
        throw new ExpressError(400, errmsg);
    } else {
        next();
    }
};


// module.exports.validreview = (req, res, next) => {
//     let { error } = reviewSchema.validate(req.body);
//     if (error) {
//         let errmsg = error.details.map((el) => el.message).join(",");
//         throw new ExpressError(404, errmsg);
//     } else {
//         next();
//     }
// };


module.exports.isReiviewOwner = async (req, res, next) => {
    let { id, reviewId } = req.params;
    let reviewowner = await review.findById(reviewId);
    if (!reviewowner.author.equals(res.locals.curruser._id)) {
        req.flash("error", "chall madarchod");
        return res.redirect(`/listings/${id}`);
    }
    next();
};
