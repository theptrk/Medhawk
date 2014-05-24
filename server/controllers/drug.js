var Drug = require('../models').Drug;

module.exports.getDrugs = function (req, res) {
  var data = req.body;
  Drug.find(data.matching, data.fields, data.options)
    .exec()
    .then(function (data) {
      res.json(data);
    })
    .fail(function (err) {
      res.send(500, "Internal Server Error.");
    });
};