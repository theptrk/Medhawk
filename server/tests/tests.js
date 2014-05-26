/* jshint -W024 */
/* jshint expr:true */

var expect = require('chai').expect;
var app    = require('../server.js');
var db      = require('../mongoose'); 
var Q       = require('q');
var Models  = require('../models');
var utils   = require('./testUtil.js');
var request = require('request');

var reqPort = 3000;

describe('Server', function () {
  before(function (done) {
    Models.Effect.create({
      name: 'TestEffect'
    })
    .then(function (effect) {
      return Models.Drug.create({
          name: 'Test',
          company: 'Test',
          effects: [effect._id]
      });
    }).then(function () {
      done();
    }, console.error.bind(console));
  });

  after(function (done) {
    Models.Drug.findOne({name: 'Test'}).exec().then(function (drug) {
      return drug.remove().exec();
    }).then(function () {
      return Models.Effect.findOne({name: 'TestEffect'}).exec();
    }).then(function (effect) {
      return effect.remove().exec();
    }).then(function () {
      done();
    });
  });

  describe('/drugs', function() {
    it('should return 200 on a get request', function (done) {
    });

    it('should return an array of drugs', function (done) {
    });

    it('should support robust queries', function (done) {
    });
  });

  describe('/effects', function() {
    it('should return 200 on a get request', function (done) {
    });

    it('should return the right effects', function (done) {
    });
  });
});

