const { Query } = require("../model/query");
const { asyncWrapper } = require("../util/asyncWrapper");
const AppError = require("../util/error");

exports.createQuery = asyncWrapper(async (req, res, next) => {
  const { email, name, image } = req.user;

  const {
    productName,
    productBrand,
    productImage,
    queryTitle,
    boycottingReason,
  } = req.body;

  const query = await Query.create({
    productName,
    productBrand,
    productImage,
    queryTitle,
    boycottingReason,
    creatorEmail: email,
    creatorName: name,
    creatorImage: image,
  });

  res.status(201).json({
    success: true,
    query,
  });
});
