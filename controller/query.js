const { Query } = require("../model/query");
const { Recommendation } = require("../model/recommendation");
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

exports.userQuery = asyncWrapper(async (req, res, next) => {
  const { email } = req.user;

  const queries = await Query.find({ creatorEmail: email }).sort({
    currentDate: -1,
  });

  res.status(200).json({
    success: true,
    queries,
  });
});

exports.queryDetails = asyncWrapper(async (req, res, next) => {
  const { queryId } = req.params;

  const query = await Query.findById(queryId);

  if (!query) {
    return next(
      new AppError("No query has been found for the provided id", 404)
    );
  }

  const recommendations = await Recommendation.find({ queryId });

  res.status(200).json({
    success: true,
    query,
    recommendations,
  });
});

exports.updateQuery = asyncWrapper(async (req, res) => {
  const { queryId } = req.params;

  const data = req.body;

  await Query.findByIdAndUpdate(queryId, {
    ...data,
  });

  res.status(200).json({
    success: true,
    message: "Query updated successfully!",
  });
});

exports.deleteQuery = asyncWrapper(async (req, res) => {
  const { queryId } = req.params;

  await Query.findByIdAndDelete(queryId);

  await Recommendation.deleteMany({ queryId });

  res.status(200).json({
    success: true,
    message: "Query deleted successfully",
  });
});
