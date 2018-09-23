express = require('express');
const app = express();

//app.use(express.static('static'));
var serveIndex = require('serve-index');
app.use('/static', serveIndex('static')); // shows you the file list
app.use('/static', express.static('static')); // serve the actual files

var port = process.env.PORT || 8080;
app.listen(port, function(){
    console.log('App started on port ', port);
});
