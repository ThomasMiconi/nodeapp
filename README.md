This is based mostly on information from [Scott Smith's tutorial](http://scottksmith.com/blog/2014/10/05/twitatron-building-a-production-web-app-with-node/).

Also [Templating with ejs](https://coligo.io/templating-node-and-express-apps-with-ejs/).

Remember that you need to also install npm install ejs-locals if you want to use ejs with partials, includes, etc.

Also, when using SQLite, remember to use parameters in your statements to ensure sanitization / avoid SQL injections (https://github.com/mapbox/node-sqlite3/wiki/API, https://github.com/mapbox/node-sqlite3/issues/57)

Also some good information in the SQLite tutorial, e.g. http://www.sqlitetutorial.net/sqlite-foreign-key/.
