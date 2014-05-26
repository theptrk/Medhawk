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
          effects: [effect._id]
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
            expect(tweet); // Found the test tweet.
            tweet.remove();
          }).then(function () {
            done();
          });
      });
    });
  });
});

