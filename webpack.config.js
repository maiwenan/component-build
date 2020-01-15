const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const pkg = require('./package.json');

const name = pkg.name;

function resolve(filePath) {
  return path.resolve(__dirname, filePath);
}

module.exports = {
  mode: 'none',
  // 每个组件模块单独一个入口
  entry: {
    a: 'components/a/index',
    b: 'components/b/index',
    c: 'components/c/index',
    utils: 'components/utils/index'
  },
  // 所有组件在被其他组件所依赖时都替换成 commonjs2 的方式引入
  externals: {
    vue: {
      commonjs2: 'vue'
    },
    'components/a': {
      commonjs2: `${name}/lib/a.js`
    },
    'components/b': {
      commonjs2: `${name}/lib/b.js`
    },
    'components/c': {
      commonjs2: `${name}/lib/c.js`
    },
    'components/utils': {
      commonjs2: `${name}/lib/utils.js`
    }
  },

  output: {
    path: resolve('lib'),
    filename: '[name].js',
    libraryTarget: 'commonjs2'
  },

  module: {
    rules: [
      {
        test: /\.(s)css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1
            }
          },
          'postcss-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.jsx?$/,
        use: 'babel-loader'
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.vue', '.scss'],
    alias: {
      components: path.resolve(__dirname, 'components')
    }
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'style/[name].css'
    }),
    new VueLoaderPlugin()
  ]
};

