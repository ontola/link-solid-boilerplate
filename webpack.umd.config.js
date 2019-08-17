const path = require('path');

const webpack = require('webpack');

const production = process.env.NODE_ENV === 'production';

module.exports = {
    entry: {
      index: './src/index.js',
    },
    mode: production ? 'production' : 'development',
    devtool: 'source-map',
    output: {
      libraryTarget: 'umd',
      path: path.join(process.cwd(), '')
    },
    resolve: {
        extensions: ['.js', '.jsx']
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
            ? JSON.stringify('https://fletcher91.github.io/link-minesweeper/')
            : JSON.stringify('http://localhost:8000/'),
        }),
    ],
    externals: {
        jsonld: '{}',
        'node-fetch': 'fetch',
        'solid-auth-client': 'SolidAuthClient',
        'rdflib': 'Rdflib',
        'react': 'React',
        'link-lib': 'LinkLib',
        'link-redux': 'LinkRedux',
    }
}
