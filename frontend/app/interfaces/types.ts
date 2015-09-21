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

        /**
         * The id of the doodle.
         */
        _id: string;

        /**
         * The id of the user that has created the Doodle.
         */
        userId: string;


        /**
         * The id of the doodle to register for it.
         * This id is introduced to have two ids for a doodle:
         * One for the owner (_id, to edit the doodle) and one to register
         * (registerId, to register).
         */
        registerId: string;

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
         * @param dateProposalId The id of the data proposal to delete.
         */
        deleteDateProposal(dateProposalId:string): void;

        /**
         * Adds a new name to the names that have accepted a date proposal.
         *
         * @param dateProposalId The id of the data proposal.
         * @param name The name to add.
         */
        addAcceptedNameToDateProposal(dateProposalId:string, name: string): void;

        /**
         * Deletes a name from the names that have accepted a new date proposal.
         *
         * @param dateProposalId The id of the data proposal.
         * @param name The name to delete.
         */
        deleteAcceptedNameFromDateProposal(dateProposalId:string, name: string): void;

        /**
         * Gets a date proposal for an id.
         *
         * @param dateProposalId The id of the date proposal.
         */
        getDatePoposal(dateProposalId: string): IDateProposal;


    }

    /**
     *
     */
    export interface IDateProposalAccepted {
        dateProposalId: string;
        name: string;
    }

    export interface IRegisterDoodleChanges {
        doodleId: string;
        datePropolalsAccepted: Array<IDateProposalAccepted>;
        datePropolalsRejected: Array<IDateProposalAccepted>;
    }

}