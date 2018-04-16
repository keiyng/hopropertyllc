const mongoose = require('mongoose');
const { Schema } = mongoose;

const propertySchema = new Schema({
  label: String,
  address: String,
  county: String,
  township_borough: String,
  bedroom: String,
  bathroom: String,
  square_feet: String,
  type: String,
  parking: String,
  laundry: String,
  rent: String,
  images: [String],
  available: Boolean,
});

mongoose.model('properties', propertySchema);
