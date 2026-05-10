const joi = require('joi');

module.exports.listingSchema = joi.object({
    listing : joi.object({
        title : joi.string().required(),
        description : joi.string().required(),
        price : joi.number().required().min(0),
        // Update this part:
        image: joi.object({
            url: joi.string().allow("", null),
            filename: joi.string().allow("", null)
        }).allow("", null), 
        country : joi.string().required(),
        location: joi.string().required(),
        category: joi.string().valid('Trending', 'Rooms', 'Mountains', 'Iconic cities', 'Castles', 'Amazing pools', 'Camping', 'Beaches', 'Domes').required()
    }).required(),
});

module.exports.reviewSchema = joi.object({
    review : joi.object({
        rating : joi.number().required().min(1).max(5),
        comment : joi.string().required()
    }).required()
});