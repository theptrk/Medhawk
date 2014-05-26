var DrugController   = require('./drug.js');
var TweetController  = require('./tweet.js');
var EffectController = require('./effect.js');

module.exports = {
  getDrugs: DrugController.getDrugs,
  getEffects: EffectController.getEffects,

  postEffectToDrug: EffectController.postEffectToDrug,
  getEffectsFromDrug: EffectController.getEffectsFromDrug,

  postTweet: TweetController.postTweet
};
