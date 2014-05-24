var mongoose = require('mongoose');

var tweetSchema = new mongoose.Schema({
  twitter_id: {type: Number},
  drug: {type: mongoose.Schema.Types.ObjectId}, // Drug ID
  effects: {type: [effect.Schema]},
  company: {type: String}
});

var TweetModel = mongoose.model(tweetSchema);

module.exports.Tweet = TweetModel;