var controllers = require('../controllers');
var utils       = require('./routeUtils.js');

module.exports.route = function (app) {
  app.get("/drugs", utils.isApp,
    controllers.getDrugs);

  app.get("/effects", utils.isApp,
    controllers.getEffects);

  app.get("/tweets", utils.isApp,
    controllers.getTweets);

  app.post("/effects/postToDrug", utils.isApp,
    utils.validateRequest(["drugName", "effectName"]),
    controllers.postEffectToDrug);

  app.get("/effects/fromDrug", utils.isApp,
    utils.validateRequest(["drugName"]),
    controllers.getEffectsFromDrug);

  app.post("/drugs/post", utils.isApp,
    utils.validateRequest(["name", "company", "handle"]),
    controllers.postDrug);

  app.post("/effects/post", utils.isApp,
    utils.validateRequest(["name"]),
    controllers.postEffect);

  app.post("/tweets/post", utils.isApp,
    utils.validateRequest(["tweet", "link"]),
    controllers.postTweet);

};
