const webpack = require('webpack');

const packagejson = require('./package.json')

const production = process.env.NODE_ENV === 'production';

module.exports = {
    entry: './src/app.jsx',
    mode: production ? 'production' : 'development',
    devtool: 'source-map',
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.mjs', '.mjsx']
    },
    module: {
        rules: [
            {
              test: /\.jsx?$/,
              exclude: /(node_modules|bower_components)/,
              use: {
                loader: 'babel-loader',
              }
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
          FRONTEND_ROUTE: production
            ? JSON.stringify(packagejson.applicationURL.production)
            : JSON.stringify(packagejson.applicationURL.development),
        }),
    ],
    externals: {
        jsonld: '{}',
        'node-fetch': 'fetch',
    }
}
