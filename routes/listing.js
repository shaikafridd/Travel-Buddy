const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { isloggedin, isOwner, validListing } = require("../middleware.js");
const listingcontrollers = require("../controllers/listing.js");
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

router.get("/", wrapAsync(listingcontrollers.index));

router.get("/new", isloggedin, (listingcontrollers.renderNewForm));

//show route
router.get("/:id", wrapAsync(listingcontrollers.show));

//new form
router.get("/new", isloggedin, (listingcontrollers.renderNewForm));

// create route
router.post(
    "/",
    isloggedin,
    upload.single("listing[image]"),
    validListing,
    wrapAsync(listingcontrollers.create)
);

//edit route
router.get("/:id/edit", isloggedin, isOwner, wrapAsync(listingcontrollers.edit));

//update
router.put(
    "/:id",
    isloggedin,
    isOwner,
    upload.single("listing[image]"),
    validListing,
    wrapAsync(listingcontrollers.update)
);

//delete route
router.delete("/:id", isloggedin, isOwner, wrapAsync(listingcontrollers.delete));

module.exports = router;