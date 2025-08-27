const mongoose = require("mongoose");
const listingSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  image: {
    type: String,
    default:
      "https://images.3D.com/photo-1725138187136-790dc99ed924?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8ZnJlZSUyMHBob3RvJTIwY290dGFnZXN8ZW58MHx8MHx8fDA%3D ",
    set: (v) =>
      v === ""
        ? "https://images.3D.com/premium_photo-1687960116497-0dc41e1808a2?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%https%3D"
        : v,
  },

  price: {
    type: Number,
  },
  location: {
    type: String,
  },
  country: {
    type: String,
  },
});
const Listing = new mongoose.model("Listing", listingSchema);
module.exports = Listing;
