// Destructing the Schema and model
const { Schema, model, default: mongoose } = require("mongoose");

// Create Listing Schema
const ListingSchema = new Schema({
  title: { type: String, required: true },
  address: { type: [String], required: true },
  Description: { type: String },

  Cost: { type: String, required: true, unique: true },
  photos: { type: [String], required: true },
  broker: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

// Create Listing Model
const ListingModel = model("Listing", ListingSchema);

module.exports = ListingModel;
