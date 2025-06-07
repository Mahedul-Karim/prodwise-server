const { Schema, model } = require("mongoose");

const querySchema = new Schema({
  productName: {
    type: String,
  },
  productBrand: {
    type: String,
  },
  productImage: {
    type: String,
  },
  queryTitle: {
    type: String,
  },
  boycottingReason: {
    type: String,
  },
  creatorEmail: {
    type: String,
  },
  creatorName: {
    type: String,
  },
  creatorImage: {
    type: String,
  },
  currentDate: {
    type: Date,
    default: Date.now(),
  },
  recommendationCount: {
    type: Number,
    default: 0,
  },
});

exports.Query = model("Query", querySchema);
