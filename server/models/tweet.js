var mongoose = require('mongoose');

var tweetSchema = new mongoose.Schema({
  tweet: {type: String},
  link: {type: String}
});

var TweetModel = mongoose.model('Tweet', tweetSchema);

module.exports.Tweet = TweetModel;