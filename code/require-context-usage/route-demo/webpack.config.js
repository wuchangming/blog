const path = require('path')
const webpack = require('webpack')

const config = {
    devtool: 'source-map',
    entry: './src/app/index.js',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: 'babel-loader',
                exclude: /node_modules/,
            }
        ]
    }
}

module.exports = config
