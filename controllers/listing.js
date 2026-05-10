const listing = require("../models/listing.js");

module.exports.index = async (req, res) => {
    let query = {};
    if (req.query.location) {
        const locationRegex = new RegExp(req.query.location, 'i');
        query = { 
            $or: [
                { location: locationRegex },
                { country: locationRegex }
            ] 
        };
    }
    if (req.query.category) {
        query.category = req.query.category;
    }
    let alllistings = await listing.find(query);
    res.render("listings/index.ejs", { alllistings, searchQuery: req.query.location || "" });
};

module.exports.renderNewForm = (req, res) => {
    res.render("listings/new.ejs");
};

module.exports.show = async (req, res) => {
    let { id } = req.params;
    const listings = await listing.findById(id).populate({ path: "reviews", populate: { path: "author" } }).populate("owner");
    if (!listings) {
        req.flash("error", "listing not found!!");
        return res.redirect("/listings");
    }
    res.render("listings/show", { listings });
};

// module.exports.create = async (req, res, next) => {

//     let url = req.file.path;
//     let fileName = req.file.filename;
//     const newlistings = new listing(req.body.listing);
//     newlistings.owner = req.user._id;
//     newlistings.image = { url, fileName };
//     await newlistings.save();
//     req.flash("success", "New Listing Created!!!!");
//     res.redirect("/listings");
// };
module.exports.create = async (req, res, next) => {
    try {
        const apiKey = process.env.MAPS_API_KEY;
        const location = req.body.listing.location;

        // 1. Forward Geocoding using native fetch
        const geoUrl = `https://api.maptiler.com/geocoding/${encodeURIComponent(location)}.json?key=${apiKey}`;

        const response = await fetch(geoUrl);
        const data = await response.json();

        // 2. Extract Geometry
        let geometry = {
            type: "Point",
            coordinates: [0, 0] // Default fallback
        };

        if (data.features && data.features.length > 0) {
            geometry = data.features[0].geometry;
        }

        // 3. Handle File, Owner, and Data
        let url = req.file.path;
        let fileName = req.file.filename;
        const newlistings = new listing(req.body.listing);

        newlistings.owner = req.user._id;
        newlistings.image = { url, fileName };

        // 4. Attach geometry and save
        newlistings.geometry = geometry;

        await newlistings.save();

        req.flash("success", "New Listing Created!!!!");
        res.redirect("/listings");

    } catch (err) {
        next(err);
    }
};

module.exports.edit = async (req, res) => {
    let { id } = req.params;
    const item = await listing.findById(id);
    if (!item) {
        req.flash("error", "Listing not found");
        return res.redirect("/listings");
    }
    let originalurl = item.image.url;
    originalurl.replace("/upload", "/upload/h_300,w_300");
    res.render("listings/edit", { listing: item, originalurl });
};


module.exports.update = async (req, res) => {
    let { id } = req.params;
    let updatedListing = await listing.findByIdAndUpdate(id, { ...req.body.listing });

    if (typeof req.file !== "undefined") {
        let url = req.file.path;
        let filename = req.file.filename;
        updatedListing.image = { url, filename };
        await updatedListing.save();
    }

    req.flash("success", "Listing Updated!!!!");
    res.redirect(`/listings/${id}`);
};

module.exports.delete = async (req, res) => {
    let { id } = req.params;
    await listing.findByIdAndDelete(id);
    req.flash("success", "Listing Deleted!!!!");
    res.redirect("/listings");
};