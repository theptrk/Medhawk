var Models          = require('../models');
var Tweet           = Models.Tweet;
var Drug            = Models.Drug;
var controllerUtils = require('./controllerUtils.js');
var Q               = require('q');

module.exports.postTweet = function (req, res) {
  var data = req.body;
 
  Q(Tweet.create({
      tweet: data.tweet,
      link: data.link
  }).save().exec())
  .then(controllerUtils.saveHandler(res))
  .fail(controllerUtils.internalServerError(res));
};