/**
 * Created by Luzius on 16.08.2015.
 */

var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var Q = require('q');

var serverRepository = (function () {
    "use strict";

    function Repository(connectedCallback) {
        var mongodbUrl = 'mongodb://localhost:27017/test';
        var self = this;
        var c = MongoClient.connect(mongodbUrl, function (err, mongoDb) {
            assert.equal(null, err);
            self.mongoDb = mongoDb;
            connectedCallback(self);
            console.log("Connected to server " + mongodbUrl);
        });
    }

    Repository.prototype.constructor = Repository;


    Repository.prototype.getUserProfiles = function getUserProfiles(user) {

        var cursor = this.mongoDb.collection('userProfiles')
            .find({$and: [{'email': user.email}, {'passwordHash': user.passwordHash}]});

        return cursor.toArray();
    };

    Repository.prototype.registerUser = function registerUser(user) {
        var insertResult = this.mongoDb.collection('userProfiles')
            .insert(user);

        var defer = Q.defer();

        insertResult
            .then(function (result) {
                if (result.result.n == 1) {
                    defer.resolve(result.ops[0]);
                }
                else {
                    console.log('reject');
                    defer.reject(new Error("Cannot register user"));
                }
            });
        return defer.promise;
    };

    Repository.prototype.addDoodle = function addDoodle(doodle) {
        var insertResult = this.mongoDb.collection('doodles')
            .insert(doodle);

        var defer = Q.defer();

        insertResult
            .then(function (result) {
                if (result.result.n == 1) {
                    defer.resolve(result.ops[0]);
                }
                else {
                    console.log('reject');
                    defer.reject(new Error("Cannot add doodle"));
                }
            });
        return defer.promise;
    };

    return {
        Repository: Repository
    }


}());

module.exports = serverRepository;