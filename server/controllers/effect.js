var Drug = require('../models').Drug;

module.exports.getEffects = function (req, res) {
  var data = req.body;

  Drug.find({name: data.drugName, company: data.company})
    .exec()
    .then(function (drug) {
      return drug.populate('effects');
    })
    .then(function (effects) {
      res.json(effects);
    })
    .fail(function (err) {
      res.send(500, err);
    });
};