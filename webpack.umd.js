const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'Notificationjs.umd.js',
        library: 'Notificationsjs',
        libraryTarget: 'umd',
        globalObject: 'this'
    }
});
