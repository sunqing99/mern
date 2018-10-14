require('babel-register')({ // eslint-disable-line import/no-extraneous-dependencies
  presets: ['es2015-node', 'react'],
});
require('./server.js');
