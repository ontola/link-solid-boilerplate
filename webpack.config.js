const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const packageConfig = require('./package.json').solid

const production = process.env.NODE_ENV === 'production'

const base = {
  mode: production ? 'production' : 'development',
  devtool: 'source-map',
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.mjs', '.mjsx'],
  },
  module: {
    rules: [
      {
        test: /\.m?(j|t)sx?$/,
        exclude: /(node_modules|bower_components)/,
        use: { loader: 'babel-loader' },
      },
      {
        test: /\.(hbs|ttl)$/,
        include: /src/,
        use: { loader: 'handlebars-loader' }
      },
      {
        test: /\.(ttl)$/,
        include: /src/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
          },
        },
      },
      { test: /\.css$/, use: [MiniCssExtractPlugin.loader, 'css-loader'] },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      FRONTEND_ROUTE: production
        ? JSON.stringify(packageConfig.applicationURL.production)
        : JSON.stringify(packageConfig.applicationURL.development),
    }),
    new MiniCssExtractPlugin()
  ],
  externals: {
    jsonld: '{}',
    'node-fetch': 'fetch',
    'solid-auth-cli': '{}',
  },
}

module.exports = [
  /**
   * Build a deployable standalone website.
   */
  {
    ...base,
    entry: {
      app: './src/app.tsx',
    },
    output: {
      path: path.join(process.cwd(), 'dist', 'app'),
    },
    plugins: [
      ...base.plugins,
      new HtmlWebpackPlugin({
        appMountId: 'standaloneApp',
        inject: false,
        template: require('html-webpack-template'),
        title: packageConfig.name,
      }),
    ],
  },

  /**
   * Build a publishable Mash package
   */
  {
    ...base,
    entry: {
      package: './src/package.ts',
    },
    output: {
      libraryTarget: 'umd',
      path: path.join(process.cwd(), 'dist', 'package'),
    },
    externals: {
      ...base.externals,
      'solid-auth-client': 'SolidAuthClient',
      'rdflib': 'Rdflib',
      'react': 'React',
      'link-lib': 'LinkLib',
      'link-redux': 'LinkRedux',
    },
  },

  /**
   * Build a registrable mashlib Pane
   */
  {
    ...base,
    entry: {
      pane: './src/pane.tsx'
    },
    output: {
      path: path.join(process.cwd(), 'dist', 'pane'),
    },
  }
]
