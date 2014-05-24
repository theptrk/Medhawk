var mongoose = require('mongoose');

var drugSchema = new mongoose.Schema({
  name:           {type: String},
  company:        {type: String},
  effects: {type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Effect'}]}
});

var DrugModel = new mongoose.Model('Drug', drugSchema);

module.exports.Drug = DrugModel;