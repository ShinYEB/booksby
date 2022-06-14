const {createProxyMiddleware} = require('http-proxy-middleware')

module.exports = app => {
    app.use('/proxy',
        createProxyMiddleware(
            {
                target: 'http://34.64.95.170:8080',
                changeOrigin: true,
            }
        )
    )
}