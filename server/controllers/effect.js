var Models          = require('../models');
var Drug            = Models.Drug;
var Effect          = Models.Effect;
var controllerUtils = require('./controllerUtils.js');
var Q               = require('q');

module.exports.getEffects = controllerUtils.robustQuery(Effect, {
  matching: {},
  fields: "name",
  options: {}
});

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

  Q.all([Effect.findOne({name: effectName}).exec(), Drug.findOne({name: data.drugName})])
    .spread(function (effect, drug) {
      drug.effects.push(effect._id);
      return drug.save().exec();
    }).then(function (saveError) {
      if (saveError) {
        throw saveError;
      } else {
        res.send(201, "Posted Data.");
      }
    }).fail(controllerUtils.internalServerError(res));
};

module.exports.postNewEffect = function (req, res) {
  var data = req.body;

  Q(Effect.create({name: req.name})).then(function (saveError) {
    if (saveError) {
      throw saveError;
    } else {
      res.send(201, "Posted Data.");
    }
  });
};