const path = require('path');

module.exports = {
    entry: './index.js',
    output: {
        filename: 'aframe-particle-system-component.min.js',
        path: path.resolve(__dirname, 'dist')
    },
    mode: 'production',
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
                type: 'asset',
            }
        ]
    }
};
