var mongoose = require('mongoose');

module.exports.Tweet = mongoose.model('Tweet', new mongoose.Schema({
  tweet: {type: String},
  link: {type: String}
}));
