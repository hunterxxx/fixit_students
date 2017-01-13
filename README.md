# Fixit Students! #
[![Build Status](https://travis-ci.org/hunterxxx/fixit_students.svg?branch=master)](https://travis-ci.org/hunterxxx/fixit_students)
[![Language](https://img.shields.io/badge/Language-Javascript%20ECMA2015-lightgrey.svg)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Framework](https://img.shields.io/badge/Framework-NodeJS%206.9-blue.svg)](https://nodejs.org/)
[![Webserver](https://img.shields.io/badge/Webserver-Hapi%2016-blue.svg)](http://hapijs.com/)
[![LinesOfCode](https://img.shields.io/badge/LOC-398-lightgrey.svg)](https://github.com/rmeissn/fixit_students/blob/master/package.json#L16)

This repository contains code of a NodeJS based Microservice. The service has some errors that shall be fixed by students of the Leipzig University, course SWT-16.

**Remember to exchange urls when forking!**

### Where to start developing? ###
---
Run the following commands on your command-line and have a look at the output.

```
npm run lint
npm run test:integration
npm run coverage
npm run countLOC
```

If you want to dig through the code, have a look at the file [server.js](https://github.com/rmeissn/fixit_students/blob/master/server.js), that is the main routine of this service. Follow the **require(...)** statements to dig trough the entire code in the right order.

If you want to have a look at **tests**, head over to the folder [tests/](https://github.com/rmeissn/fixit_students/tree/master/tests). We're using Mocha and Chai for our purposes.

Since we're developing our application with NodeJS, we're using [npm](https://docs.npmjs.com/) as a **task runner**. Have a look at the file's [/package.json](https://github.com/rmeissn/fixit_students/blob/master/package.json) script section to obtain an overview of available commands. Some are:

```
# Run syntax check and lint your code
npm run lint

# Run unit tests
npm run unit:test

# Start the application
npm start
...
```

You want to **checkout this cool service**? Simply start the service by runningy `npm start` and head over to: [http://localhost:3000/documentation](http://localhost:3000/documentation). We're using  [swagger](https://www.npmjs.com/package/hapi-swagger) to have this super cool API discrovery/documentation tool. BTW.: Did you already discoverd the super easy swagger integration inside [/routes.js](https://github.com/rmeissn/fixit_students/blob/master/routes.js)? Tags 'api' and 'description' were everything we needed to add.

### What's about Continuous Integration/Delivery? ###
---
Continuous Integration and possibly Continuous Delivery is currently setup by using the (for OSS projects) free to use web application [Travis-CI](https://travis-ci.org/). By clicking on the first badge (see at the top), you will be redirected to Travis-CI. There you can have a look at all the different build stages.

We've also setup Code Coverage reports. This is done by [Coveralls](https://coveralls.io). Just click on the coverage badge and you'll be redirected to our corresponding Coveralls project.
