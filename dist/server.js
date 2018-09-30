'use strict';

var _sourceMapSupport = require('source-map-support');

var _sourceMapSupport2 = _interopRequireDefault(_sourceMapSupport);

require('babel-polyfill');

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _mongodb = require('mongodb');

var _issue = require('./issue');

var _issue2 = _interopRequireDefault(_issue);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_sourceMapSupport2.default.install();

const app = (0, _express2.default)();


const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/playground";
let mongo_db, mongo_connection;

app.use(_express2.default.static('static'));

app.use(_bodyParser2.default.json());
app.use((err, req, res, next) => {
    if (err) {
        console.log('Invalid Request data');
        res.send('Invalid Request data');
    } else {
        next();
    }
});
app.use(_express2.default.static('static')); // serve the actual files
app.set('json spaces', 4);
console.log(`NODE_ENV is ${process.env.NODE_ENV}`);
if (process.env.NODE_ENV !== 'production') {
    const webpack = require('webpack');
    const webpackDevMiddleware = require('webpack-dev-middleware');
    const webpackHotMiddleware = require('webpack-hot-middleware');
    const config = require('../webpack.config');
    config.entry.app.push('webpack-hot-middleware/client', 'webpack/hot/only-dev-server');
    config.plugins.push(new webpack.HotModuleReplacementPlugin());
    const bundler = webpack(config);
    app.use(webpackDevMiddleware(bundler, { noInfo: true }));
    app.use(webpackHotMiddleware(bundler, { log: console.log }));
}

app.get('/api/issues', (req, res) => {
    mongo_db.collection('issues').find().toArray().then(issues => {
        const metadata = {
            total_count: issues.length
        };
        console.log('About to send API response');
        res.json({
            _metadata: metadata,
            records: issues
        });
    }).catch(error => {
        console.log(error);
        res.status(500).json({ message: `Internal Server Error: ${error}` });
    });
});

app.post('/api/issues', (req, res) => {
    const newIssue = req.body;
    newIssue.created = new Date();
    if (!newIssue.status) {
        newIssue.status = 'New';
    }
    const err = _issue2.default.validateIssue(newIssue);
    if (err) {
        res.status(422).json({ message: `Invalid request: ${err}` });
        return;
    }
    mongo_db.collection('issues').insertOne(newIssue).then(result => {
        // console.log(JSON.stringify(result, null, 2), result.insertedId);
        return mongo_db.collection('issues').find({ _id: result.insertedId }).limit(1).next();
    }).then(newIssue => {
        res.json(newIssue);
    }).catch(error => {
        console.log(error);
        res.status(500).json({ message: `Internal Server Error: ${error}` });
    });
});

var port = process.env.PORT || 8080;

_mongodb.MongoClient.connect(MONGODB_URI, { useNewUrlParser: true }).then(connection => {
    mongo_connection = connection;
    mongo_db = mongo_connection.db(MONGODB_URI.replace(/.*\//, ''));
    app.listen(port, function () {
        console.log('App started on port ', port);
    });
}).catch(err => {
    console.log("Error connecting to mongodb:", err);
});
//# sourceMappingURL=server.js.map