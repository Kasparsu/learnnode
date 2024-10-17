const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const WorkboxPlugin = require('workbox-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = merge(common, {
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ['style-loader', "css-loader"],
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    'style-loader',
                    'css-loader', 
                    {
                        loader: "sass-loader",
                        options: {
                            sassOptions: { 
                                quietDeps: true
                            },
                        }
                    }
                ],
            },
        ],
    },
    plugins: [
        new WorkboxPlugin.GenerateSW({
            maximumFileSizeToCacheInBytes: 10 * 1024 * 1024,
            clientsClaim: true,
            skipWaiting: true,
        }),
        new CopyPlugin({
            patterns: [
              { from: "public", to: "" },
            ],
        }),
    ]
});