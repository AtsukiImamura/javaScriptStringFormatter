const path = require('path')

module.exports = {
    mode: 'production', // or development  productionの場合はwebpack.optimization(最適化オプション)のプラグインが有効になってビルド結果が軽くなる
    entry: {
        'test': './src/test.js',
    },
    output: {
        path: path.resolve(__dirname, './dest'),
        filename: '[name].js',
        chunkFilename: '[name].js',
    },
    // devServer: {
    //     // webpackの扱わないファイル(HTMLや画像など)が入っているディレクトリ
    //     contentBase: path.resolve(__dirname, 'dest')
    // },
    module: {
        rules: [
            {
                test: /\.js/,
                loader: 'babel-loader',
                options: {
                    plugins: ["@babel/plugin-syntax-dynamic-import"]
                }
            },
        ]
    },
}