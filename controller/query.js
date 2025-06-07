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
    message: "Query created successfully",
  });
});

exports.getRecentQuery = asyncWrapper(async (req, res, next) => {
  const queries = await Query.find().limit(6).sort({ currentDate: -1 });

  res.status(200).json({
    success: true,
    queries,
  });
});

exports.getAllQueries = asyncWrapper(async (req, res, next) => {
  const { search } = req.query;

  const filter = {};

  if (search) {
    filter.productName = {
      $regex: search,
      $options: "i",
    };
  }

  const queries = await Query.find(filter).sort({ currentDate: -1 });

  res.status(200).json({
    success: true,
    queries,
  });
});
