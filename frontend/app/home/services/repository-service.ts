///<reference path='../../../typings/tsd.d.ts' />
module Home.Services {
  'use strict';

  export class User implements Home.Interfaces.IUser {
    email: string;
    password: string;

    constructor(email: string, password: string) {
      this.email = email;
      this.password = password;
    }
  }


  class Repository implements Home.Interfaces.IRepository{
    public static $inject = ['$log', '$http', '$q'];

    name: string;

    constructor(private $log:ng.ILogService, private $http:ng.IHttpService, private $q : ng.IQService) {
      this.name = 'Repository';
      this.$log.debug('Repository created');
    }

    getUserProfiles():Array<Home.Interfaces.IUserProfile> {
      return [];
    }

    get(): string {
      return name;
    }
  }

  /**
   * @ngdoc service
   * @name home.service:Repository
   *
   * @description
   *
   */
  angular
    .module('home')
    .service('Repository', Repository);
}
