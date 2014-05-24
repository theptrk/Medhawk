var mongoose = require('mongoose');

var effectSchema = new mongoose.Schema({
  name: {type: String},
});

var EffectModel = mongoose.model('Effect', effectSchema);

module.exports.Effect = EffectModel;
module.exports.Schema = effectSchema; 