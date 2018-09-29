const path = require('path');
module.exports = {
    mode: 'production',
    entry: {
        app: './src/App.jsx',
        vendor: ['react', 'react-dom', 'whatwg-fetch'],
    },
    output: {
        path: path.resolve(__dirname, 'static'),
        filename: '[name].bundle.js'
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/](react|react-dom|whatwg-fetch)[\\/]/,
                    name: 'vendor',
                    chunks: 'all',
                }
            }
        }
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
