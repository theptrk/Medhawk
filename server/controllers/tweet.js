var Models = require('../models');
var Tweet  = Models.Tweet;
var Drug   = Models.Drug;

module.exports.postTweet = function (req, res) {
  var data = req.body;
 
  Tweet.create({
      tweet: data.tweet,
      link: data.link
  }).save()
    .exec()
  .then(function (saveError) {
    if (saveError) {
      throw saveError;
    } else {
      res.send(201, "Saved Tweet.");
    }
  })
  .fail(function (err) {
    req.send(500, err);
  });
};