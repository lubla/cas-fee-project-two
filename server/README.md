# Doodle Web Server

## Prerequists

### Mongo db
Install mongoDB from the mongoDB web page.
mongoDB must run with the default settings (e.g. port).

### Node Modules
Execute `npm install` in the server folder.

## Run the server

### In Webstorm
1. Load the server project in Webstorm.
2. Run server.js

### On the command line:
1. Change to the server folder.
2. Execute: `node server.js`

Console output if server is running:

Connected to server mongodb://localhost:27017/doodle
Server listening at http://:::3000

## Modules

### [server.js](server.js)
Doodle server start up module.
### [database/repository.js](database/repository.js)
Promise based call interface to the doodle mongo db.
### [routes/doodle.js](routes/doodle.js)
REST routes for the doodles.
### [routes/userProfile.js](routes/userProfile.js)
REST routes for the user profiles.


