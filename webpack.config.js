const path = require('path')

module.exports = {
    entry: './src/app.ts',
    mode: 'development',
    devtool: 'source-map',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [{
            test: /\.(ts)$/,
            use: 'ts-loader'
        }]
    },
    resolve: {
        extensions: [ '.ts' ]
    }
}
