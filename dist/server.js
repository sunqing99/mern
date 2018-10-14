'use strict';

var _sourceMapSupport = require('source-map-support');

var _sourceMapSupport2 = _interopRequireDefault(_sourceMapSupport);

require('babel-polyfill');

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _mongodb = require('mongodb');

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _renderedPageRouter = require('./renderedPageRouter');

var _renderedPageRouter2 = _interopRequireDefault(_renderedPageRouter);

var _issue = require('./issue');

var _issue2 = _interopRequireDefault(_issue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express2.default)();
_sourceMapSupport2.default.install();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/playground';
const COLLECTION = 'issues';
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
  if (req.query.effort_lte || req.query.effort_gte) filter.effort = {};
  if (req.query.effort_lte) filter.effort.$lte = parseInt(req.query.effort_lte, 10);
  if (req.query.effort_gte) filter.effort.$gte = parseInt(req.query.effort_gte, 10);
  mongoDb.collection(COLLECTION).find(filter).toArray().then(issues => {
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

app.get('/api/issues/:id', (req, res) => {
  let issueId;
  try {
    issueId = new _mongodb.ObjectId(req.params.id);
  } catch (error) {
    res.status(422).json({ message: `Invalid issue ID format: ${error}` });
  }
  mongoDb.collection(COLLECTION).find({ _id: issueId }).limit(1).next().then(issue => {
    if (!issue) res.status(404).json({ message: `No such issue: ${issueId}` });else res.json(issue);
  }).catch(error => {
    console.log(error);
    res.status(500).json({ message: `Internal Server Error: ${error}` });
  });
});

app.put('/api/issues/:id', (req, res) => {
  let issueId;
  try {
    issueId = new _mongodb.ObjectId(req.params.id);
  } catch (error) {
    res.status(422).json({ message: `Invalid issue id format: ${error}` });
    return;
  }

  const issue = req.body;
  delete issue._id;
  const err = _issue2.default.validateIssue(issue);
  if (err) {
    res.status(422).json({ message: `Invalid request ${err}` });
    return;
  }

  mongoDb.collection(COLLECTION).updateOne({ _id: issueId }, { $set: _issue2.default.convertIssue(issue) }).then(() => mongoDb.collection(COLLECTION).find({ _id: issueId }).limit(1).next()).then(savedIssue => {
    res.json(savedIssue);
  }).catch(error => {
    console.log(error);
    res.status(500).json({ message: `Internal Server Error ${error}` });
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
  mongoDb.collection(COLLECTION).insertOne(_issue2.default.cleanupIssue(newIssue)).then(result => mongoDb.collection(COLLECTION).find({ _id: result.insertedId }).limit(1).next()).then(issue => {
    res.json(issue);
  }).catch(error => {
    console.log(error);
    res.status(500).json({ message: `Internal Server Error: ${error}` });
  });
});

app.delete('/api/issues/:id', (req, res) => {
  let issueId;
  try {
    issueId = new _mongodb.ObjectId(req.params.id);
  } catch (error) {
    res.status(422).json({ message: `Invalid issue ID format: ${error}` });
    return;
  }

  mongoDb.collection(COLLECTION).deleteOne({ _id: issueId }).then(deleteResult => {
    if (deleteResult.result.n === 1) res.json({ status: 'OK' });else res.json({ status: 'Warmning: object not found' });
  }).catch(error => {
    console.log(error);
    res.status(500).json({ message: `Internal Server Error: ${error}` });
  });
});

app.use('/', _renderedPageRouter2.default);

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