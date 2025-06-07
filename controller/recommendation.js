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
