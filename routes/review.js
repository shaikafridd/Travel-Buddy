const express = require("express");
const router = express.Router({ mergeParams: true });
const listing = require("../models/listing.js")
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/expresserror.js");
const { reviewSchema } = require("../schema.js");
const review = require("../models/review.js");
const { isloggedin, isReiviewOwner } = require("../middleware.js");
const reviewcontrollers = require("../controllers/reviews.js");
// const validreview = require("../middleware.js");


const validreview = (req, res, next) => {
    let { error } = reviewSchema.validate(req.body);
    if (error) {
        let errmsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(404, errmsg);
    } else {
        next();
    }
};
//review route submiiting form
//post request
router.post("/", validreview, isloggedin, wrapAsync(reviewcontrollers.create));

//delete request review
router.delete("/:reviewId", isloggedin, isReiviewOwner, wrapAsync(reviewcontrollers.delete));

module.exports = router;