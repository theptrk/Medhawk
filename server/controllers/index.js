var DrugController   = require('./drug.js');
var TweetController  = require('./tweet.js');
var EffectController = require('./effect.js');

module.exports = {
  getDrugs: DrugController.getDrugs,
  postTweet: TweetController.postTweet,
  getEffects: EffectController.getEffects,
};
