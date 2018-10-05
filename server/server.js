import SourceMapSupport from 'source-map-support';
import 'babel-polyfill';
import express from 'express';
import { MongoClient, ObjectId } from 'mongodb';
import bodyParser from 'body-parser';
import path from 'path';
import Issue from './issue';

const app = express();
SourceMapSupport.install();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/playground';
let mongoDb;
let mongoConnection;

app.use(express.static('static'));

app.use(bodyParser.json());
app.use((err, req, res, next) => {
  if (err) {
    console.log('Invalid Request data');
    res.send('Invalid Request data');
  } else {
    next();
  }
});
app.use(express.static('static')); // serve the actual files
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
  mongoDb.collection('issues')
    .find(filter)
    .toArray()
    .then((issues) => {
      const metadata = {
        total_count: issues.length,
      };
      console.log('About to send API response');
      res.json({
        _metadata: metadata,
        records: issues,
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: `Internal Server Error: ${error}` });
    });
});

app.get('/api/issues/:id', (req, res) => {
  let issueId;
  try {
    issueId = new ObjectId(req.params.id);
  } catch (error) {
    res.status(422).json({ message: `Invalid issue ID format: ${error}` });
  }
  mongoDb.collection('issues')
    .find({ _id: issueId })
    .limit(1)
    .next()
    .then((issue) => {
      if (!issue) res.status(404).json({ message: `No such issue: ${issueId}` });
      else res.json(issue);
    })
    .catch((error) => {
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
  const err = Issue.validateIssue(newIssue);
  if (err) {
    res.status(422).json({ message: `Invalid request: ${err}` });
    return;
  }
  mongoDb.collection('issues')
    .insertOne(Issue.cleanupIssue(newIssue))
    .then(result => mongoDb.collection('issues')
      .find({ _id: result.insertedId })
      .limit(1)
      .next())
    .then((issue) => {
      res.json(issue);
    })
    .catch((error) => {
      console.log(error);
      res.status(500)
        .json({ message: `Internal Server Error: ${error}` });
    });
});

app.get('*', (req, res) => {
  res.sendFile(path.resolve('static/index.html'));
});

const port = process.env.PORT || 8080;

MongoClient.connect(MONGODB_URI, { useNewUrlParser: true })
  .then((connection) => {
    mongoConnection = connection;
    mongoDb = mongoConnection.db(MONGODB_URI.replace(/.*\//, ''));
    app.listen(port, () => {
      console.log('App started on port ', port);
    });
  })
  .catch((err) => {
    console.log('Error connecting to mongodb:', err);
  });
