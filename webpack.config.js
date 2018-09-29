const path = require('path');
module.exports = {
    mode: 'production',
    entry: './src/IssueTracker.jsx',
    output: {
        path: path.resolve(__dirname, 'static'),
        filename: 'app.bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.jsx$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['react', 'es2015']
                    }
                },
            },
        ]
    }
};
