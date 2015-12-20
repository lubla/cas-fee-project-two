# Doodle Web Client

*Generated with [ng-poly](https://github.com/dustinspecker/generator-ng-poly/tree/v0.10.11) version 0.10.11*

## Setup

1. Install [Node.js](http://nodejs.org/)
 - This will also install npm.
1. Run `npm install -g bower gulp yo generator-ng-poly@0.10.11`
 - This enables Bower, Gulp, and Yeoman generators to be used from command line.
1. Run `npm install` to install this project's dependencies
1. Run `bower install` to install client-side dependencies
1. Use [generator-ng-poly](https://github.com/dustinspecker/generator-ng-poly) to create additional components

## Gulp tasks

- Run `gulp build` to compile assets
- Run `gulp dev` to run the build task and setup the development environment, *the server must be running on localhost:3000* (see [Server Readme](../server/README.md)).
- Run `gulp unitTest` to run unit tests via Karma and to create code coverage reports
- Run `gulp webdriverUpdate` to download Selenium server standalone and Chrome driver for e2e testing
- Run `gulp e2eTest` to run e2e tests via Protractor
 
 ## Developers instructions

 
 If not already installed
 ========================
 npm install -g bower gulp yo generator-ng-poly
 npm install -g tsd
 
 In frontend folder
 ==================
 npm cache clean
 npm install
 bower install
 
 
 Run the frontend:
 1. Start the server
 2. Load the frontend project in webstorm
 3. Run gulp
 
 Prerequisites to run the e2e test
 ================================
 
 1. Install silenium standalone:
 gulp webdriverUpdate
 
 2. Download and install java.
 
 Notes for IE 11:
 1) e2e test with IE 11 is not straight forward.
 2) Download and install IE WebDriver Tool for Internet Explorer 11 (select the tools are available for Win 7 and Win 8.1) from
     http://www.microsoft.com/en-sg/download/details.aspx?id=44069&e6b34bbe-475b-1abd-2c51-b5034bcdd6d2=True&751be11f-ede8-5a0c-058c-2ee190a24fa6=True&a03ffa40-ca8b-4f73-0358-c191d75a7468=True&NavToggle=True
 3) Download IE selenium driver server IEDriverServer_Win32_2.48.0.zip from https://selenium-release.storage.googleapis.com/index.html?path=2.48/
 4) Unpack IEDriverServer to an empty folder
 5) Add the folder to the environment variable PATH
 6) In IE => Tools => Internet Optionen => Sicherheit: Check "Geschützten Modus aktivieren" for ALL internet Zoons (Internet, Intranet ...).
 7) IE zoom level must be 100%

 ## SASS Conventions

 * The convention for structuring the styles is the BEM-Notation (Block, Element, Modifier).
