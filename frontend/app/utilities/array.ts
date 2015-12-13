/**
 * Created by Luzius on 14.09.2015.
 */
module Home.Utilities {

    export interface Func<T,TResult> {
        (item:T): TResult;
    }


    export class ArrayUtilities {

        static findFirstOrDefault<T>(array:Array<T>, predicate:Func<T,boolean>):T {
            var index:number;
            index = 0;
            while (index < array.length) {
                if (predicate(array[index])) {
                    return array[index];
                }
                index++;
            }

            return null;
        }

        static removeWhere<T>(array:Array<T>, predicate:Func<T,boolean>):number {
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

        static select<TSource, TResult>(array:Array<TSource>, selector:Func<TSource,TResult>):Array<TResult> {
            return array.map(selector);
        }

    }
}