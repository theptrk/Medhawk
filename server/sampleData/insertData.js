var Models  = require('../models');
var db      = require('../mongoose');
var parser  = require('csv-parse');
var Stream  = require('stream');
var fs      = require('fs');
var Q       = require('q');
var _       = require('lodash');

var promiseMap = function (data, promiseCreator) {
  return Q.all(_.map(data, promiseCreator));
};

var first = true;

var toDatabase = new Stream();
toDatabase.write = function (row) {
  if (row[2] && row[2] !== "Drug (brand name)") {
    console.log("Saving drug named: %s", row[2]);
    Q(Models.Drug.create({
      name: row[2],
      company: "SampleCompany",
      handle: "SampleHandle"
    })).then(function () {
      return promiseMap(row[4].split(','), function (effectName) {
        return Models.Effect.findOneAndUpdate({name: effectName.trim()}, {}, {upsert: true, "new": false}).exec();
      });
    }).then(function (effects) {
      return Models.Drug.findOneAndUpdate(
        {name: row[2]},
        {$push: {effects: effect._id}}).exec();
    }).then(function () {
      console.log("Saved drug named: %s", row[2]);
    });
  }
  first = false;
  return true;
};
toDatabase.on('finish', console.log.bind(console, "Finished"));
toDatabase.end = console.log.bind(console, "Done");

fs.createReadStream(__dirname + '/sideeffects.csv')
  .pipe(parser({delimiter: ','}))
  .pipe(toDatabase);
