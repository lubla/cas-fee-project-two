/**
 * Created by Luzius on 13.08.2015.
 */
module Home.Interfaces {
    "use strict"

    export interface  IRepository {
        name: string;
        loggedInUser: Home.Interfaces.IUserProfile;
        login(user: Home.Interfaces.IUser):ng.IPromise<Home.Interfaces.IUserProfile>;
        getUserProfiles(user: Home.Interfaces.IUser):ng.IPromise<Array<Home.Interfaces.IUserProfile>>;

        registerUser(user: Home.Interfaces.IUser):ng.IPromise<Home.Interfaces.IUserProfile>;

        /**
         * Creates a new doodle.
         *
         * @returns {IPromise<Home.Interfaces.IDoodle>}
         */
        createNewDoodle():ng.IPromise<Home.Interfaces.IDoodle>;


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
         * @param id Id of the doodle
         * @returns {IPromise<Home.Interfaces.IDoodle>} A promise with the retrieved doodle as result.
         */
        getDoodle(id:string):ng.IPromise<Home.Interfaces.IDoodle>;

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
         * @param userId
         * @returns {ng.IPromise<Array<Home.Interfaces.IDoodle>>} A promise with the doodles of the user as result.
         */
        getDoodlesForUser(userId:string):ng.IPromise<Array<Home.Interfaces.IDoodle>>;
    }


}