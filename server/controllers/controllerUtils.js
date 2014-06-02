var mControllers = require('mongoose-controllers');

module.exports.robustQuery = mControllers.get;
module.exports.robustPost = mControllers.post;

module.exports.internalServerError = function (res) {
  return function (err) {
    console.error(err.stack);
    res.send(500, "Internal Server Error.");
  };
};

module.exports.saveHandler = function (res) {
  return function (saved) {
    if (!saved) {
      throw new Error("Failed to save.");
    } else {
      res.send("201", "Posted Data.");
    }
  };
};