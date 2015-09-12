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
         * @returns {IPromise<Home.Interfaces.IDoodle>}
         */
        postDoodle(doodle:Home.Interfaces.IDoodle):ng.IPromise<Home.Interfaces.IDoodle>;

    }


}