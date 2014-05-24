var controllers = require('./controllers');
var utils       = require('./routeUtils.js');
var secret      = require('./secret.js');

var isRecognized = function (appKey) {
  return secret.RECOGNIZED.indexOf(appKey) !== -1;
};

var isApp = function (req, res, next) {
  if (isRecognized(req.body.appKey)) {
    next();
  } else {
    res.send(401, "Unauthorized.");
  }
};

module.exports = function (app) {
  app.get("/drugs", isApp, controllers.getDrugs);

  app.get("/effects", isApp, utils.validateRequest(["effectName"]), controllers.getEffects);
  app.get("/effects/postEffectToDrug", isApp, utils.validateRequest(["drugName", "effectName"]), controllers.postEffectToDrug);
  app.get("/effects/getEffectsFromDrug", isApp, utils.validateRequest(["drugName"]), controllers.getEffectsFromDrug);

  app.post("/tweet", isApp, utils.validateRequest(["tweet", "link"]), controllers.postTweet);
};
