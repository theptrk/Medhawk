module.exports.robustQuery = function (model, defaults) {
  return function (req, res) {
    var data = req.body;
    model.find(
      data.matching || defaults.matching,
      data.fields   || defaults.fields,
      data.options  || defaults.options)
    .exec()
    .then(res.json.bind(res))
    .fail(function (err) {
      console.error(err.stack);
      res.send(500, "Internal Server Error.");
    }); 
  };
};

module.exports.internalServerError = function (res) {
  return function (err) {
    console.error(err.stack);
    res.send(500, "Internal Server Error.");
  };
};