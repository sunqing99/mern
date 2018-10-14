(function(e, a) { for(var i in a) e[i] = a[i]; }(exports, /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _sourceMapSupport = __webpack_require__(1);

var _sourceMapSupport2 = _interopRequireDefault(_sourceMapSupport);

__webpack_require__(2);

var _express = __webpack_require__(3);

var _express2 = _interopRequireDefault(_express);

var _mongodb = __webpack_require__(4);

var _bodyParser = __webpack_require__(5);

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _renderedPageRouter = __webpack_require__(6);

var _renderedPageRouter2 = _interopRequireDefault(_renderedPageRouter);

var _issue = __webpack_require__(12);

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
console.log(`NODE_ENV is ${"none"}`);

/* eslint-disable global-require, import/no-extraneous-dependencies */
if (true) {
  const webpack = __webpack_require__(13);
  const webpackDevMiddleware = __webpack_require__(14);
  const webpackHotMiddleware = __webpack_require__(15);
  const config = __webpack_require__(16);
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

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("source-map-support");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("babel-polyfill");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("mongodb");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(7);

var _react2 = _interopRequireDefault(_react);

var _server = __webpack_require__(8);

var _express = __webpack_require__(3);

var _express2 = _interopRequireDefault(_express);

var _HelloWorld = __webpack_require__(9);

var _HelloWorld2 = _interopRequireDefault(_HelloWorld);

var _template = __webpack_require__(11);

var _template2 = _interopRequireDefault(_template);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const renderedPageRouter = new _express2.default();

renderedPageRouter.get('*', (req, res) => {
  const initialState = { addressee: 'Universe' };
  const html = (0, _server.renderToString)(_react2.default.createElement(_HelloWorld2.default, initialState));
  res.send((0, _template2.default)(html, initialState));
});

exports.default = renderedPageRouter;

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("react-dom/server");

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(7);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(10);

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class HelloWorld extends _react2.default.Component {
  constructor(props) {
    super(props);
    this.state = Object.assign({}, this.props);
  }

  static get propTypes() {
    return {
      addressee: _propTypes2.default.string // eslint-disable-line react/no-unused-prop-types
    };
  }

  static get defaultProps() {
    return {
      addressee: ''
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ addressee: 'Universe' });
    }, 100);
  }

  render() {
    const { addressee } = this.state;
    return _react2.default.createElement(
      'h1',
      null,
      'Hello ',
      addressee,
      '!'
    );
  }
}
exports.default = HelloWorld;

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = require("prop-types");

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
const template = (body, initialState) => `
    <!DOCTYPE HTML>
    <html>
      <head>
        <meta charset="UTF-8" />
        <title>Pro MERN Stack</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <link rel="stylesheet" href="/bootstrap/css/bootstrap.min.css" />
        <style>
          .panel-title a {
            display: block;
            width: 100%;
            cursor: pointer;
          }
        </style>
      </head>
      <body>
        <div id="contents">${body}</div>
        <script>window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}; </script>
        <script src="/vendor.bundle.js"></script>
        <script src="/app.bundle.js"></script>
      </body>
    </html>
  `;

exports.default = template;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
const validIssueStatus = {
  New: true,
  Open: true,
  Assigned: true,
  Fixed: true,
  Verified: true,
  Closed: true
};

const issueFieldType = {
  status: 'required',
  owner: 'required',
  effort: 'optional',
  created: 'required',
  completionDate: 'optional',
  title: 'required'
};

function cleanupIssue(issue) {
  const cleanedUpIssue = {};
  Object.keys(issue).forEach(field => {
    if (issueFieldType[field]) cleanedUpIssue[field] = issue[field];
  });
  return cleanedUpIssue;
}

function validateIssue(issue) {
  const errors = [];
  Object.keys(issueFieldType).forEach(field => {
    if (issueFieldType[field] === 'required' && !issue[field]) {
      errors.push(`${field} is required.`);
    }
  });
  if (!validIssueStatus[issue.status]) {
    errors.push(`${issue.status} is not a valid status`);
  }
  return errors.length ? errors.join(';') : null;
}

function convertIssue(issue) {
  if (issue.created) issue.created = new Date(issue.created);
  if (issue.completionDate) issue.completionDate = new Date(issue.completionDate);
  return cleanupIssue(issue);
}

exports.default = {
  validateIssue,
  cleanupIssue,
  convertIssue
};

/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = require("webpack");

/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = require("webpack-dev-middleware");

/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = require("webpack-hot-middleware");

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__dirname) {

// check out https://stackoverflow.com/questions/48985780/webpack-4-create-vendor-chunk/48986526#48986526
const path = __webpack_require__(17);

module.exports = {
  mode: 'none',
  entry: {
    app: ['./client/Client.jsx'],
    vendor: ['react', 'react-dom', 'react-router-dom', 'react-bootstrap', 'react-router-bootstrap', 'whatwg-fetch', 'babel-polyfill']
  },
  output: {
    path: path.resolve(__dirname, 'static'),
    filename: '[name].bundle.js',
    chunkFilename: '[name].bundle.js'
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          chunks: 'initial',
          name: 'vendor',
          test: 'vendor',
          enforce: true
        }
      }
    }
  },
  plugins: [],
  module: {
    rules: [{
      test: /\.jsx$/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['react', 'es2015']
        }
      }
    }]
  },
  // see https://github.com/webpack/webpack/issues/3486#issuecomment-267599683
  performance: {
    hints:  false ? undefined : false
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  devtool: 'source-map'
};
/* WEBPACK VAR INJECTION */}.call(this, "/"))

/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ })
/******/ ])));
//# sourceMappingURL=server.bundle.js.map