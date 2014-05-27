var Models          = require('../models');
var Drug            = Models.Drug;
var Effect          = Models.Effect;
var controllerUtils = require('./controllerUtils.js');
var Q               = require('q');

module.exports.getEffectsFromDrug = function (req, res) {
  var data = req.body;

  Q(Drug.findOne({name: data.drugName})
    .exec())
    .then(function (drug) {
      return drug.populate('effects');
    })
    .then(res.json.bind(res))
    .fail(controllerUtils.internalServerError(res));
};

module.exports.postEffectToDrug = function (req, res) {
  var data = req.body;

  Q.all([Effect.findOne({name: effectName}).exec(), Drug.findOne({name: data.drugName}).exec()])
    .spread(function (effect, drug) {
      drug.effects.push(effect._id);
      return drug.save().exec();
    })
    .then(controllerUtils.saveHandler(res))
    .fail(controllerUtils.internalServerError(res));
};