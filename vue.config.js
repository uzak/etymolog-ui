const webpack = require('webpack');

const fs = require('fs')
const packageJson = fs.readFileSync('./package.json')
const version = JSON.parse(packageJson).version || 0
module.exports = {
    publicPath: process.env.NODE_ENV === 'production'
        ? '/etymolog/'
        : '/',
    configureWebpack: {
        plugins: [
            new webpack.DefinePlugin({
                'process.env.PACKAGE_VERSION': '"' + version + '"'
            })
        ]
    },
// the rest of your original module.exports code goes here
}
