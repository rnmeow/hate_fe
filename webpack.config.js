import { resolve, dirname } from 'node:path'

import { CleanWebpackPlugin } from 'clean-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import WebpackBar from 'webpackbar'
import HtmlPlugin from 'html-webpack-plugin'
import CopyPlugin from 'copy-webpack-plugin'

/**
 * @param { unknown } _env
 * @param { { mode: 'production' | 'development' } } argv
 * @returns { Promise<import('webpack').Configuration> }
 */
async function config(_env, argv) {
  const isDevMode = argv.mode !== 'production'

  return {
    entry: {
      app: resolve(dirname(''), 'src/main.tsx'),
    },
    output: {
      path: resolve(dirname(''), 'dist'),
      filename: isDevMode ? '[name].js' : `[name].[chunkhash].js`,
      webassemblyModuleFilename: '[contenthash].wasm',
      hashFunction: 'xxhash64',
      hashDigestLength: 12,
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.css', '.json'],
      extensionAlias: { '.js': ['.ts', '.js'] },
      cache: true,
      unsafeCache: false,
      alias: {
        '@': resolve(dirname(''), 'src'),
      },
    },
    module: {
      rules: [
        {
          test: /\.module\.css$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                modules: {
                  mode: 'local',
                  localIdentName: isDevMode
                    ? '[name]__[local]'
                    : '[name]__[local]--[hash:base64:6]',
                },
              },
            },
          ],
        },
        {
          test: /\.tsx?$/,
          use: {
            loader: 'esbuild-loader',
            options: {
              target: 'es2017',
              minify: !isDevMode,

              implementation: await import('esbuild'),
            },
          },
        },
        {
          test: /\.(png|svg|gif|jpe?g|webp|avif)$/i,
          type: 'asset/resource',
        },
      ],
    },
    plugins: [
      !isDevMode && new WebpackBar(),
      !isDevMode &&
        new CleanWebpackPlugin({
          verbose: true,
        }),
      new MiniCssExtractPlugin({
        filename: isDevMode ? '[name].css' : '[name].[fullhash].css',
        ignoreOrder: false,
      }),
      new HtmlPlugin({
        template: resolve(dirname(''), 'src/index.html'),
        chunksSortMode: 'manual',
        chunks: ['vendors', 'app'],
        hash: true,
        inject: 'body',
        minify: {
          removeComments: false,
          collapseWhitespace: true
        },
      }),
      new CopyPlugin({
        patterns: ['www'],
      }),
    ],
    optimization: {
      runtimeChunk: {
        name: 'webpack-runtime',
      },
      splitChunks: {
        minSize: 60000,
        cacheGroups: {
          preact: {
            test: /[\\/]node_modules[\\/](preact|preact-iso)[\\/]/,
            name: 'preact',
            chunks: 'initial',
            enforce: true,
            priority: 10,
            reuseExistingChunk: true,
          },
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
            priority: -10,
          },
        },
      },
    },
    cache: {
      type: 'filesystem',
      maxMemoryGenerations: isDevMode ? 5 : Infinity,
      compression: isDevMode ? 'gzip' : false,
    },
    devtool: isDevMode ? 'eval-cheap-module-source-map' : 'source-map',
    devServer: {
      static: {
        directory: resolve(dirname(''), 'www'),
      },
      watchFiles: [resolve(dirname(''), 'src/**/*')],
      port: 8080,
    },
  }
}

export default config
