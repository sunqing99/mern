express = require('express');
const app = express();

//app.use(express.static('static'));
var serveIndex = require('serve-index');
app.use('/public', serveIndex('static')); // shows you the file list
app.use('/public', express.static('static')); // serve the actual files

var port = process.env.PORT || 8080;
app.listen(port, function(){
    console.log('App started on port ', port);
});
