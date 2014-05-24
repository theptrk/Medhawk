var controllers = require('/controllers');

module.exports = function (app) {
  app.get("/drugs", controllers.getDrugs);
  app.get("/affects", controllers.getAffects);
  app.post("/tweet", controllers.postTweet);
};
