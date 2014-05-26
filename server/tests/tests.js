/* jshint -W024 */
/* jshint expr:true */

var expect  = require('chai').expect;
var app     = require('../server.js');
var db      = require('../mongoose'); 
var Q       = require('q');
var Models  = require('../models');
var utils   = require('./testUtil.js');
var request = require('request');

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
      request(reqUrl + '/drugs', {form: {appKey: "TestKey"}}, function (error, response, body) {
        expect(!!error).to.be.false;
        expect(response.statusCode).to.equal(200);
        done();
      });
    });

    xit('should return the right drugs', function (done) {

    });

    xit('should support robust queries', function (done) {
    });
  });

  describe('/effects', function() {
    it('should return 200 on a get request', function (done) {
      request(reqUrl + '/effects', {form: {appKey: "TestKey"}}, function (error, response, body) {
        expect(!!error).to.be.false;
        expect(response.statusCode).to.equal(200);
        done();
      });
    });

    xit('should return the right effects', function (done) {
    });

    xit('should support robust queries', function (done) {
    });
  });

  describe('/tweet', function () {
    xit('should return 201 on a post request', function (done) {
    });

    xit('should post a new tweet to the database', function (done) {
    });
  });
});

