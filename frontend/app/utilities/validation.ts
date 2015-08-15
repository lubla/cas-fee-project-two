/**
 * Created by Luzius on 15.08.2015.
 */
module Home.Utilities {

    export class Validation {

        static emailIsValid(email: string): boolean {
            var regExp = /\S+@\S+\.\S+/;
            return regExp.test(email);
        }
    }
}