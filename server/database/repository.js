/**
 * Created by Luzius on 16.08.2015.
 */

/**
 * Mongo db is used to store the doodles and the user profiles.
 *
 * The doodles are stored as plain JSON copies of the client side doodles (i.e. the data of instances of a class that
 * implement the interface Home.Interfaces.IDoodle, see client side code). All doodles are stored in a single collection.
 *
 * Similar the user profiles are copies of the client side user profiles (Home.Interfaces.IUserProfile, see client side code) which
 * are stored in a single collection.
 */

var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var Q = require('q');

var serverRepository = (function () {
        "use strict";


        /**
         * Name of the  mongo db doodle collection.
         * @type {string}
         */
        var doodlesCollectionName = "doodles";

        /**
         * Name of the mongo db user profile collection.
         * @type {string}
         */
        var userProfilesCollectionName = "userProfiles";

        /**
         * Repository constructor which implements a
         * call interface to the doodle mongo db.
         * Promise based member functions are available to get/set/add/remove doodles and user profiles.
         *
         * @param connectedCallback   Called when connection to the mongo db is established with a reference to the
         *                            created Repository instance as argument.
         * @constructor
         */
        function Repository(connectedCallback) {
            var mongodbUrl = 'mongodb://localhost:27017/doodle';
            var self = this;
            MongoClient.connect(mongodbUrl, function (err, mongoDb) {
                assert.equal(null, err);
                self.mongoDb = mongoDb;
                connectedCallback(self);
                console.log("Connected to server " + mongodbUrl);
            });
        }

        Repository.prototype.constructor = Repository;

        /*
            User profile members
            =======================================================================================
         */


        /**
         * Get the user profile(s) for a given email and password hash.
         *
         * @param email        The email of the user.
         * @param passwordHash The password hash of the user.
         * @returns {Promise}  A promise with the user profiles as result.
         */
        Repository.prototype.getUserProfiles = function (email, passwordHash) {

            var cursor = this.mongoDb.collection(userProfilesCollectionName)
                .find({$and: [{'email': email}, {'passwordHash': passwordHash}]});

            return cursor.toArray();
        };

        /**
         * Get the user profiles(s) for a given email.
         *
         * @param email       The email of the user.
         * @returns {Promise} A promise with the user profiles as result.
         */
        Repository.prototype.getUserProfilesForEmail = function (email) {

            var cursor = this.mongoDb.collection(userProfilesCollectionName)
                .find({$and: [{'email': email}]});

            return cursor.toArray();
        };


        /**
         * Registers a user. An error is rejected if the user is already registered.
         *
         * @param userRegister   The user to register (see frontend interface Home.Interfaces.IUserRegister).
         * @returns {Promise}    A promise with the registered user profile as result.
         */
        Repository.prototype.registerUser = function (userRegister) {
            var defer = Q.defer();
            var self = this;

            this.getUserProfilesForEmail(userRegister.email)
                .then(function (userProfiles) {
                    if (userProfiles.length > 0) {
                        defer.reject(new Error("User already registered."));
                    }
                    else {
                        var insertResult = self.mongoDb.collection(userProfilesCollectionName)
                            .insert(userRegister); // Note: mongodb adds the _id field.
                        insertResult
                            .then(function (result) {
                                // Check if exactly one user has been added.
                                if (result.result.n == 1) {
                                    // Return the added user.
                                    defer.resolve(result.ops[0]);
                                }
                                else {
                                    defer.reject(new Error("Cannot register user"));
                                }
                            })
                            .catch(function (err) {
                                defer.reject(err);
                            });
                    }
                })
                .catch(function (err) {
                    defer.reject(err);
                });


            return defer.promise;
        };

        /*
         Doodle members
         =======================================================================================
         */

        /**
         * Adds a doodle.
         *
         * @param doodle       The doodle to add.
         * @returns {Promise}  A promise with the added doodle as result.
          */
        Repository.prototype.addDoodle = function (doodle) {
            var insertResult = this.mongoDb.collection(doodlesCollectionName)
                .insert(doodle);

            var self = this;

            var defer = Q.defer();

            insertResult
                .then(function (result) {
                    // Check if exactly one doodle has been added.
                    if (result.result.n == 1) {
                        // Return the added doodle.
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


        /**
         * Updates an existing doodle.
         *
         * @param doodle       The doodle to update.
         * @returns {Promise}  A promise with the updated doodle.
         */
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

        /**
         * Gets a doodle for a doodle id.
         *
         * @param doodleId     The doodle id.
         * @returns {Promise}  A promise with the doodle as result.
         */
        Repository.prototype.getDoodle = function getDoodle(doodleId) {

            var cursor = this.mongoDb.collection(doodlesCollectionName)
                .find({_id: doodleId});

            var defer = Q.defer();

            // Make an closure here to have the doodleId inside of the nextObject callback.
            (function (doodleId) {
                cursor.nextObject(function (err, doodle) {
                    if (err) {
                        defer.reject(new Error("Cannot get doodle: " + err.toString()));
                    }
                    else {
                        if (doodle) {
                            defer.resolve(doodle);
                        }
                        else {
                            defer.reject(new Error("Cannot get doodle for id: " + doodleId));
                        }

                    }
                });
            })(doodleId);

            return defer.promise;
        };

        /**
         * Gets a doodle for a doodle register id. The register id is used
         * when registering for a doodle.
         *
         * @param registerId  The register id of the doodle.
         * @returns {Promise} A promise with the doodle as result.
         */
        Repository.prototype.getDoodleRegister = function getDoodleRegister(registerId) {

            var cursor = this.mongoDb.collection(doodlesCollectionName)
                .find({registerId: registerId});

            var defer = Q.defer();

            // Make an closure here to have the registerId inside of the nextObject callback.
            (function (registerId) {

                cursor.nextObject(function (err, doodle) {
                    if (err) {
                        defer.reject(new Error("Cannot get doodle: " + err.toString()));
                    }
                    else {
                        if (doodle) {
                            defer.resolve(doodle);
                        }
                        else {
                            defer.reject(new Error("Cannot get doodle for register id: " + registerId));
                        }
                    }
                });
            })(registerId);

            return defer.promise;
        };

        /**
         * Removes a doodle.
         *
         * @param doodleId      The id of the doodle to remove.
         * @returns {Promise}   A promise with the text "Removed" as result.
         */
        Repository.prototype.deleteDoodle = function deleteDoodle(doodleId) {

            var removeResult = this.mongoDb.collection(doodlesCollectionName)
                .remove({_id: doodleId});

            var defer = Q.defer();

            removeResult
                .then(function (result) {
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