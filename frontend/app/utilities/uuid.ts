module Home.Utilities {

    /**
     * Unique id creation.
     */
    export class Uuid {

        static createNew():string {
            function GetRandomHex8(slice) {
                var p = (Math.random().toString(16) + "000000000").substr(2, 8);
                return slice ? "-" + p.substr(0, 4) + "-" + p.substr(4, 4) : p;
            }

            return GetRandomHex8(false) + GetRandomHex8(true) + GetRandomHex8(true) + GetRandomHex8(false);

        }

        static empty():string {
            return '00000000-0000-0000-0000-000000000000';
        }
    }


}