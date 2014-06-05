var mongoose = require('mongoose');

module.exports.Effect = mongoose.model('Effect', new mongoose.Schema({
  name: {type: String},
}));
