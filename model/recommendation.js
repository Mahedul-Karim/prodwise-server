const { Schema, model } = require("mongoose");

const recommendationSchema = new Schema({
  recommendationTitle: {
    type: String,
  },
  recommendedProductName: {
    type: String,
  },
  recommendedProductImage: {
    type: String,
  },
  recommendationReason: {
    type: String,
  },
  queryId: {
    type: String,
  },
  queryTitle: {
    type: String,
  },
  productName: {
    type: String,
  },
  userEmail: {
    type: String,
  },
  userName: {
    type: String,
  },
  recommenderEmail: {
    type: String,
  },
  recommenderName: {
    type: String,
  },
  recommenderImage: {
    type: String,
  },
  currentTime: {
    type: Date,
    default: Date.now(),
  },
});

exports.Recommendation = model("Recommendation", recommendationSchema);