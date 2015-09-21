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


        Repository.prototype.getUserProfiles = function (email, passwordHash) {

            var cursor = this.mongoDb.collection(userProfilesCollectionName)
                .find({$and: [{'email': email}, {'passwordHash': passwordHash}]});

            return cursor.toArray();
        };

        Repository.prototype.registerUser = function (user) {
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
                })
                .catch(function (err) {
                    defer.reject(err);
                });

            return defer.promise;
        };

        Repository.prototype.addDoodle = function (doodle) {
            var insertResult = this.mongoDb.collection(doodlesCollectionName)
                .insert(doodle);

            var self = this;

            var defer = Q.defer();

            insertResult
                .then(function (result) {
                    // Check if one doodle has been added.
                    if (result.result.n == 1) {
                        // Return the added doodle.
                        console.log("resolved");
                        self.putDoodle(doodle);

                        defer.resolve(result.ops[0]);
                    }
                    else {
                        console.log("rejected");
                        defer.reject(new Error("Cannot add doodle"));
                    }
                })
                .catch(function (err) {
                    defer.reject(err);
                });

            return defer.promise;

        };


        Repository.prototype.putDoodle = function (doodle) {
            var writeResult = this.mongoDb.collection(doodlesCollectionName)
                .update({_id: doodle._id}, doodle);

            var defer = Q.defer();

            writeResult
                .then(function (result) {
                    // Check if one doodle has been modified.
                    if (result.result.n == 1) {
                        // Return the modified doodle.
                        defer.resolve(doodle);
                    }
                    else {
                        console.log("rejected");
                        defer.reject(new Error("Cannot add doodle"));
                    }
                })
                .catch(function (err) {
                    defer.reject(err);
                });

            return defer.promise;

        };

        Repository.prototype.getDoodle = function getDoodle(doodleId) {

            var cursor = this.mongoDb.collection(doodlesCollectionName)
                .find({_id: doodleId});

            var defer = Q.defer();

            cursor.nextObject(function (err, doodle) {
                if (err) {
                    defer.reject(new Error("Cannot get doodle: " + err.toString()));
                }
                else {
                    if(doodle) {
                        defer.resolve(doodle);
                    }
                    else {
                        defer.reject(new Error("Cannot get doodle for id: " + doodleId));
                    }

                }
            });

            return defer.promise;
        };

        Repository.prototype.getDoodleRegister = function getDoodleRegister(registerId) {

            var cursor = this.mongoDb.collection(doodlesCollectionName)
                .find({registerId: registerId});

            var defer = Q.defer();

            cursor.nextObject(function (err, doodle) {
                if (err) {
                    defer.reject(new Error("Cannot get doodle: " + err.toString()));
                }
                else {
                    if(doodle) {
                        defer.resolve(doodle);
                    }
                    else {
                        defer.reject(new Error("Cannot get doodle for register id: " + doodleId));
                    }
                }
            });

            return defer.promise;
        };

        Repository.prototype.deleteDoodle = function getDoodle(doodleId) {

            var removeResult = this.mongoDb.collection(doodlesCollectionName)
                .remove({_id: doodleId});

            var defer = Q.defer();

            removeResult
                .then(function(result) {
                    defer.resolve("Removed");
                })
                .catch(function (err) {
                    defer.reject(err);
                });

            return defer.promise;
        };

        Repository.prototype.getDoodlesForUser = function (userId) {

            var cursor = this.mongoDb.collection(doodlesCollectionName)
                .find({"userId": userId});

            return cursor.toArray();
        };

        return {
            Repository: Repository
        }




    }()
);

module.exports = serverRepository;