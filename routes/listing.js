const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const Listing = require("../models/listing.js");
const { listingSchema, reviewSchema } = require("../schema.js");
const {isLoggedIn} = require("../middleware.js");
const validateListing = (req, res, next) => {
  let { error } = listingSchema.validate(req.body);
  if (error) {
    throw new ExpressError(400, error);
  } else {
    next();
  }
};

router.get("/", async (req, res) => {
  const allListings = await Listing.find({});
  res.render("listings/index.ejs", { allListings });
});

//new route
router.get("/new",isLoggedIn, (req, res) => {
  
  res.render("listings/new.ejs");
});

//show route
router.get(
  "/:id",
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    console.log(id);
    const listing = await Listing.findById(id).populate("reviews");
    if (!listing) {
      req.flash("error", "Listing does not exist.");
      return res.redirect("/listings");
    }
    res.render("listings/show.ejs", { listing });
  })
);

//post route
router.post(
  "/",isLoggedIn,
  validateListing,
  wrapAsync(async (req, res) => {
    const { title, image, description, price, location, country } =
      req.body.listing;

    const newListing = new Listing({
      title,
      image,
      description,
      price,
      location,
      country,
    });

    await newListing.save();
    req.flash("success", "New Listing Created!");
    res.redirect("/listings");
  })
);

//edit route
router.get(
  "/:id/edit",isLoggedIn,
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    console.log(id);
    const listing = await Listing.findById(id);
    console.log(listing);

    res.render("listings/edit.ejs", { listing });
  })
);

//update route
router.put(
  "/:id",
  validateListing,isLoggedIn,
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, req.body.listing, {
      runValidators: true,
    });
    req.flash("success", " Listing Updated!");
    res.redirect(`/listings/${id}`);
  })
);

//delete route
router.delete(
  "/:id",isLoggedIn,
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    req.flash("success", " Listing Deleted!");
    res.redirect("/listings");
  })
);
module.exports = router;
