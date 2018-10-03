'use strict';

var _sourceMapSupport = require('source-map-support');

var _sourceMapSupport2 = _interopRequireDefault(_sourceMapSupport);

require('babel-polyfill');

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _mongodb = require('mongodb');

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _issue = require('./issue');

var _issue2 = _interopRequireDefault(_issue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express2.default)();
_sourceMapSupport2.default.install();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/playground';
let mongoDb;
let mongoConnection;

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

/* eslint-disable global-require, import/no-extraneous-dependencies */
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
/* eslint-enable global-require, import/no-extraneous-dependencies */

app.get('/api/issues', (req, res) => {
  console.log(JSON.stringify(req.query, null, 2));
  const filter = {};
  if (req.query.status) filter.status = req.query.status;
  mongoDb.collection('issues').find(filter).toArray().then(issues => {
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
  mongoDb.collection('issues').insertOne(_issue2.default.cleanupIssue(newIssue)).then(result => mongoDb.collection('issues').find({ _id: result.insertedId }).limit(1).next()).then(issue => {
    res.json(issue);
  }).catch(error => {
    console.log(error);
    res.status(500).json({ message: `Internal Server Error: ${error}` });
  });
});

app.get('*', (req, res) => {
  res.sendFile(_path2.default.resolve('static/index.html'));
});

const port = process.env.PORT || 8080;

_mongodb.MongoClient.connect(MONGODB_URI, { useNewUrlParser: true }).then(connection => {
  mongoConnection = connection;
  mongoDb = mongoConnection.db(MONGODB_URI.replace(/.*\//, ''));
  app.listen(port, () => {
    console.log('App started on port ', port);
  });
}).catch(err => {
  console.log('Error connecting to mongodb:', err);
});
//# sourceMappingURL=server.js.map