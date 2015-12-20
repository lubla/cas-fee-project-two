# Doodle Web Client

*Generated with [ng-poly](https://github.com/dustinspecker/generator-ng-poly/tree/v0.10.11) version 0.10.11*

## Setup

1. Install [Node.js](http://nodejs.org/)
 - This will also install npm.
1. Run `npm install -g bower gulp yo generator-ng-poly@0.10.11`
 - This enables Bower, Gulp, and Yeoman generators to be used from command line.
1. Run `npm cache clean` to clean the modules cache.
1. Run `npm install` to install this project's dependencies.
1. Run `bower install` to install client-side dependencies.

## Gulp tasks

- Run `gulp build` to compile assets
- Run `gulp unitTest` to run unit tests via Karma and to create code coverage reports
- Run `gulp webdriverUpdate` to download Selenium server standalone and Chrome driver for e2e testing
- Run `gulp e2eTest` to run e2e tests via Protractor
 
## Run the client in Webstorm
 
 1. Start the server, see [Server README](../server/README.md).
 1. Load the frontend project in Webstorm.
 1. Run `gulp build`.
 1. Create a debug configuration that loads the URL `http://localhost:3000/#/home`.
 1. Run or debug the debug configuration.
 
## Run the client from the command line

 1. Start the server, see [Server README](../server/README.md).
 1. In the browser load `http://localhost:3000/#/home`.
 
## Project structure

### app
- [home-module](app/app-module.ts): Angular registration of the frontend module.
- [home-routes](app/app-routes.ts): Configuration of the default route.
- [index](app/index.html): Doodle html start page.

### app/home
- [home-module](app/home/home-module.ts): Angular registration of the home module.
- [home-routes](app/home/home-routes.ts): Configuration of the routes that link to controllers with the views. Controller As syntax is  used.

### app/home/controllers
The controllers and their unit test.

### app/home/views
The HTML templates of the views.

### app/home/services
The services that consume the REST service of the doodle server to store and retrieve doodles ([repository-service](app/home/services/repository-service.ts)) and 
user profiles ([user-management-service](app/home/services/user-management-service.ts)) and their unit tests. [rest-service-consumer](app/home/services/z_rest-service-consumer.ts) contains 
a base class for the services to share common service code (e.g. error handling).

### app/interfaces
- [services](app/interfaces/services.ts): Interfaces for the doodle repository service and user profile service.
- [types](app/interfaces/services.ts): Interfaces for all types that are used, e.g. IDoodle, IUserProfile.

### app/style

SASS styles of the views, using BEM-Notation (Block, Element, Modifier).


### app/utilities
- [array](app/utilities/array.ts): Array utilities (linq like interface).
- [md5](app/utilities/md5.ts): MD5 hash calculation. Used to build the password hash.
- [uuid](app/utilities/uuid.ts): Used to create unique IDs for doodles. The IDs are used as IDs when storing doodles in the mongo db
 and to build the URL query items to edit doodles or register for doodles.
- [validation](app/utilities/validation.ts): User input validation functions (e.g. valid email address). 

### Other folders
- build: Build output for app and unit test.
- e2e: e2e test typescript source files.
- gulp: Gulp tasks.
- typeings: Type definition files.

## Tests
### Unit tests
Start the unit tests with `gulp unitTest`. Basic tests are available for the controllers and intensive tests for the services (using ng.IHttpBackendService 
to mock up the Doodle REST service).
### e2e tests
### Prerequisites to run the e2e tests. 
1. run `gulp webdriverUpdate`.
2. Download and install Java.

### Running the e2e tests.
Start the unit tests with `gulp build` and then `gulp e2eTest`. Basic tests are available for home, the login and the doodle-registered pages. The 
edit doodle page is tested intensively. The tests are running with Chrome, Firefox and Internet Explorer 11.0. The browser can be 
configured in [protractor-config](protractor.config.js) (search for browserName).

### Running the e2e tests with Internet Explorer 11.

The e2e tests run without additional installation steps on Chrome and Firefox. Internet Explorer needs a little bit more:

1. e2e test with IE 11 is not straight forward.
1. Download IE selenium driver server [IEDriverServer_Win32_2.48.0.zip](https://selenium-release.storage.googleapis.com/index.html?path=2.48/).
1. Unpack IEDriverServer to an empty folder.
1. Add the folder to the environment variable PATH.
1. Download and install [IE WebDriver Tool](http://www.microsoft.com/en-sg/download/details.aspx?id=44069&e6b34bbe-475b-1abd-2c51-b5034bcdd6d2=True&751be11f-ede8-5a0c-058c-2ee190a24fa6=True&a03ffa40-ca8b-4f73-0358-c191d75a7468=True&NavToggle=True) for Internet Explorer 11 (the tools are available for Win 7 and Win 8.1).
1. In Internet Explorer => Tools => Internet Optionen => Sicherheit: Check "Geschützten Modus aktivieren" for ALL internet zones (Internet, Intranet ...).
1. IE zoom level must be 100%.
