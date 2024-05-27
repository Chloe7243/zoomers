module.exports = (res, errorMsg = "Something went wrong", code = 400) =>
  res.status(code).json({
    success: false,
    message: errorMsg,
  });
