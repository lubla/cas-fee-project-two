/**
 * Created by Luzius on 13.08.2015.
 */
module Home.Interfaces {
    "use strict"

    export interface  IRepository {
        name: string;
        getUserProfiles():Array<Home.Interfaces.IUserProfile>;
    }


}