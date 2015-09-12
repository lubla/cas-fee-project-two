/**
 * Created by Luzius on 16.08.2015.
 */

var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var Q = require('q');

var serverRepository = (function () {
    "use strict";

    var doodlesCollectionName = "doodles";
    var userProfilesCollectionName = "userProfiles";

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

        var cursor = this.mongoDb.collection(userProfilesCollectionName)
            .find({$and: [{'email': user.email}, {'passwordHash': user.passwordHash}]});

        return cursor.toArray();
    };

    Repository.prototype.registerUser = function registerUser(user) {
        var insertResult = this.mongoDb.collection(userProfilesCollectionName)
            .insert(user);

        var defer = Q.defer();

        insertResult
            .then(function (result) {
                // Check if one user has been added.
                if (result.result.n == 1) {
                    // Return the added user.
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
        var insertResult = this.mongoDb.collection(doodlesCollectionName)
            .insert(doodle);

        var defer = Q.defer();

        insertResult
            .then(function (result) {
                // Check if one doodle has been added.
                if (result.result.n == 1) {
                    // Return the added doodle.
                    defer.resolve(result.ops[0]);
                }
                else {
                    defer.reject(new Error("Cannot add doodle"));
                }
            });
        return defer.promise;
    };

    Repository.prototype.getDoodle = function getDoodle(id) {

        var cursor = this.mongoDb.collection(doodlesCollectionName)
            .find({ _id: id });

        var defer = Q.defer();

        cursor.nextObject(function(err, doodle) {
            if(err) {
                console.log("error");
                defer.reject(new Error("Cannot get doodle: " + err.toString()));
            }
            else {
                console.log("ok");
                defer.resolve(doodle);

            }
        });

        return defer.promise;
    };

    return {
        Repository: Repository
    }


}());

module.exports = serverRepository;