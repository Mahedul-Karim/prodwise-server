const { initializeAdmin } = require("../config/firebase.config");
const { asyncWrapper } = require("../util/asyncWrapper");
const AppError = require("../util/error");

exports.verifyAuth = asyncWrapper(async (req, res, next) => {
  const token =
    req.cookies?.token || req.header("Authorization")?.split(" ")[1];

  console.log(req.cookies);

  if (!token) {
    return next(
      new AppError("No token has been found! Please login again", 401)
    );
  }

  const app = initializeAdmin();

  const decodedToken = await app.auth().verifyIdToken(token);

  const user = await app.auth().getUser(decodedToken.uid);

  const userObject = {
    email: user.email,
    name: user.displayName,
    image: user.photoURL,
  };

  req.user = userObject;

  next();
});
