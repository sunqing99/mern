express = require('express');
const app = express();
app.use(express.static('static'));
var port = process.env.PORT || 8080;
app.listen(port, function(){
    console.log('App started on port ', port);
});
