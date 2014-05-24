var controllers = require('/controllers');
var utils       = require('./routesUtlis.js');
var secret      = require('./secret.js');

var isRecognized = function (appKey) {
  return secret.RECOGNIZED.indexOf(appKey) !== -1;
};

var isApp = function (req, res, next) {
  if (isRecognized(req.body.appKey)) {
    next();
  } else {
    res.send(400, "Bad Request.");
  }
};

module.exports = function (app) {
  app.get("/drugs", isApp, controllers.getDrugs);
  app.get("/effects", isApp, utils.validateRequest(["drugName", "company"]), controllers.getEffects);
  app.post("/tweet", isApp, utils.validateRequest(["tweet", "link"]), controllers.postTweet);
};
