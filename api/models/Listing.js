// Destructing the Schema and model
const { Schema, model, default: mongoose } = require("mongoose");

// Create Listing Schema
const ListingSchema = new Schema({
  title: { type: String },
  address: { type: String },
  description: { type: String },

  cost: { type: String },
  photos: { type: [String] },
  broker: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

// Create Listing Model
const ListingModel = model("Listing", ListingSchema);

module.exports = ListingModel;
