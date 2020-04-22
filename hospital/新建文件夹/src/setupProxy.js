const proxy = require('http-proxy-middleware')
module.exports = function(app) {
    app.use(
        '/api',
        proxy.createProxyMiddleware({
            target: 'http://120.26.184.63:8085/',
            changeOrigin: true,
            pathRewrite: {
                '^/api': ''
            }
        })
    )
}