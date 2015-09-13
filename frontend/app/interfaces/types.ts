/**
 * Created by Luzius on 13.08.2015.
 */
module Home.Interfaces {
    "use strict";

    /**
     * Stores user data of the login view.
     *
     * @interface IUser
     */
    export interface  IUser {
        email: string;
        password: string;
    }

    /**
     * Stores user data for the registration view.
     *
     * @interface IUserRegister
     */
    export interface  IUserRegister {
        email: string;
        passwordHash: string;
    }

    /**
     * Stores user data of an registered user.
     *
     * @interface IUserProfile
     */
    export interface  IUserProfile {
        _id: string;
        email: string;
        passwordHash: string;
    }

    /**
     * Stores the data of a Doodle date proposal.
     *
     * @interface IDateProposal
     */
    export interface IDateProposal {
        _id: string;

        /**
         * The start date of the proposal.
         */
        start: Date;

        /**
         * The end date of the proposal.
         */
        end: Date;

        /**
         * The list of the names of the people that have accepted the proposal.
         */
        acceptedBy: Array<string>;
    }

    /**
     * Stores the data of a Doodle.
     *
     * @interface IDoodle
     */
    export interface IDoodle {
        _id: string;

        /**
         * The id of the user that has created the Doodle.
         */
        userId: string;

        /**
         * The title of the Doodle.
         */
        title: string;

        /**
         * The place of the Doodle.
         */
        place: string;

        /**
         * The date proposals of the Doodle.
         */
        dateProposals: Array<IDateProposal>;

        /**
         * Indicates if the Doodle is expired.
         */
        isExpired: boolean;


        /**
         * Adds a new date proposal.
         *
         * @return The new data proposal.
         */
        addNewDateProposal(): IDateProposal;

        /**
         * Deletes a date proposal.
         *
         * @param id The id of the data proposal to delete.
         */
        deleteDateProposal(id: string): void;

    }
}