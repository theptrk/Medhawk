var Models          = require('../models');
var Drug            = Models.Drug;
var Effect          = Models.Effect;
var controllerUtils = require('./controllerUtils.js');
var Q               = require('q');

module.exports.getEffectsFromDrug = function (req, res) {
  Q(Drug.findOne({name: req.body.drugName || req.query.drugName})
    .exec())
    .then(function (drug) {
      return Models.Effect.find({
        '_id': { $in: drug.effects }
      }).exec();
    })
    .then(res.json.bind(res))
    .fail(controllerUtils.internalServerError(res));
};

module.exports.postEffectToDrug = function (req, res) {
  var data = req.body;

  Q.all([
    Effect.findOne({name: data.effectName}).exec(), 
    Drug.findOne({name: data.drugName}).exec()
  ]).spread(function (effect, drug) {
      return Drug.findOneAndUpdate(
        {name: data.drugName}, 
        {$push: {effects: effect._id}}).exec();
    })
    .then(controllerUtils.saveHandler(res))
    .fail(controllerUtils.internalServerError(res));
};