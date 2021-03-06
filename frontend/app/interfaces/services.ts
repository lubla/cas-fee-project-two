/**
 * Created by Luzius on 13.08.2015.
 */
module Home.Interfaces {
    "use strict";
    export interface  IRepository {

        /**
         * Creates a new doodle.
         *
         * @param userId The id of the user that creates to doodle (An anonymous doodle is created if not specified).
         *
         * @returns {Home.Interfaces.IDoodle}
         */
        createNewDoodle(userId: string):Home.Interfaces.IDoodle;

        /**
         * Adds a new doodle to the doodle database.
         *
         * @param doodle
         * @returns {IPromise<Home.Interfaces.IDoodle>} A promise with the added doodle as result.
         */
        postDoodle(doodle:Home.Interfaces.IDoodle):ng.IPromise<Home.Interfaces.IDoodle>;

        /**
         * Gets a doodle from the doodle database.
         *
         * @param doodleId Id of the doodle.
         * @returns {IPromise<Home.Interfaces.IDoodle>} A promise with the retrieved doodle as result.
         */
        getDoodle(doodleId:string):ng.IPromise<Home.Interfaces.IDoodle>;

        /**
         * Gets a doodle from the doodle database to register for the doodle.
         *
         * @param registerId The register Id of the doodle.
         * @returns {IPromise<Home.Interfaces.IDoodle>} A promise with the retrieved doodle as result.
         */
        getDoodleRegister(registerId:string):ng.IPromise<Home.Interfaces.IDoodle>;


        /**
         * Updates an existing doodle.
         *
         * @param doodle The doodle to update.
         * @returns {IPromise<Home.Interfaces.IDoodle>} A promise with the updated doodle as result.
         */
        putDoodle(doodle:Home.Interfaces.IDoodle):ng.IPromise<Home.Interfaces.IDoodle>;

        /**
         * Gets all doodles for a user
         *
         * @param userId The id of the user.
         * @returns {ng.IPromise<Array<Home.Interfaces.IDoodle>>} A promise with the doodles of the user as result.
         */
        getDoodlesForUser(userId:string):ng.IPromise<Array<Home.Interfaces.IDoodle>>;

        /**
         * Deletes a doodle.
         *
         * @param doodleId The id of the doodle to delete.
         */
        deleteDoodle(doodleId:string):ng.IPromise<boolean>;

        /**
         * Gets the name of the repository.
         *
         * @returns {string} The name of the repository.
         */
        get():string;



    }

    /**
     * User management service.
     *
     * @interface IUserManagement
     */
    export interface IUserManagement {
        loggedInUser: Home.Interfaces.IUserProfile;
        login(user: Home.Interfaces.IUser, stayLoggedIn: boolean):ng.IPromise<Home.Interfaces.IUserProfile>;
        logout();
        getUserProfiles(user: Home.Interfaces.IUser):ng.IPromise<Array<Home.Interfaces.IUserProfile>>;
        registerUser(user: Home.Interfaces.IUser):ng.IPromise<Home.Interfaces.IUserProfile>;

    }    
}