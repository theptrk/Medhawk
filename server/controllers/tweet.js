var Models = require('../models');
var Tweet  = Models.Tweet;
var Drug   = Models.Drug;

module.exports.postTweet = function (req, res) {
  var data = req.body;
 
  Drug.find({name: data.drugName}).exec().then(function (drug) {
    return Tweet.create({
      twitter_id: data.twitter_id,
      drug:       drug._id,
      effects:    data.selectedEffects,
      company:    drug.company
    }).save().exec();
  })
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