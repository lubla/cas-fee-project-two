/**
 * Created by Luzius on 13.08.2015.
 */
module Home.Interfaces {
    "use strict"

    export interface  IUser {
        email: string;
        password: string;
    }

    export interface  IUserProfile {
        id : string;
        email: string;
        password: string;
    }

}