var controllers = require('./controllers');
var utils       = require('./routeUtils.js');
var secret      = require('./secret.js');

module.exports = function (app) {
  app.get("/drugs", utils.isApp, 
    controllers.getDrugs);

  app.get("/effects", utils.isApp, 
    controllers.getEffects);

  app.post("/effects/post", utils.isApp, 
    utils.validateRequest(["drugName", "effectName"]), 
    controllers.postEffectToDrug);

  app.get("/effects/fromDrug", utils.isApp, 
    utils.validateRequest(["drugName"]), 
    controllers.getEffectsFromDrug);

  app.post("/tweets/post", utils.isApp, 
    utils.validateRequest(["tweet", "link"]), 
    controllers.postTweet);
};
