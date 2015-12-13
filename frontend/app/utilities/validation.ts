/**
 * Created by Luzius on 15.08.2015.
 */
module Home.Utilities {

    /**
     * Validation utilities
     */
    export class Validation {

        /**
         * Check if a input string has the format of a valid e-mail address.
         *
         * @param email
         * @returns {boolean} true if the input string has a valid e-mail address format.
         */
        static emailIsValid(email: string): boolean {
            var regExp = /\S+@\S+\.\S+/;
            return regExp.test(email);
        }
    }
}