const review = require("../models/review.js");
const listing = require("../models/listing.js");

module.exports.create = async (req, res) => {
    let listingInstance = await listing.findById(req.params.id);
    let newReview = new review(req.body.review);
    newReview.author = req.user._id;

    listingInstance.reviews.push(newReview);
    await newReview.save();
    await listingInstance.save();
    req.flash("success", "Review Created!!!!");
    res.redirect(`/listings/${listingInstance._id}`);
};

module.exports.delete = async (req, res) => {
    let { id, reviewId } = req.params;
    await listing.findByIdAndUpdate(id, { $pull: { review: reviewId } });
    await review.findByIdAndDelete(reviewId);
    req.flash("success", "Review Deleted!!!!");
    res.redirect(`/listings/${id}`);
};
