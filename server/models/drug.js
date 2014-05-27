var mongoose = require('mongoose');

var drugSchema = new mongoose.Schema({
  name:           {type: String},
  company:        {type: String},
  handle:         {type: String},
  effects: {type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Effect'}]}
});

var DrugModel = mongoose.model('Drug', drugSchema);

module.exports.Drug = DrugModel;