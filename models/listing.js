const mongoose = require("mongoose");
const review = require("./review");
const schema = mongoose.Schema;

const listingschema = new schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    image: {
        url: String,
        filename: String
    },
    price: Number,
    location: String,
    country: String,
    reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "review"
        },
    ],
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    },
    geometry: {
        type: {
            type: String,
            enum: ["Point"],
            required: true,
        },
        coordinates: {
            type: [Number],
            required: true,
        },
    },
});
listingschema.post("findOneAndDelete", async (listing) => {
    if (listing) {
        await review.deleteMany({ _id: { $in: listing.reviews } });
    }
});

const listing = mongoose.model("listing", listingschema);
module.exports = listing;