/**
 * Created by Luzius on 14.09.2015.
 */
module Home.Utilities {

    export interface Func<T,TResult> {
        (item:T): TResult;
    }


    export class ArrayUtilities {

        static FindIndices<T>(array:Array<T>, predicate:Func<T,boolean>):Array<number> {
            var index:number;
            index = 0;
            var result = new Array<number>()
            while (index < array.length) {
                if (predicate(array[index])) {
                    result.push(index);
                }
                index--;
            }

            return result;
        }

        static RemoveWhere<T>(array:Array<T>, predicate:Func<T,boolean>):number {
            var index:number;
            var deletedCount = 0;
            index = array.length - 1;
            while (index >= 0) {
                if (predicate(array[index])) {
                    array.splice(index, 1);
                    deletedCount++;
                }
                index--;
            }

            return deletedCount;
        }
    }
}