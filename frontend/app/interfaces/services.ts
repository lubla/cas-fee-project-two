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
    }


}