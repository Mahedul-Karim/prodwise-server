const { Query } = require("../model/query");
const { Recommendation } = require("../model/recommendation");
const { asyncWrapper } = require("../util/asyncWrapper");
const AppError = require("../util/error");

exports.createRecommendation = asyncWrapper(async (req, res, next) => {
  const { email, name, image } = req.user;

  const {
    recommendationTitle,
    recommendedProductName,
    recommendedProductImage,
    recommendationReason,
    queryId,
    queryTitle,
    productName,
    userEmail,
    userName,
  } = req.body;

  const recommendation = await Recommendation.create({
    recommendationTitle,
    recommendedProductName,
    recommendedProductImage,
    recommendationReason,
    queryId,
    queryTitle,
    productName,
    userEmail,
    userName,
    recommenderEmail: email,
    recommenderName: name,
    recommenderImage: image,
  });

  const query = await Query.findByIdAndUpdate(
    queryId,
    {
      $inc: {
        recommendationCount: 1,
      },
    },
    {
      new: true,
    }
  );

  res.status(201).json({
    success: true,
    message: "Your recommendation have been posted",
    recommendation,
    query,
  });
});

exports.recommendationsForUser = asyncWrapper(async (req, res) => {
  const { email } = req.user;

  const recommendations = await Recommendation.find({ userEmail: email }).sort({
    currentTime: -1,
  });

  res.status(200).json({
    success: true,
    recommendations,
  });
});

exports.recommendationsForMe = asyncWrapper(async (req, res) => {
  const { email } = req.user;

  const recommendations = await Recommendation.find({
    recommenderEmail: email,
  }).sort({ currentTime: -1 });

  res.status(200).json({
    success: true,
    recommendations,
  });
});

exports.deleteRecommendation = asyncWrapper(async (req, res) => {
  const { recomId } = req.params;

  const recommendation = await Recommendation.findByIdAndDelete(recomId);

  await Query.findByIdAndUpdate(recommendation.queryId, {
    $inc: {
      recommendationCount: -1,
    },
  });

  res.status(200).json({
    success: true,
    message: "Recommendation was deleted successfully",
  });
});
