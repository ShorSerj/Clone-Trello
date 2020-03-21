const hotClient = require('webpack-hot-client')
const middleware = require('webpack-dev-middleware')
const webpack = require('webpack')
const config = require('./webpack.config')
const app = require('./stub')


const compiler = webpack(config)
const {
    publicPath
} = config.output
const option = {}
const client = hotClient(compiler, option)
const {
    server
} = client

server.on('listening', () => {
    app.use(middleware(compiler, {
        publicPath
    }))
})