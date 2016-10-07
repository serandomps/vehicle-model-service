var utils = require('utils');
var serand = require('serand');

var models = {};

exports.findOne = function (id, done) {
    $.ajax({
        method: 'GET',
        url: utils.resolve('autos://apis/v/vehicle-models/' + id),
        dataType: 'json',
        success: function (make) {
            done(null, make);
        },
        error: function () {
            done(new Error('error retrieving vehicle-models ' + id));
        }
    });
};

exports.find = function (make, done) {
    if (!make) {
        return done(null, []);
    }
    if (models[make]) {
        return done(null, models[make]);
    }
    var data = JSON.stringify({
        criteria: {
            make: make
        }
    });
    $.ajax({
        method: 'GET',
        url: utils.resolve('autos://apis/v/vehicle-models'),
        dataType: 'json',
        data: {
            data: data
        },
        success: function (data) {
            models[make] = data;
            done(null, data);
        },
        error: function () {
            done(new Error('error retrieving vehicle-models'));
        }
    });
};
