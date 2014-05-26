var Q = require('q');

module.exports.robustQuery = function (model, defaults) {
  return function (req, res) {
    Q(model.find(
      req.body.matching || defaults.matching,
      req.body.fields   || defaults.fields,
      req.body.options  || defaults.options).exec())
    .then(res.json.bind(res))
    .fail(module.exports.internalServerError(res));
  };
};

module.exports.internalServerError = function (res) {
  return function (err) {
    console.error(err);
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