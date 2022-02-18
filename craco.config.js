const CracoLessPlugin = require('craco-less');
// const webpack = require('webpack')

const lessModifyVars = {};

module.exports = {
    plugins: [
        {
            plugin: CracoLessPlugin,
            options: {
                lessLoaderOptions: {
                    lessOptions: {
                        modifyVars: lessModifyVars,
                        javascriptEnabled: true,
                    },
                },
                modifyLessRule: function (lessRule, _context) {
                    lessRule.test = /\.less$/;
                    lessRule.exclude = /\.module\.less$/;
                    return lessRule;
                },
            },
        },
        {
            plugin: CracoLessPlugin,
            options: {
                lessLoaderOptions: {
                    lessOptions: {
                        modifyVars: lessModifyVars,
                        javascriptEnabled: true,
                    },
                },
                modifyLessRule: function (lessRule, _context) {
                    lessRule.test = /\.module\.less$/;
                    lessRule.exclude = undefined;
                    return lessRule;
                },
                cssLoaderOptions: {
                    modules: { localIdentName: '[local]_[hash:base64:5]' },
                },
            },
        },
    ],
    /**
     * Config this only when you need nodejs polyfills
     */
    // webpack: {
    //     configure(webpackConfig, {env, path}) {
    //         webpackConfig.resolve.fallback = {
    //             ...webpackConfig.resolve.fallback ?? {},
    //             crypto: require.resolve('crypto-browserify'),
    //             stream: require.resolve('stream-browserify'),
    //             buffer: require.resolve('buffer'),
    //             util: require.resolve('util'),
    //         };
    //
    //         webpackConfig.plugins.push(
    //             new webpack.ProvidePlugin({
    //                 process: 'process/browser.js',
    //                 Buffer: ['buffer', 'Buffer'],
    //             }),
    //         );
    //         return webpackConfig;
    //     }
    // }
};
