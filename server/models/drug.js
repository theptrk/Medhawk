var mongoose = require('mongoose');
var Effect   = require('./effect.js');

var drugSchema = new mongoose.Schema({
  name:           {type: String},
  company:        {type: String},
  commonSymptoms: {type: [mongoose.Schema.Types.ObjectId]}
});

var DrugModel = new mongoose.Model('Drug', drugSchema);

module.exports.Drug = DrugModel;