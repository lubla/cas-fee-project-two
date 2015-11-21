/**
 * Created by Luzius on 21.11.2015.
 */
///<reference path='../../../typings/tsd.d.ts' />

module Home.Services {

    import IDeferred = angular.IDeferred;
    'use strict';

    export class RestServiceConsumer {

        public static $inject = ['$log', '$http', '$q'];

        constructor(public $log:ng.ILogService,
                    public $http:ng.IHttpService,
                    public $q:ng.IQService) {

        }

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

        protected static rejectError<TResult>(deferred:IDeferred<TResult>,
                                              error:any):void {
            deferred.reject(error);
        }
    }
}