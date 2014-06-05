var mongoose = require('mongoose');

module.exports.Drug = mongoose.model('Drug', new mongoose.Schema({
  name:           {type: String},
  company:        {type: String},
  handle:         {type: String},
  effects: {type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Effect'}]}
}));
