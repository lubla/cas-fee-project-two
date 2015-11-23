/**
 * Created by Luzius on 21.11.2015.
 */
///<reference path='../../../typings/tsd.d.ts' />

/**
 * Implements common stuff for the doodle services.
 *
 * Note that the file name starts with a z. This is a workaround to have this file
 * as last in the file list. Classes that extend RestServiceConsumer don't work
 * properly without this.
 *
 * To do: Get rid of the z in the file name.
 *
 */

module Home.Services {

    import IDeferred = angular.IDeferred;
    'use strict';

    /**
     * Base class for the doodle service.
     *
     * Implements a common constructor and promise resolve and reject handling.
     *
     */
    export class RestServiceConsumer {

        public static $inject = ['$log', '$http', '$q'];

        constructor(public $log:ng.ILogService,
                    public $http:ng.IHttpService,
                    public $q:ng.IQService) {

        }

        /**
         * Promise resolve handling.
         *
         * @param deferred      The deferred object.
         * @param response      The http response. The status of the response is check. If the status is not OK then an error with the response status text is rejected.
         * @param createResult  Callback that creates the result of the promise (called if the status of the response is OK).
         */
        protected static resolveResponse<TResult>(deferred:IDeferred<TResult>,
                                                  response:ng.IHttpPromiseCallbackArg<Object>,
                                                  createResult:() => TResult):void {

            if (response.status === 200) {
                deferred.resolve(createResult());
            }
            else {
                deferred.reject(new Error(response.statusText));
            }
        }

        /**
         * Promise error handling.
         *
         * @param deferred The deferred object.
         * @param error    The error object of the promise. An instance of the Error class is rejected.
         */
        protected static rejectError<TResult>(deferred:IDeferred<TResult>,
                                              error:any):void {
            deferred.reject(new Error(error.data ? error.data : error.statusText));
        }
    }
}