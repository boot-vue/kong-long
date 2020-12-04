const path = require('path')
const webpack = require('webpack')
const CompressionPlugin = require('compression-webpack-plugin');

function resolve(dir) {
    return path.join(__dirname, dir)
}

const isProd = process.env.NODE_ENV === 'production';

const assetsCDN = {
    externals: {
        vue: 'Vue',
        'vue-router': 'VueRouter',
        vuex: 'Vuex',
        axios: 'axios',
        nprogress: 'NProgress',
        'moment': 'moment',
        'ant-design-vue': 'antd',
        lodash: {
            commonjs: 'lodash',
            commonjs2: 'lodash',
            amd: 'lodash',
            root: '_'
        }
    },
    css: [
        '//cdn.jsdelivr.net/npm/ant-design-vue@1.7.2/dist/antd.min.css'
    ],
    js: [
        '//cdn.jsdelivr.net/npm/vue@2.6.12/dist/vue.min.js',
        '//cdn.jsdelivr.net/npm/vue-router@3.4.9/dist/vue-router.min.js',
        '//cdn.jsdelivr.net/npm/vuex@3.5.1/dist/vuex.min.js',
        '//cdn.jsdelivr.net/npm/axios@0.21.0/dist/axios.min.js',
        '//cdn.jsdelivr.net/npm/nprogress@0.2.0/nprogress.min.js',
        '//cdn.jsdelivr.net/npm/moment@2.29.1/min/moment-with-locales.min.js',
        '//cdn.jsdelivr.net/npm/ant-design-vue@1.7.2/dist/antd-with-locales.min.js',
        '//cdn.jsdelivr.net/npm/lodash@4.17.20/lodash.min.js'
    ]
}

const assetsDevCDN = {
    css: [
        '//cdn.jsdelivr.net/npm/ant-design-vue@1.6.4/dist/antd.min.css'
    ]
}

module.exports = {
    devServer: {
        host: '0.0.0.0',
        port: 80,
        disableHostCheck: true,
        open: false
    },

    productionSourceMap: false,

    configureWebpack: {
        plugins: [
            new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
            new CompressionPlugin({
                filename: '[path][name].gz[query]',
                algorithm: 'gzip',
                test: /\.js$|\.css$|\.html$/,
                threshold: 10240,
                minRatio: 0.8
            })
        ],
        externals: isProd ? assetsCDN.externals : ''
    },

    chainWebpack: config => {
        config.resolve.alias
            .set('@$', resolve('src'))

        const svgRule = config.module.rule('svg')
        svgRule.uses.clear()
        svgRule
            .oneOf('inline')
            .resourceQuery(/inline/)
            .use('vue-svg-icon-loader')
            .loader('vue-svg-icon-loader')
            .end()
            .end()
            .oneOf('external')
            .use('file-loader')
            .loader('file-loader')
            .options({
                name: 'assets/[name].[hash:8].[ext]'
            })

        config.plugin('html').tap(args => {
            args[0].cdn = isProd ? assetsCDN : assetsDevCDN
            args[0].title = 'kong long dashboard'
            return args
        })

        config.optimization.splitChunks({
            chunks: 'all',
            maxInitialRequests: Infinity,
            minSize: 30000,  // bytes
            automaticNameDelimiter: '-',
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name(module) {
                        const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
                        return `chunk.${packageName.replace('@', '')}`;
                    },
                    priority: 10
                }
            }
        })
    },
};
