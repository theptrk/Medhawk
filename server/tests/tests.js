/* jshint -W024 */
/* jshint expr:true */

var expect  = require('chai').expect;
var app     = require('../server.js');
var db      = require('../mongoose');
var Q       = require('q');
var Models  = require('../models');
var utils   = require('./testUtil.js');
var request = require('request');
var _       = require('lodash');

var reqPort = 3000;
var reqUrl = 'http://localhost:' + reqPort;

describe('Server', function () {
  before(function (done) {
    Q(Models.Effect.create({
      name: 'TestEffect'
    }))
    .then(function (effect) {
      return Models.Drug.create({
          name: 'Test',
          company: 'Test',
          effects: [effect._id],
          handle: 'TestHandle'
      });
    }).then(function () {
      done();
    }).fail(console.error.bind(console));
  });

  after(function (done) {
    Q(Models.Drug.findOne({name: 'Test'}).exec()
    .then(function (drug) {
      return drug.remove();
    })).then(function () {
      return Models.Effect.findOne({name: 'TestEffect'}).exec();
    }).then(function (effect) {
      return effect.remove();
    }).then(function () {
      done();
    });
  });

  describe('/drugs', function() {
    it('should return 200 on a get request', function (done) {
      request.get(reqUrl + '/drugs', {form: {appKey: "TestKey"}}, function (error, response, body) {
        expect(!!error).to.be.false;
        expect(response.statusCode).to.equal(200);
        done();
      });
    });

    it('should return the right drugs', function (done) {
      request.get(reqUrl + '/drugs', {form: {appKey: "TestKey"}}, function (error, response, body) {
        expect(!!error).to.be.false;
        expect(_.pluck(JSON.parse(body), 'name')).to.include("Test");
        done();
      });
    });

    it('should support robust queries', function (done) {
      request.get(reqUrl + '/drugs', {form:
        {appKey: "TestKey", matching: {company: "Test"}}
      }, function (error, response, body) {
        expect(!!error).to.be.false;
        expect(JSON.parse(body)[0].name).to.equal("Test");
        done();
      });
    });

    describe('/drugs/post', function () {
      it('should return 201 and post to the database on a post request.', function (done) {
        request.post(reqUrl + '/drugs/post', {form:
          {appKey: "TestKey", name: "testpost", company: "testpost", handle: "testpost"}
        }, function (error, response, body) {
          expect(!!error).to.be.false;
          expect(response.statusCode).to.equal(201);

          Models.Drug.findOne({name: "testpost"}).exec()
            .then(function (drug) {
              expect(drug);
              drug.remove();
            }).then(function () {
              done();
            });
        });
      });
    });
  });

  describe('/effects', function() {
    it('should return 200 on a get request', function (done) {
      request.get(reqUrl + '/effects', {form: {appKey: "TestKey"}}, function (error, response, body) {
        expect(!!error).to.be.false;
        expect(response.statusCode).to.equal(200);
        done();
      });
    });

    it('should return the right effects', function (done) {
      request.get(reqUrl + '/effects', {form: {appKey: "TestKey"}}, function (error, response, body) {
        expect(!!error).to.be.false;
        expect(_.pluck(JSON.parse(body), 'name')).to.include("TestEffect");
        done();
      });
    });

    it('should support robust queries', function (done) {
      request.get(reqUrl + '/effects', {form:
        {appKey: "TestKey", matching: {name: "TestEffect"}}
      }, function (error, response, body) {
        expect(!!error).to.be.false;
        expect(JSON.parse(body)[0].name).to.equal("TestEffect");
        done();
      });
    });

    it('should get all the effects from a drug', function (done) {
      request.get(reqUrl + '/effects/fromDrug', {form:
        {appKey: "TestKey", drugName: "Test"}
      }, function (error, response, body) {
        expect(!!error).to.be.false;
        expect(response.statusCode).to.equal(200);
        expect(_.pluck(JSON.parse(body), 'name')).to.include("TestEffect");
        done();
      });
    });

    describe('/effects/post', function () {
      it('should return 201 and post to the database on a post request.', function (done) {
        request.post(reqUrl + '/effects/post', {form:
          {appKey: "TestKey", name: "testpost"}
        }, function (error, response, body) {
          expect(!!error).to.be.false;
          expect(response.statusCode).to.equal(201);

          Models.Effect.findOne({name: "testpost"}).exec()
            .then(function (effect) {
              expect(effect);
              effect.remove();
            }).then(function () {
              done();
            });
        });
      });

      it('should post to a drug at /postToDrug', function (done) {
        request.post(reqUrl + '/effects/post', {form:
          {appKey: "TestKey", name: "DrugTest"}
        }, function (error, response, body) {
          expect(!!error).to.be.false;
          expect(response.statusCode).to.equal(201);

          request.post(reqUrl + '/effects/postToDrug', {form:
            {appKey: "TestKey", drugName: "Test", effectName: "DrugTest"}
          }, function (error, response, body) {
            Models.Drug.findOne({name: "Test"}).exec()
              .then(function (drug) {
                return Models.Effect.find({
                  '_id': { $in: drug.effects }
                }).exec();
              }).then(function (effects) {
                expect(_.pluck(effects, "name")).to.include("DrugTest");
              }).then(function () {
                return Models.Effect.findOne({name: "DrugTest"}).exec();
              }).then(function (effect) {
                return effect.remove();
              }).then(function () {
                done();
              });
          });
        });
      });
    });
  });

  describe('/tweets', function () {
    it('should return 201 on a post request and post a tweet to the database', function (done) {
      request.post(reqUrl + '/tweets/post', {form:
        {appKey: "TestKey", link: "testlink", tweet: "testtweet"}
      }, function (error, response, body) {
        expect(!!error).to.be.false;
        expect(response.statusCode).to.equal(201);

        Models.Tweet.findOne({link: "testlink"}).exec()
          .then(function (tweet) {
            expect(tweet);
            tweet.remove();
          }).then(function () {
            done();
          });
      });
    });
  });

  describe('/emojis', function () {
    it('should return 200 on a get request', function (done) {
      request.get(reqUrl + '/emojis/angry.png', function (error, response, body) {
        expect(!!error).to.be.false;
        expect(response.statusCode).to.equal(200);

        done();
      });
    });

    it('should return image data', function (done) {
      request.get(reqUrl + '/emojis/angry.png', function (error, response, body) {
        expect(!!error).to.be.false;
        expect(response.statusCode).to.equal(200);

        expect(body).to.exist;

        done();
      });
    });
  })
});

